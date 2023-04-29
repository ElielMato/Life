const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEconomy = new Schema({
    GuildId: String,
    MemberId: {type: String},
    Cash: {type: Number, default: 0},
    Bank: {type: Number, default: 5000},
})

module.exports = mongoose.model("UserEconomy", userEconomy);