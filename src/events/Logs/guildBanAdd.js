const { EmbedBuilder } = require('discord.js')
const Logs = require('../../models/logs.schema')
const Guilds = require('../../models/guilds')
const Config = require('../../../config.json')

module.exports = {
    name: 'guildBanAdd',
    async execute(ban, client) {
        const GuildLogs = await Logs.findOne({ GuildId: ban.guild.id})
        let Guild = ""
        if(!GuildLogs){
            Guild = await Logs.create({ GuildId: ban.guild.id })
        } 
        await Guild.save;

        const locale = await Guilds.findOne({ guildId: ban.guild.id })
        let Lang = ""
        if(!locale){
            Lang = await Guilds.create({ guildId: ban.guild.id })
        } 
        await Lang.save;
        const language = locale.lang
        const channelSend = client.channels.cache.get(`${GuildLogs.UnbanUser.ChannelId}`)

        if(GuildLogs.UnbanUser.Active == "on"){
           const embed = new EmbedBuilder()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTitle(client.languages.__({phrase: 'logs.title', locale: language }))
                .setDescription(client.languages.__mf({phrase: 'logs.banuser', locale: language }, {user: ban.user.id}))
                .setColor(Config.color.CELE)
                .setTimestamp()
            channelSend.send({embeds: [embed]});
        } 
    }
}