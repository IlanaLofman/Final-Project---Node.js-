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
        console.log('Attempting to connect to MongoDB...');
        console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
        
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            retryWrites: true,
            w: 'majority',
        });
        
        pino.info('MongoDB Connected');
        console.log('MongoDB connection state:', mongoose.connection.readyState);

        // Monitor connection state
        mongoose.connection.on('disconnected', () => {
            console.log('WARNING: MongoDB disconnected!');
            pino.error('MongoDB disconnected');
        });

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error.message);
            pino.error('MongoDB connection error: ' + error.message);
        });

        // Wait a bit for pool to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        // ++c NOW load routes after connection is established
        const costRoutes = require('../routes/costRoutes');
        const reportRoutes = require('../routes/reportRoutes');

        app.use('/api', costRoutes);
        app.use('/api/report', reportRoutes);

        const port = process.env.COSTS_PORT || 3002;
        app.listen(port, () => console.log(`Costs service listening on port ${port}`));
    } catch (error) {
        pino.error('MongoDB Connection Error: ' + error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

startServer();
