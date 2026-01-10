#!/usr/bin/env node

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('../routes/userRoutes');
const addUserRoutes = require('../routes/addUserRoutes'); // ניצור אותו עוד רגע
const requestLogger = require('../utils/requestLogger');   // ניצור אותו עוד רגע

const app = express();
app.use(express.json());
app.use(requestLogger);

mongoose.connect(process.env.MONGO_URI);

app.use('/api/users', userRoutes);
app.use('/api', addUserRoutes); // נותן POST /api/add

const port = process.env.USERS_PORT || 3001;
app.listen(port, () => console.log(`Users service listening on ${port}`));
