const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('feed')	
    .setDescription('Das de comer a un usuario')
    .setDescriptionLocalizations({
            "es-ES": "Das de comer a otro usuario",
            "en-US": "You feed another user"
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
    name: 'feed',
    async run(client, interaction, language) {
        
        const aA = interaction.user.username
        let aB = interaction.options._hoistedOptions[0].user.username;
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.feed', locale: language}) + '**' + aB + '**')
            .setColor(Config.color.CELE)
            .setImage(star.feed())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });
        
    }
}