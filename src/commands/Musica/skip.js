const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('skip')	
    .setDescription('Omitir canciones')
    .setDescriptionLocalizations({
        "es-ES": "Omitir canciones",
        "en-US": "Skip songs",
    })
    .addNumberOption((option) =>
            option
            .setName("numero")
            .setNameLocalizations({
                "es-ES": "numero",
                "en-US": "number",
            })
            .setDescription("Escribe cuántas canciones quieres omitir")
            .setDescriptionLocalizations({
                "es-ES": "Escribe cuántas canciones quieres omitir",
                "en-US": "Type how many songs you want to skip",
            })
            .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'skip',
    async run(client, interaction, language) {
        try {

            const queue = client.player.getQueue(interaction.guild.id);
            const embed = new EmbedBuilder()
                    .setColor(Config.color.WARNING)
                    .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })

            let number = interaction.options.getNumber('numero');
            if (number) {
                const number1 = new EmbedBuilder()
                    .setColor(Config.color.WARNING)
                    .setDescription(client.languages.__({phrase: 'music.skip-number', locale: language}))
                const number2 = new EmbedBuilder()
                    .setColor(Config.color.WARNING)
                    .setDescription(client.languages.__({phrase: 'music.skip-number1', locale: language}))
                if (!queue.songs.length > number) return interaction.reply({ embeds: [number1], ephemeral: true }).catch(e => { })
                if (isNaN(number)) return interaction.reply({ embeds: [number2], ephemeral: true }).catch(e => { })
                if (1 > number) return interaction.reply({ embeds: [number2], ephemeral: true }).catch(e => { })

                try {
                    let old = queue.songs[0];
                    const skip = new EmbedBuilder()
                        .setColor(Config.color.CELE)
                        .setDescription(client.languages.__mf({phrase: 'music.skip-yes', locale: language}, {name: old.name}))
                    await client.player.jump(interaction, number).then(song => {
                        return interaction.reply({ embeds: [skip] }).catch(e => { })
                    })
                } catch(e){
                    const embed1 = new EmbedBuilder()
                        .setColor(Config.color.WARNING)
                        .setDescription(client.languages.__({phrase: 'music.queue-not', locale: language}))
                    return interaction.reply({ embeds: [embed1], ephemeral: true }).catch((e) => {})
                }
            } else {
                try {
                    let old = queue.songs[0];
                    const embed2 = new EmbedBuilder()
                        .setColor(Config.color.WARNING)
                        .setDescription(success ? client.languages.__mf({phrase: 'music.skip-error', locale: language}, {name: old.name}) : client.languages.__({phrase: 'music.invalid', locale: language}) )
                    const success = await queue.skip();
                    return interaction.reply({ embeds: [embed2] }).catch(e => { })
                } catch (e) {
                    const embed1 = new EmbedBuilder()
                        .setColor(Config.color.WARNING)
                        .setDescription(client.languages.__({phrase: 'music.queue-not', locale: language}))
                    return interaction.reply({ embeds: [embed1], ephemeral: true }).catch((e) => {})
                }
            }

        } catch (e) {
            console.error(e)
        }
    }
}