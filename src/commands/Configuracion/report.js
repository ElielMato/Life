const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const Config = require('../../../config.json');
const Emoji = require('../../json/emoji.json')

const builder = new SlashCommandBuilder()
    .setName('report')
    .setDescription('Emite mensaje a la administracion del bot')
    .setDescriptionLocalizations({
        "es-ES": "Emite mensaje a la administracion del bot",
        "en-US": "Issues a message to the bot administration"
    })
    .addStringOption(option => option
        .setName('mensajes')
        .setNameLocalizations({
            "es-ES": "mensajes",
            "en-US": "messages"
        })
        .setDescription('Escribe el mensaje que quieres mandar')
        .setDescriptionLocalizations({
            "es-ES": "Escribe el mensaje que quieres mandar'",
            "en-US": "Write the message you want to send'"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'report',
    async run(client, interaction, language) {

        const message = interaction.options._hoistedOptions[0].value;
        const channel = client.users.cache.get(`485223539557793792`)
        const check = client.emojis.cache.get(Emoji.check)

        const embed = new EmbedBuilder()
            .setTitle("✨ | Nuevo Mensaje | ✨")
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL()
            })
            .addFields(
                { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                { name: 'Guild', value: interaction.guild.name , inline: true },
            )
            .setDescription(`**Mensaje:** 
            ${message}`)
            .setColor(Config.color.CELE)
            .setTimestamp()

        channel.send({
            embeds: [embed]
        })

        const embedGuild = new EmbedBuilder()
            .setDescription(`${check}` + ` | Mensaje Emitido`)
            .setColor(Config.color.CELE)

        interaction.reply({
            embeds: [embedGuild]
        })
    }
}