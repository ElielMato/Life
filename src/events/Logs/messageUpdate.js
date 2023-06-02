const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guild = require('../../models/guilds')
const Config = require('../../../config.json')
const { languages } = require('humanize-duration')

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage, client) {
        const GuildLogs = await Logs.findOne({ GuildId: oldMessage.guild.id})
        const locale = await Guild.findOne({ guildId: oldMessage.guild.id })
        const language = locale.lang
        const channel = client.channels.cache.get(`${GuildLogs.EditMessage.ChannelId}`)

        if (oldMessage.content == newMessage.content) return;

        if(GuildLogs.EditMessage.Active == "on"){
            const embed = new EmbedBuilder()
                .setAuthor({ name: oldMessage.client.user.username, iconURL: oldMessage.client.user.displayAvatarURL()})
                //.setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.messageupdate', locale: language }, {author: newMessage.author.id, oldMessage: oldMessage.content, newMessage: newMessage.content}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channel.send({embeds: [embed]});
        } 
    }
}