const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole) {
        const GuildLogs = await Logs.findOne({ GuildId: oldRole.guild.id })
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: oldRole.guild.id })
        } 
        await Guild.save;

        const locale = await Guilds.findOne({ guildId: oldRole.guild.id })
        let Lang = ""
        if(!locale){
            Lang = await Guilds.create({ guildId: role.guild.id })
        } 
        await Lang.save;
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