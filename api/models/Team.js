const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    teamName: {type: String, required: true},
    judgeName: {type: String, required: true},
    university: {type: String, required: false}
});

module.exports = mongoose.model('Team', teamSchema);
