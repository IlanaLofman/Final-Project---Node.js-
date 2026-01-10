#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const aboutRoutes = require('../routes/aboutRoutes');
const requestLogger = require('../utils/requestLogger');

const app = express();
app.use(express.json());
app.use(requestLogger);

mongoose.connect(process.env.MONGO_URI);

app.use('/api/about', aboutRoutes);

const port = process.env.ADMIN_PORT || 3004;
app.listen(port, () => console.log(`Admin service listening on ${port}`));
