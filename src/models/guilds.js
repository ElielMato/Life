const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Server = new Schema({
    guildId: { type: String},
    lang: { type: String, default: "es" }
})

module.exports = mongoose.model("Guilds", Server);