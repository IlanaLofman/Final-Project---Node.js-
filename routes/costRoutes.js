const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');

// Allowed categories for cost items (project requirements)
const validCategories = ['food', 'health', 'housing', 'sports', 'education'];

/**
 * @route POST /api/add
 * @description Adds a new cost item to the database
 * @access Public
 */
router.post('/', async (req, res) => {
    try {
        const { userid, description, category, sum, year, month, day } = req.body;

        // ++c Validate required properties
        if (userid === undefined || !description || !category || sum === undefined) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'One or more required properties are missing',
            });
        }

        // ++c Validate and convert userid to Number
        const numericUserId = Number(userid);
        if (!Number.isFinite(numericUserId)) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'userid must be a number',
            });
        }

        // ++c Validate category
        const normalizedCategory = category.toLowerCase();
        if (!validCategories.includes(normalizedCategory)) {
            return res.status(400).json({
                id: 'validation_error',
                message: `Invalid category. Allowed categories are: ${validCategories.join(', ')}`,
            });
        }

        // ++c Validate sum
        if (typeof sum !== 'number' || sum < 0) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'sum must be a non-negative number',
            });
        }

        // ++c Validate / set date fields
        const validYear = year !== undefined ? Number(year) : new Date().getFullYear();
        const validMonth = month !== undefined ? Number(month) : new Date().getMonth() + 1;
        const validDay = day !== undefined ? Number(day) : new Date().getDate();

        if (!Number.isFinite(validYear) || !Number.isFinite(validMonth) || !Number.isFinite(validDay)) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'year, month and day must be numbers',
            });
        }

        if (validMonth < 1 || validMonth > 12) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'Invalid month input',
            });
        }

        if (validDay < 1 || validDay > 31) {
            return res.status(400).json({
                id: 'validation_error',
                message: 'Invalid day input',
            });
        }

        // ++c Create and save new cost
        const newCost = new Cost({
            userid: numericUserId,
            description,
            category: normalizedCategory,
            sum,
            year: validYear,
            month: validMonth,
            day: validDay,
        });

        const savedCost = await newCost.save();

        // ++c Return the added cost (as required)
        return res.status(201).json(savedCost);
    } catch (error) {
        console.error('Error adding cost:', error);
        return res.status(500).json({
            id: 'internal_error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;
