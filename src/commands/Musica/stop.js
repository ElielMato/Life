const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('stop')	
    .setDescription('Detener la musica')
    .setDescriptionLocalizations({
        "es-ES": "Detener la musica",
        "en-US": "Stop a music"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'stop',
    async run(client, interaction, language) {
        try {
            const queue = client.player.getQueue(interaction.guild.id);
            const embed = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })
            queue.stop();
            const embed1 = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__({phrase: 'music.stop', locale: language}))
            return interaction.reply({ embeds: [embed1] }).catch(e => { })
        } catch (e) {
            console.error(e)
        }
    }
}