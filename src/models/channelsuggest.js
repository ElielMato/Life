const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSuggest = new Schema({
    GuildId: String,
    ChannelId: String
})

module.exports = mongoose.model("ChannelSuggest", channelSuggest);