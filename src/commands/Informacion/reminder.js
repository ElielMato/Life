const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const Config = require('../../../config.json');
const Emoji = require('../../json/emoji.json')
const Reminder = require('../../models/reminder.schema.js')

const builder = new SlashCommandBuilder()
    .setName('reminder')
    .setNameLocalizations({
        "es-ES": "recordatorio",
        "en-US": "reminder"
    })
    .setDescription('Ponte un recordatorio cada cierto tiempo')
    .setDescriptionLocalizations({
        "es-ES": "Emite mensaje a la administracion del bot",
        "en-US": "Give yourself a reminder from time to time"
    })
    .addNumberOption(option => option
        .setName('time')
        .setNameLocalizations({
            "es-ES": "tiempo",
            "en-US": "time"
        })
        .setMinValue(1)
        .setDescription('Estable el tiempo del recordatorio (minutos)')
        .setDescriptionLocalizations({
            "es-ES": "Establece el tiempo (minutos)",
            "en-US": "Set the reminder time (minutes)"
        })
        .setRequired(true))
    .addStringOption(option => option
        .setName('message')
        .setNameLocalizations({
            "es-ES": "mensaje",
            "en-US": "message"
        })
        .setDescription('Escribe el mensaje del recordatorio')
        .setDescriptionLocalizations({
            "es-ES": "Escribe el mensaje del recordatorio",
            "en-US": "Write the reminder message"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'reminder',
    async run(client, interaction, language) {
        const cross = client.emojis.cache.get(Emoji.cross)
        const check = client.emojis.cache.get(Emoji.check)

        const minute = interaction.options._hoistedOptions[0].value;
        const message = interaction.options._hoistedOptions[1].value;
        const time = Date.now() + (minute * 1000 * 60);

        const ExistsReminder = await Reminder.findOne({ User: interaction.user.id })

        if(ExistsReminder) {
            const embedNot = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'reminder.not', locale: language }))
                .setColor(Config.color.WARNING)
            interaction.reply({embeds: [embedNot]})
        } else {
            Reminder.create({
                User: interaction.user.id,
                Time: time,
                Message: message
            })
            const embedTime = Math.floor(time/1000)
            const embedNot = new EmbedBuilder()
                .setDescription(`${check}` + client.languages.__mf({phrase: 'reminder.finish', locale: language }, {time: embedTime}))
                .setColor(Config.color.GOOD)
            interaction.reply({embeds: [embedNot]})
        }

    }
}