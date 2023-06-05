const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'guildBanRemove',
    async execute(ban, client) {
        const GuildLogs = await Logs.findOne({ GuildId: ban.guild.id})
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: ban.guild.id })
        } 
        await Guild.save;

        const locale = await Guilds.findOne({ guildId: ban.guild.id })
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.BanUser.ChannelId}`)

        if(GuildLogs.BanUser.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.unbanuser', locale: language }, {user: ban.user.id}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}