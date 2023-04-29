const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Le pegas a un usuario')
    .setDescriptionLocalizations({
            "es-ES": "Le pegas a un usuario",
            "en-US": "You slap a user"
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
    name: 'slap',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        let aB = interaction.options._hoistedOptions[0].user.username;
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.slap', locale: language}) + '**' + aB + '**')
            .setColor(Config.color.CELE)
            .setImage(star.slap())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });

    }
}