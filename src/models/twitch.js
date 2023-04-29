const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Twitch = new Schema({
    GuildId: { type: String },
    ChannelId: { type: String },
    Active: { type: String, default: "off" },
    UserTwitch: { type: Array }
})

module.exports = mongoose.model("Twitch", Twitch);