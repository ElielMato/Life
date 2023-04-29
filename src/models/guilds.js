const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Server = new Schema({
    guildId: { type: String},
    lang: { type: String }
})

module.exports = mongoose.model("Guilds", Server);