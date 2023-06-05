const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guild = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'roleCreate',
    async execute(role, client) {
        const GuildLogs = await Logs.findOne({ GuildId: role.guild.id})
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: role.guild.id })
        } 
        await Guild.save;
        
        const locale = await Guild.findOne({ guildId: role.guild.id })
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.CreateRole.ChannelId}`)

        if(GuildLogs.CreateRole.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.rolecreate', locale: language }, {id: role.id}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}