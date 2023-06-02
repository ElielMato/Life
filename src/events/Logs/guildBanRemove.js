const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guild = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'guildBanRemove',
    async execute(ban, client) {
        const GuildLogs = await Logs.findOne({ GuildId: ban.guild.id})
        const locale = await Guild.findOne({ guildId: ban.guild.id })
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.BanUser.ChannelId}`)

        if(GuildLogs.BanUser.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.unbanuser', locale: language }, {user: ban.user.id}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}