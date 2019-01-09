const mongoose = require('mongoose');
const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    complete: { type: Boolean, required: true },
    day: {type: Number, required: true}
});



module.exports = mongoose.model('Match', matchSchema);
