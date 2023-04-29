const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('sleep')
    .setDescription('Duermes tranquilo')
    .setDescriptionLocalizations({
        "es-ES": "Duermes tranquilo",
        "en-US": "You sleep peacefully"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'sleep',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.sleep', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.sleep())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });

    }
}