const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'channelCreate',
    async execute(channel, client) {
        const GuildLogs = await Logs.findOne({ GuildId: channel.guildId})
        const channelSend = client.channels.cache.get(`${GuildLogs.CreateChannel.ChannelId}`)

        if(GuildLogs.CreateChannel.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Se creo un nuevo canal <#${channel.id}>`)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}