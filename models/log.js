const mongoose = require('mongoose');

/*
Log schema for saving HTTP requests
*/
const logSchema = new mongoose.Schema({
    method: String,
    url: String,
    status: Number,
    message: String,
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Log || mongoose.model('Log', logSchema);
