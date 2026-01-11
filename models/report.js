const mongoose = require('mongoose');

/*
++c Computed Design Pattern:
   Store computed monthly reports for past months so repeated requests return cached data.
*/
const reportSchema = new mongoose.Schema(
    {
        userid: { type: Number, required: true },
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        costs: { type: Array, required: true },
    },
    { timestamps: true }
);

reportSchema.index({ userid: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Report', reportSchema);
