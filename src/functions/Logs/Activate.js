async function Activate(active, interaction, option, channel, client, embed, embedError){
    const Logs = require('../../models/logs.schema')
    const GuildLogs = await Logs.findOne({ GuildId: interaction.guild.id})
    
    if(active == "on"){
        GuildLogs[option].Active = "on"
        GuildLogs[option].ChannelId = channel

        await GuildLogs.save()

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    } else{
        GuildLogs[option].Active = "off"
        GuildLogs[option].ChannelId = null

        await GuildLogs.save()

        interaction.reply({
            embeds: [embedError],
            ephemeral: true
        })
    }
}

module.exports = Activate