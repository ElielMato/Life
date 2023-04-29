const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('invite')	
    .setDescription('Link de invitacion del bot')
    .setDescriptionLocalizations({
        "es-ES": "Link de invitacion del bot",
        "en-US": "Bot invite link"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'invite',
    async run(client, interaction, language) {
        
        const embed = new EmbedBuilder()
            .setColor(Config.color.CELE)
            .setTitle(client.languages.__({phrase: 'invite.invite-title', locale: language}))
            .setURL("https://discord.com/api/oauth2/authorize?client_id=854079049193095180&permissions=1101930982518&scope=bot%20applications.commands")


        interaction.reply({
            embeds: [embed]
        });
    }
}