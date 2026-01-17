#!/usr/bin/env node

require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const pino = require('pino')();

const app = express();
app.use(express.json());
const requestLogger = require('../utils/requestLogger');
app.use(requestLogger);

// ++c Connect to MongoDB FIRST, then load routes
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
        });
        pino.info('MongoDB Connected');

        // ++c NOW load routes after connection is established
        const userRoutes = require('../routes/userRoutes');
        const addUserRoutes = require('../routes/addUserRoutes');

        app.use('/api/users', userRoutes);
        app.use('/api', addUserRoutes);

        const port = process.env.USERS_PORT || 3001;
        app.listen(port, () => pino.info(`Users service listening on port ${port}`));
    } catch (error) {
        pino.error('MongoDB Connection Error: ' + error.message);
        process.exit(1);
    }
}

startServer();
