#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const logRoutes = require('../routes/logRoutes');
const requestLogger = require('../utils/requestLogger');

const app = express();
app.use(express.json());
app.use(requestLogger);

mongoose.connect(process.env.MONGO_URI);

app.use('/api/logs', logRoutes);

const port = process.env.LOGS_PORT || 3003;
app.listen(port, () => console.log(`Logs service listening on ${port}`));
