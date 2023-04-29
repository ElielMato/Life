const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('confused')
    .setDescription('Estas confundido')
    .setDescriptionLocalizations({
        "es-ES": "Estas confundido",
        "en-US": "You confused."
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'confused',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.confused', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.confused())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });

    }
}