const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('cry')	
    .setDescription('Te pones a llorar')
    .setDescriptionLocalizations({
        "es-ES": "Te poner a llorar",
        "en-US": "You start crying"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'cry',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.cry', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.cry())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });
        
    }
}