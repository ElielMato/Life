const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'guildBanRemove',
    async execute(ban, client) {
        const GuildLogs = await Logs.findOne({ GuildId: ban.guild.id})
        const channelSend = client.channels.cache.get(`${GuildLogs.BanUser.ChannelId}`)

        if(GuildLogs.BanUser.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Se desbaneo a <@${ban.user.id}>`)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}