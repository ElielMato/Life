const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('suicide')
    .setDescription('Te puedes suicidar, no lo hagas!')
    .setDescriptionLocalizations({
        "es-ES": "Te puedes suicidar, no lo hagas",
        "en-US": "You can commit suicide, don't do it."
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'suicide',
    async run(client, interaction, language) {

        const aA = interaction.user.username
        const aC = new EmbedBuilder()
            .setDescription('**' + aA + '**' + client.languages.__({phrase: 'interaciones.suicide', locale: language}))
            .setColor(Config.color.CELE)
            .setImage(star.suicide())
            .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp();
        interaction.reply({
            embeds: [aC]
        });

    }
}