const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('back')	
    .setDescription('Reproduce la cancion anterior')
    .setDescriptionLocalizations({
        "es-ES": "Reproduce la cancion anterior",
        "en-US": "Play the previous song"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'back',
    async run(client, interaction, language) {
        try {
            const queue = client.player.getQueue(interaction.guild.id);
            const embed1 = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch(e => { })
            try {
                let song = await queue.previous()
                const embed = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__mf({phrase: 'music.bank-yes', locale: language}, {queue: queue.previousTracks[1].title, song: song.name}))
                interaction.reply({ embeds: [embed] }).catch(e => { })
            } catch (e) {
                const noback = new EmbedBuilder()
                    .setColor(Config.color.WARNING)
                    .setDescription(client.languages.__({phrase: 'music.bank-no', locale: language}))
                return interaction.reply({ embeds: [noback] }).catch(e => { })
            }
        } catch (e) {
            console.error(e)
        }
    }
}