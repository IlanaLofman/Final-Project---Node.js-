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
        const logRoutes = require('../routes/logRoutes');

        app.use('/api/logs', logRoutes);

        const port = process.env.LOGS_PORT || 3003;
        app.listen(port, () => pino.info(`Logs service listening on port ${port}`));
    } catch (error) {
        pino.error('MongoDB Connection Error: ' + error.message);
        process.exit(1);
    }
}

startServer();
