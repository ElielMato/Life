const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel) {
        const GuildLogs = await Logs.findOne({ GuildId: oldChannel.guild.id})
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: oldChannel.guild.id })
        } 
        await Guild.save;

        const locale = await Guilds.findOne({ guildId: oldChannel.guild.id })
        const language = locale.lang
        const channelSend = oldChannel.client.channels.cache.get(`${GuildLogs.EditChannel.ChannelId}`)

        if(GuildLogs.EditChannel.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: oldChannel.client.user.username, iconURL: oldChannel.client.user.displayAvatarURL()})
                .setTitle(oldChannel.client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(oldChannel.client.languages.__mf({phrase: 'logs.channelUpdate', locale: language }, {oldChannel: oldChannel.id, name: oldChannel.name, newChannel: newChannel.name}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}