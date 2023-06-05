const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'roleDelete',
    async execute(role, client) {
        const GuildLogs = await Logs.findOne({ GuildId: role.guild.id})
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: role.guild.id })
        } 
        await Guild.save;
        
        const locale = await Guilds.findOne({ guildId: role.guild.id })
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.DeleteRole.ChannelId}`)

        if(GuildLogs.DeleteRole.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.roledelete', locale: language }, {name: role.name}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}