const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'channelUpdate',
    async execute(oldChannel, newChannel) {
        const GuildLogs = await Logs.findOne({ GuildId: oldChannel.guild.id})
        const channelSend = oldChannel.client.channels.cache.get(`${GuildLogs.EditChannel.ChannelId}`)

        if(GuildLogs.EditChannel.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: oldChannel.client.user.username, iconURL: oldChannel.client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Se edito el canal <#${oldChannel.id}>
                
                **Antes**
                ${oldChannel.name}

                **Ahora**
                ${newChannel.name}
                `)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}