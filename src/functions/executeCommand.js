const Lang = require('../models/guilds')

module.exports = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    const Guild = interaction.member.guild

    await Lang.findOne({
        guildId: interaction.guildId
    }).then((s, err) => {
        if (err) return console.log(err)
        if (s) {
            Guild.lang = s.lang
        } else {
            const newGuild = new Lang({
                guildId: interaction.guildId.toString(),
                lang: 'es'
            })
            newGuild.save().catch(e => console.log(e))
        }
    })

    try {
        const language = interaction.member.guild.lang
        await command.run(client, interaction, language)
    } catch (e) {
        console.error(e)
        return interaction.reply({
            content: 'Ha surgido un error al ejecutar el comando.'
        })
    }
}