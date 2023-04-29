const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('resume')	
    .setDescription('Iniciar música en pausa')
    .setDescriptionLocalizations({
        "es-ES": "Iniciar música en pausa",
        "en-US": "Start paused music"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'resume',
    async run(client, interaction, language) {
    const queue = client.player.getQueue(interaction.guild.id);
    try {
        const embed1 = new EmbedBuilder()
          .setColor(Config.color.WARNING)
          .setDescription(client.languages.__({phrase: 'music.queue-not', locale: language}))
        if (!queue) return interaction.reply({ embeds: [embed1], ephemeral: true }).catch(e => { })
        const embed2 = new EmbedBuilder()
          .setColor(Config.color.WARNING)
          .setDescription(client.languages.__({phrase: 'music.resume-not', locale: language}))
        if(!queue.paused) return interaction.reply({ embeds: [embed2], ephemeral: true }).catch(e => { })
        const embed3 = new EmbedBuilder()
          .setColor(Config.color.CELE)
          .setDescription(success ? client.languages.__mf({phrase: 'music.resume-yes', locale: language}, {name: queue.songs[0].name}) : client.languages.__({phrase: 'music.resume-error', locale: language}))
        const success = queue.resume()
        return interaction.reply({ embeds: [embed3] }).catch(e => { })
    } catch (e) {
        console.error(e)
    }
    }
}