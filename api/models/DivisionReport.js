const mongoose = require('mongoose');
const divisionReportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ranking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }],
    judge: { type: mongoose.Schema.Types.ObjectId, ref: "Judge", required: true },
    division: { type: mongoose.Schema.Types.ObjectId, ref: "Division", required: true },
});

module.exports = mongoose.model('DivisionReport', divisionReportSchema);
