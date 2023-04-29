const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('pause')	
    .setDescription('Pausa la cancion actual')
    .setDescriptionLocalizations({
        "es-ES": "Pausa la cancion actual",
        "en-US": "Pause the current song"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'pause',
    async run(client, interaction, language) {
        const queue = client.player.getQueue(interaction.guild.id);
        try {
            const embed1 = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch(e => { })
            const success = queue.pause();
            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(success ? client.languages.__mf({phrase: 'music.pause', locale: language}, {name: queue.songs[0].name}) : client.languages.__({phrase: 'music.invalid', locale: language}))
            return interaction.reply({ embeds: [embed], ephemeral: true }).catch(e => { })
        } catch (e) {
            console.error(e)
        }
    }
}