const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
c Allowed categories for cost items (as per project requirements)
*/
const validCategories = ['food', 'health', 'housing', 'sports', 'education'];

/*
c Cost Schema for MongoDB
  - description: String (required)
  - category: String, enum from validCategories (required)
  - userid: Number (required, references user.id)
  - sum: Decimal128 (Double type for precise decimal values)
  - year, month, day: Number (defaults to current date if not provided)
*/
const CostsSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: validCategories,
        required: true,
    },
    userid: {
        type: Number,
        required: true,
    },
    sum: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    year: {
        type: Number,
        default: () => new Date().getFullYear(),
    },
    month: {
        type: Number,
        default: () => new Date().getMonth() + 1,
    },
    day: {
        type: Number,
        default: () => new Date().getDate(),
    },
});

const Cost = mongoose.models.Cost || mongoose.model('Cost', CostsSchema);

module.exports = Cost;
