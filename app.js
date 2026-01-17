const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

/*
++c Testing app - combines all routes for integration testing
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ++c Import and use request logger
const requestLogger = require('./utils/requestLogger');
app.use(requestLogger);

/*
c MongoDB Connection
*/
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    });

// ++c Import routes
const userRoutes = require('./routes/userRoutes');
const addUserRoutes = require('./routes/addUserRoutes');
const costRoutes = require('./routes/costRoutes');
const reportRoutes = require('./routes/reportRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const logRoutes = require('./routes/logRoutes');

// ++c Home route
app.get('/', (req, res) => {
    res.send('Cost Manager API');
});

// ++c Mount all routes for testing
app.use('/api/users', userRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/report', reportRoutes);
// ++c These must come last to avoid conflicts
app.use('/api', costRoutes);
app.use('/api', addUserRoutes);

/*
c Catch 404 and forward to error handler
*/
app.use((req, res, next) => {
    res.status(404).json({ id: 'not_found', message: 'Route not found' });
});

/*
c Error handler
*/
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        id: 'error',
        message: err.message || 'Internal server error'
    });
});

// ++c Export for testing
module.exports = app;

/*
c Start server only if not in test mode
*/
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
