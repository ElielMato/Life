const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Informacion del servidor')
    .setDescriptionLocalizations({
        "es-ES": "Informacion del servidor",
        "en-US": "Server information"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'server',
    async run(client, interaction, language) {
        
        const server = interaction.guild; 
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .addFields(
                {
                name: client.languages.__({phrase: 'server-info.owner', locale: language}),
                value: `<@${server.ownerId}>`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.id', locale: language}),
                value: `${server.id}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.name', locale: language}),
                value: `${server.name}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.members', locale: language}),
                value: `${server.memberCount}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.rol', locale: language}),
                value: `${server.roles.cache.size}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.channel', locale: language}),
                value: `${server.channels.cache.size}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.emoji', locale: language}),
                value: `${server.emojis.cache.size}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.boost', locale: language}),
                value: `${server.premiumSubscriptionCount || "0"}`,
                inline: true
                },
                {
                name: client.languages.__({phrase: 'server-info.verif', locale: language}),
                value: `${guild.verificationLevel}`,
                inline: true
                })
            .setColor(Config.color.GOOD)
            .setTimestamp()

        interaction.reply({embeds: [embed]})
    }
}