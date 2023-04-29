const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('bonk')
    .setDescription('Le das un bonk')
    .setDescriptionLocalizations({
        "es-ES": "Le das un bonk",
        "en-US": "You give him a bonk"
    })
    .addUserOption(option => option
        .setName('usuario')
        .setNameLocalizations({
            "es-ES": "usuario",
            "en-US": "user"
        })
        .setDescription('Elige un usuario.')
        .setDescriptionLocalizations({
            "es-ES": "Elige un usuario",
            "en-US": "Choise a user"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'bonk',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        let aB = interaction.options._hoistedOptions[0].user.username;
        const aC = new EmbedBuilder()
            .setDescription('**' + aB + '**' + client.languages.__({phrase: 'interaciones.bonk', locale: language}) + '**' + aA + '**')
            .setColor(Config.color.CELE)
            .setImage(star.bonk())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });
    }
}