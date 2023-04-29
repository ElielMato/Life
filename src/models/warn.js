const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Warn = new Schema({
    GuildId: String,
    UserId: String,
    UserTag: String,
    Content: Array
})

module.exports = mongoose.model("Warn", Warn);