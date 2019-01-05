const mongoose = require('mongoose');
const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team1Points: { type: Number, required: true },
    team2Points: { type: Number, required: true },
    team1: { type: String, required: true},
    team2: { type: String, required: true},
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    judgeSign: { type: Boolean, required: true },
    judge: { type: mongoose.Schema.Types.ObjectId, ref: "Judge", required: true },
});

module.exports = mongoose.model('Report', reportSchema);
