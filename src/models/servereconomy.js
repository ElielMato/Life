const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverEconomy = new Schema({
    GuildId: String,
    Emoji: {type: String, default: '💵'},
    Cooldown: {
        Work: {type: Number, default: 600000},
        Beg: {type: Number, default: 600000},
        Crime: {type: Number, default: 600000},
        Postvideo: {type: Number, default: 600000},
        Postmeme: {type: Number, default: 600000}

    },
    Min: {
        Work: {type: Number, default: 100},
        Beg: {type: Number, default: 100},
        Crime: {type: Number, default: 100},
        Postvideo: {type: Number, default: 100},
        Postmeme: {type: Number, default: 100}
    },
    Max: {
        Work: {type: Number, default: 1000},
        Beg: {type: Number, default: 1000},
        Crime: {type: Number, default: 1000},
        Postvideo: {type: Number, default: 1000},
        Postmeme: {type: Number, default: 1000}
    },
})

module.exports = mongoose.model("ServerEconomy", serverEconomy);