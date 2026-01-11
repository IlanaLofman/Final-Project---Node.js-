const express = require('express');
const router = express.Router();
const Log = require('../models/log');

/*
++c GET /api/logs - Return all logs from DB
*/
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find({}).sort({ timestamp: -1 });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({
            id: 'internal_error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;
