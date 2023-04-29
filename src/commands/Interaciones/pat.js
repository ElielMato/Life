const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Acaricias a un usuario')
    .setDescriptionLocalizations({
            "es-ES": "Acaricia a un usuario",
            "en-US": "You pat a user"
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
    name: 'pat',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        let aB = interaction.options._hoistedOptions[0].user.username;
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.pat', locale: language}) + '**' + aB + '**')
            .setColor(Config.color.CELE)
            .setImage(star.pat())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });

    }
}