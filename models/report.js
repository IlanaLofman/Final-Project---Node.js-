const mongoose = require('mongoose');

/*
Computed Design Pattern:
   Store computed monthly reports for past months so repeated requests return cached data.
*/
const reportSchema = new mongoose.Schema({
    userid: Number,
    year: Number,
    month: Number,
    costs: Array
});

reportSchema.index({ userid: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.models.Report || mongoose.model('Report', reportSchema);
