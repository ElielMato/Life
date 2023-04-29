const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('nowplaying')	
    .setDescription('Alternar la reproducción automática de la playlist')
    .setDescriptionLocalizations({
        "es-ES": "Alternar la reproducción automática de la playlist",
        "en-US": "Toggle autoplay queue"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'nowplaying',
    async run(client, interaction, language) {
          try {

            const queue = client.player.getQueue(interaction.guild.id);
            const embed1 = new EmbedBuilder()
                .setColor(Config.color.WARNING)
                .setDescription(client.languages.__({phrase: 'music.no-music', locale: language}))
            if (!queue || !queue?.playing) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch(e => { })

            const track = queue.songs[0];
            if (!track) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch(e => { })

            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setThumbnail(track.thumbnail)
                .setTitle(track.name)
                .setDescription(client.languages.__mf({phrase: 'music.now-playing', locale: language}, {audio: queue.volume, dura: track.formattedDuration, url: track.url, user: track.user.id }))
                .setTimestamp()

            const saveButton = new ButtonBuilder()
                .setLabel(client.languages.__({phrase: 'music.now-save', locale: language}))
                .setCustomId('saveTrack')
                .setStyle(ButtonStyle.Success)

            const row = new ActionRowBuilder().addComponents(saveButton);

            interaction.reply({ embeds: [embed], components: [row] }).catch(e => { })

        } catch (e) {
            console.error(e);
         }
    }
}