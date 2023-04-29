const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestro la infromacion sobre mi')
    .setDescriptionLocalizations({
        "es-ES": "Muestro la infromacion sobre mi",
        "en-US": "Show information about me"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'help',
    async run(client, interaction, language) {
        const embed = new EmbedBuilder()
            .setTitle(client.languages.__({phrase: 'help.help-title', locale: language}))
            .setDescription(client.languages.__({phrase: 'help.help-desc', locale: language}))
            .setColor(Config.color.CELE)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({text: "💎 Life Bot"})

        interaction.reply({embeds: [embed]})
    }
}

