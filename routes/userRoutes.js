const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Cost = require('../models/cost');

/*
++c GET /api/users/:id - Fetch user details and total costs
   Returns: first_name, last_name, id, total
*/
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        // ++c Invalid ID format check
        if (!Number.isFinite(numericId)) {
            return res.status(404).json({
                id: 'user_not_found',
                message: 'User not found',
            });
        }

        const user = await User.findOne({ id: numericId });

        if (!user) {
            return res.status(404).json({
                id: 'user_not_found',
                message: 'User not found',
            });
        }

        // ++c Aggregate total costs for the user
        const totalCosts = await Cost.aggregate([
            { $match: { userid: numericId } },
            { $group: { _id: null, total: { $sum: '$sum' } } },
        ]);

        return res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total: totalCosts[0]?.total || 0,
        });
    } catch (error) {
        return res.status(500).json({
            id: 'internal_error',
            message: 'Internal server error',
        });
    }
});

/*
++c GET /api/users - Fetch all users
*/
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            id: 'internal_error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;
