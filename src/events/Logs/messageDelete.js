const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        const GuildLogs = await Logs.findOne({ GuildId: message.guildId })
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: message.guild.id })
        } 
        await Guild.save;

        const locale = await Guilds.findOne({ guildId: message.guildId })
        let Lang = ""
        if(!locale){
            Lang = await Guilds.create({ guildId: message.guildId })
        } 
        await Lang.save;
        const language = locale.lang
        const channel = client.channels.cache.get(`${GuildLogs.DeleteMessage.ChannelId}`)

        if(GuildLogs.DeleteMessage.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.messagedelete', locale: language }, {author: message.author.id, channel: message.channelId, content: message.content}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channel.send({embeds: [embed]});
        } 
    }
}