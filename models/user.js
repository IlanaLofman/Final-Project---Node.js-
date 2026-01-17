const mongoose = require('mongoose');

/*
c User Schema for MongoDB
  - id: Number (separate from _id), unique identifier used in API
  - _id: MongoDB default ObjectId
  - first_name, last_name: String
  - birthday: Date
*/
const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
