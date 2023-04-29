const Discord = require("discord.js");
module.exports = {
    name: 'voiceStateUpdate',
    async execute(client, oldMember, newMember) {
        if (newMember.bot) return;

        let newUserChannel = newMember.voiceChannel
        let oldUserChannel = oldMember.voiceChannel

        if (oldUserChannel === undefined && newUserChannel !== undefined) {

        } else if (newUserChannel === undefined) {

        }
    }
}