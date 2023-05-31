const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminder = new Schema({
    User: { type: String },
    Time: { type: String },
    Message: { type: String }
})

module.exports = mongoose.model("reminder", reminder);