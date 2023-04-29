const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleMute = new Schema({
    GuildId: String,
    RoleId: String
})

module.exports = mongoose.model("RoleMute", roleMute);