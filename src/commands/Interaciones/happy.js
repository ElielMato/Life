const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('happy')	
    .setDescription('Estas muy contento')
    .setDescriptionLocalizations({
        "es-ES": "Estas muy contento",
        "en-US": "You very happy"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'happy',
    async run(client, interaction, language) {
        
        const aA = interaction.user.username
        const aB = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.happy', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.happy())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aB]
        });
        
    }
}