const Log = require('../models/log');

/*
++c Middleware: save a log document for every HTTP request
*/
async function requestLogger(req, res, next) {
    try {
        await Log.create({
            method: req.method,
            url: req.originalUrl,
            timestamp: new Date(),
        });
    } catch (err) {
        // ++c If logging fails, we don't block the request
    }

    next();
}

module.exports = requestLogger;
