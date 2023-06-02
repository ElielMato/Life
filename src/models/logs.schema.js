const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Logs = new Schema({
    GuildId: {type: String},
    DeleteMessage: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    EditMessage: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    CreateChannel: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    EditChannel: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    DeleteChannel: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    BanUser: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    UnbanUser: {
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    CreateRole:{
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    EditRole:{
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
    DeleteRole:{
        Active: {type: String, default: "off"},
        ChannelId: {type: String},
    },
})

module.exports = mongoose.model("Logs", Logs);