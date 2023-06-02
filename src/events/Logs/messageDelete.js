const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        const GuildLogs = await Logs.findOne({ GuildId: message.guildId})
        const channel = client.channels.cache.get(`${GuildLogs.DeleteMessage.ChannelId}`)

        if(GuildLogs.DeleteMessage.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Se elimino un mensaje de <@${message.author.id}> en <#${message.channelId}>
                
                **Contenido:**
                ${message.content}`)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channel.send({embeds: [embed]});
        } 
    }
}