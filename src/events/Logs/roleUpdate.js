const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Config = require('../../../config.json')

module.exports = {
    name: 'roleUpdate',
    async execute(oldRole, newRole) {
        const GuildLogs = await Logs.findOne({ GuildId: oldRole.guild.id})
        const channel = oldRole.client.channels.cache.get(`${GuildLogs.EditRole.ChannelId}`)

        if (oldRole.name == newRole.name) return;

        if(GuildLogs.EditRole.Active == "on"){
            const embed = new EmbedBuilder()
                .setAuthor({ name: oldRole.client.user.username, iconURL: oldRole.client.user.displayAvatarURL()})
                .setTitle("💾 | Logs System | 💾")
                .setDescription(`Se edito el rol <@${oldRole.id}>

                **Antes**
                ${oldRole.name}

                **Ahora**
                ${newRole.name}
                `)
                .setColor(Config.color.CELE)
                .setTimestamp()
            channel.send({embeds: [embed]});
        } 
    }
}