const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'channelCreate',
    async execute(channel, client) {
        const GuildLogs = await Logs.findOne({ GuildId: channel.guildId})
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: channel.guildId })
        } 
        await Guild.save;
        
        const locale = await Guilds.findOne({ guildId: channel.guildId })
        let Lang = ""
        if(!locale){
            Lang = await Guilds.create({ guildId: channel.guildId })
        } 
        await Lang.save;
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.CreateChannel.ChannelId}`)

        if(GuildLogs.CreateChannel.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.channelcreate', locale: language }, {channel: channel.id}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}