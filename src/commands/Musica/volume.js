const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Establece el volumen de la musica')
    .setDescriptionLocalizations({
        "es-ES": "Establece el volumen de la musica",
        "en-US": "Set the volume of the music"
    })
    .addNumberOption((option) =>
        option
        .setName("volume")
        .setNameLocalizations({
            "es-ES": "volume",
            "en-US": "volume",
        })
        .setDescription("Elige el volume")
        .setDescriptionLocalizations({
            "es-ES": "Elige el volume",
            "en-US": "Choose a volume",
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'volume',
    async run(client, interaction, language) {
        try {

            const maxVol = 150

            const queue = client.player.getQueue(interaction.guild.id);
            const embed = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })

            const vol = parseInt(interaction.options.getNumber('volume'));

            const embed1 = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__mf({phrase: 'music.volume-now', locale: language}, {volume: queue.volume, maxVol: maxVol}))
            if (!vol) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch(e => { })
            const embed2 = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.volume-error', locale: language}))
            if (queue.volume === vol) return interaction.reply({ embeds: [embed2], ephemeral: true }).catch(e => { })
            const embed3 = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__mf({phrase: 'music.volume-error1', locale: language}, {maxVol: maxVol}))
            if (vol < 0 || vol > maxVol) return interaction.reply({ embeds: [embed3], ephemeral: true }).catch(e => { })

            const success = queue.setVolume(vol);
            const volume = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(success ? client.languages.__mf({phrase: 'music.volume-error1', locale: language}, {maxVol: maxVol, vol: vol}) :  client.languages.__({phrase: 'music.invalid', locale: language}))
            return interaction.reply({ embeds: [volume] }).catch(e => { })

        } catch (e) {
            console.error(e)
        }
    }
}