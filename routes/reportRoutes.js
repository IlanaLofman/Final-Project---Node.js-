const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');
const Report = require('../models/report'); // <-- add this model (Computed Design Pattern)

// Predefined categories (must match the project requirements)
const validCategories = ['food', 'education', 'health', 'housing', 'sports'];

/*
++c Computed Design Pattern:
   - When a report is requested for a past month, the server saves the computed report in DB.
   - Next time the same past-month report is requested, the server returns the saved report (no recompute).
*/
router.get('/', async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // ++c Validate required query parameters
        if (!id || !year || !month) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'Missing required query parameters: id, year, month',
            });
        }

        // ++c Validate and convert id/year/month
        const userId = Number(id);
        if (!Number.isFinite(userId)) {
            return res.status(400).json({ id: 'validation_error', message: 'id must be a number' });
        }

        const requestedYear = parseInt(year, 10);
        const requestedMonth = parseInt(month, 10);

        if (!Number.isFinite(requestedYear) || !Number.isFinite(requestedMonth)) {
            return res.status(400).json({ id: 'validation_error', message: 'year and month must be numbers' });
        }

        if (requestedMonth < 1 || requestedMonth > 12) {
            return res.status(400).json({ id: 'validation_error', message: 'Invalid month input' });
        }

        // ++c Decide if requested month is in the past (for caching)
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const isPastMonth =
            requestedYear < currentYear || (requestedYear === currentYear && requestedMonth < currentMonth);

        // ++c If past month: try to return cached report first
        if (isPastMonth) {
            const cached = await Report.findOne({ userid: userId, year: requestedYear, month: requestedMonth });
            if (cached) {
                return res.status(200).json({
                    userid: cached.userid,
                    year: cached.year,
                    month: cached.month,
                    costs: cached.costs,
                });
            }
        }

        // ++c Retrieve costs for the specified user, year, and month
        const costs = await Cost.find({
            userid: userId,
            year: requestedYear,
            month: requestedMonth,
        });

        // ++c Initialize grouped costs structure with all categories
        const groupedCosts = validCategories.reduce((acc, category) => {
            acc[category] = [];
            return acc;
        }, {});

        // ++c Populate grouped costs with data (ignore unexpected categories safely)
        costs.forEach((cost) => {
            let category = (cost.category || '').toLowerCase();

            // ++c Safety: if old data had "sport", map it to "sports"
            if (category === 'sport') {
                category = 'sports';
            }

            if (!groupedCosts[category]) {
                return;
            }

            groupedCosts[category].push({
                sum: cost.sum,
                description: cost.description,
                day: cost.day,
            });
        });

        // ++c Build the final report structure (array of objects, one per category)
        const report = {
            userid: userId,
            year: requestedYear,
            month: requestedMonth,
            costs: validCategories.map((category) => ({
                [category]: groupedCosts[category],
            })),
        };

        // ++c If past month: save the computed report for future requests
        if (isPastMonth) {
            try {
                await Report.create(report);
            } catch (e) {
                // ++c Ignore duplicate cache insert (race condition) or save errors
            }
        }

        return res.status(200).json(report);
    } catch (error) {
        console.error('Error retrieving monthly report:', error);
        return res.status(500).json({ id: 'internal_error', message: 'Internal server error' });
    }
});

module.exports = router;
