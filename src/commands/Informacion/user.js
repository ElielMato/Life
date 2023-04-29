const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const moment = require("moment")


const builder = new SlashCommandBuilder()
    .setName('user')	
    .setDescription('Inforamcion del usuario')
    .setDescriptionLocalizations({
        "es-ES": "Inforamcion del usuario",
        "en-US": "User information"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'user',
    async run(client, interaction, language) {

        const guild = interaction.guild;
        const user = interaction.user;

        let embed = new EmbedBuilder()
            .setTitle(client.languages.__mf({phrase: 'userinfo.title', locale: language}, {user: user.username}))
            .addFields({
                name: client.languages.__({phrase: 'userinfo.name', locale: language}),
                value: "```" + `${user.tag}` + "```",
                inline: true
            }, 
            {
                name: client.languages.__({phrase: 'userinfo.id', locale: language}),
                value: "```" + `${user.id}` + "```",
                inline: true
            }, 
            {
                name: client.languages.__({phrase: 'userinfo.ping', locale: language}),
                value: "```" + `${client.ws.ping}ms` + "```",
                inline: true
            }, 
            {
                name: client.languages.__({phrase: 'userinfo.cuenta', locale: language}),
                value: "```" + `(${moment(user.createdAt).startOf("day").fromNow()})` + "```",
                inline: true
            }, 
            {
                name: client.languages.__({phrase: 'userinfo.server', locale: language}),
                value: "```" + `(${moment(guild.joinedAt).startOf("day").fromNow()})` + "```",
                inline: true
            })
            .setTimestamp()
            .setColor(Config.color.CELE)

        interaction.reply({
            embeds: [embed]
        });
    }
}
