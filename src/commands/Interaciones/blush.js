const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('blush')
    .setDescription('Te sonrojas')
    .setDescriptionLocalizations({
        "es-ES": "Te sonrojas",
        "en-US": "You blush"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'blush',
    async run(client, interaction, language) {

        const aB = interaction.user.username
        const aC = new EmbedBuilder()
            .setDescription('**' + aB + '**' + client.languages.__({phrase: 'interaciones.blush', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.blush())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });

    }
}