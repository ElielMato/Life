const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'roleDelete',
    async execute(role, client) {
        const GuildLogs = await Logs.findOne({ GuildId: role.guild.id})
        const channelSend = client.channels.cache.get(`${GuildLogs.DeleteRole.ChannelId}`)

        if(GuildLogs.DeleteRole.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Se elimino el rol @${role.name}`)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}