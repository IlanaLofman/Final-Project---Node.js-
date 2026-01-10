const mongoose = require('mongoose');

/*
++c Log schema for saving HTTP requests
*/
const logSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Log', logSchema);
