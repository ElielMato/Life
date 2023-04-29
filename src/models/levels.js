const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Level = new Schema({
    GuildId: {type: String},
    UserId: {type: String},
    Active: {type: String, default: "off"},
    Level: {type: Number, default: 1},
    XP: {type: Number, default: 0},
})

module.exports = mongoose.model("Level", Level);