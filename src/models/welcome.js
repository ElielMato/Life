const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Welcome = new Schema({
    GuildId: String,
    ChannelId: {type: String, default: ""},
    RoleId: { type: String, default: "" },
    Active: {type: String, default: "off"},
    Title: {type: String, default: ""},
    Descriptions: {type: String, default: ""},
    Color: {type: String, default: ""},
})

module.exports = mongoose.model("Welcome", Welcome);