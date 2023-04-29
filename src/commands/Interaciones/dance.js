const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('dance')	
    .setDescription('Bailas de la felicidad')
    .setDescriptionLocalizations({
        "es-ES": "Bailas de la felicidad",
        "en-US": "You dance of happiness"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'dance',
    async run(client, interaction, language) {

          const aA = interaction.user.username
          const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.dance', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.dance())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
          interaction.reply({
              embeds: [aC]
          });
        
    }
}