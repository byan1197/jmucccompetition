const mongoose = require('mongoose');
const divisionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }],
    visible: {type: Boolean, required: true},
    divNum: {type: Number, required: true},
});

module.exports = mongoose.model('Division', divisionSchema);
