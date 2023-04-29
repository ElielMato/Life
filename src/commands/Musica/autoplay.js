const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('autoplay')	
    .setDescription('Musica aleatoria de tu playlist')
    .setDescriptionLocalizations({
        "es-ES": "Musica aleatoria de tu playlist",
        "en-US": "Random music from your playlist"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'autoplay',
    async run(client, interaction, language) {
         try {
            const queue = client?.player?.getQueue(interaction?.guild?.id);
            const embed = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })
            queue?.toggleAutoplay()
            const autoplay = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(queue?.autoplay ? client.languages.__({phrase: 'music.autoplay-on', locale: language}) : client.languages.__({phrase: 'music.autoplay-off', locale: language}))
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            console.error(e)
        }
    }
}