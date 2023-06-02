const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {
        const GuildLogs = await Logs.findOne({ GuildId: oldMessage.guild.id})
        const channel = oldMessage.client.channels.cache.get(`${GuildLogs.EditMessage.ChannelId}`)

        if (oldMessage.content == newMessage.content) return;

        if(GuildLogs.EditMessage.Active == "on"){
            const embed = new EmbedBuilder()
                .setAuthor({ name: oldMessage.client.user.username, iconURL: oldMessage.client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Mensaje editado por <@${newMessage.author.id}>

                **Antes**
                ${oldMessage.content}

                **Ahora**
                ${newMessage.content}
                `)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channel.send({embeds: [embed]});
        } 
    }
}