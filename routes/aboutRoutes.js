const express = require('express');
const router = express.Router();

/*
++c GET /api/about - Return developers team (no DB)
   Only first_name and last_name fields are returned.
*/
router.get('/', (req, res) => {
    try {
        // ++c Hardcoded team members (change to your real names)
        const team = [
            { first_name: 'mosh', last_name: 'israeli' },
            { first_name: 'shay', last_name: 'oz' },
        ];

        return res.status(200).json(team);
    } catch (error) {
        return res.status(500).json({
            id: 'internal_error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;
