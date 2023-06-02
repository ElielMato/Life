const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guild = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'channelDelete',
    async execute(channel, client) {
        const GuildLogs = await Logs.findOne({ GuildId: channel.guildId})
        const locale = await Guild.findOne({ guildId: channel.guildId })
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.DeleteChannel.ChannelId}`)

        if(GuildLogs.DeleteChannel.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.channeldelete', locale: language }, {channel: channel.name}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}