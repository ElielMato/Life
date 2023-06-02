const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guild = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole) {
        const GuildLogs = await Logs.findOne({ GuildId: oldRole.guild.id })
        const locale = await Guild.findOne({ guildId: oldRole.guild.id })
        const language = locale.lang
        const channel = oldRole.client.channels.cache.get(`${GuildLogs.EditRole.ChannelId}`)

        if (oldRole.name == newRole.name) return;

        if(GuildLogs.EditRole.Active == "on"){
            const embed = new EmbedBuilder()
                .setAuthor({ name: oldRole.client.user.username, iconURL: oldRole.client.user.displayAvatarURL()})
                .setTitle(oldRole.client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(oldRole.client.languages.__mf({phrase: 'logs.roleupdate', locale: language }, {old: oldRole.id, name: oldRole.name, newRole: newRole.name}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channel.send({embeds: [embed]});
        } 
    }
}