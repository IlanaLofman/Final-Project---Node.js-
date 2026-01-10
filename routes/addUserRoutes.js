const express = require('express');
const router = express.Router();

const User = require('../models/user');
const sendError = require('../utils/errorResponse');

/*
++c Add a new user (POST /api/add)
*/
router.post('/add', async (req, res) => {
    try {
        const { id, first_name, last_name, birthday } = req.body;

        // ++c Basic validation
        if (id === undefined || first_name === undefined || last_name === undefined || birthday === undefined) {
            return sendError(res, 400, 'validation_error', 'Missing required fields: id, first_name, last_name, birthday');
        }

        // ++c Type validation
        const numericId = Number(id);
        if (!Number.isFinite(numericId)) {
            return sendError(res, 400, 'validation_error', 'id must be a number');
        }

        if (typeof first_name !== 'string' || typeof last_name !== 'string') {
            return sendError(res, 400, 'validation_error', 'first_name and last_name must be strings');
        }

        const birthDate = new Date(birthday);
        if (Number.isNaN(birthDate.getTime())) {
            return sendError(res, 400, 'validation_error', 'birthday must be a valid date');
        }

        // ++c Unique user id check
        const existing = await User.findOne({ id: numericId });
        if (existing) {
            return sendError(res, 409, 'user_exists', 'User with this id already exists');
        }

        const newUser = await User.create({
            id: numericId,
            first_name,
            last_name,
            birthday: birthDate,
        });

        // ++c Return the created user document fields
        return res.status(201).json({
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            birthday: newUser.birthday,
        });
    } catch (err) {
        return sendError(res, 500, 'internal_error', err.message || 'Internal server error');
    }
});

module.exports = router;
