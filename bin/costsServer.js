#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const costRoutes = require('../routes/costRoutes');
const reportRoutes = require('../routes/reportRoutes');
const requestLogger = require('../utils/requestLogger');

const app = express();
app.use(express.json());
app.use(requestLogger);

mongoose.connect(process.env.MONGO_URI);

app.use('/api/add', costRoutes);
app.use('/api/report', reportRoutes);

const port = process.env.COSTS_PORT || 3002;
app.listen(port, () => console.log(`Costs service listening on ${port}`));
