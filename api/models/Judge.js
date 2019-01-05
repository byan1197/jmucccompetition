const mongoose = require('mongoose');
const judgeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    judgeName: { type: String, required: true }
});

module.exports = mongoose.model('Judge', judgeSchema);
