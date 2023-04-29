const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('../../../config.json');
const Emoji = require('../../json/emoji.json')

const builder = new SlashCommandBuilder()
    .setName('clear')	
    .setDescription('Borra la cantidad de mensajes seleccionado')
    .setDescriptionLocalizations({
        "es-ES": "Borra la cantidad de mensajes seleccionado",
        "en-US": "Deletes the number of messages selected"
    })
    .addNumberOption(option => option
        .setName('mensajes')
        .setNameLocalizations({
            "es-ES": "mensajes",
            "en-US": "messages"
        })
        .setDescription('Cantidad de Mensajes')
        .setDescriptionLocalizations({
            "es-ES": "Cantidad de Mensajes",
            "en-US": "Number of Messages"
        })
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'clear',
    async run(client, interaction, language) {

        try {
            const valor = interaction.options._hoistedOptions[0].value;

            const check = client.emojis.cache.get(Emoji.check)
            const cross = client.emojis.cache.get(Emoji.cross)

            var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
            const embedPerms = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
                .setColor(Config.color.WARNING)
        
            if (!permisos) return interaction.reply({
                embeds: [embedPerms],
                ephemeral: true
            });

            const embed100 = new EmbedBuilder()
                .setDescription((client.languages.__mf({phrase: 'clear.clear-number', locale: language }, {cross: cross})))
                .setColor(Config.color.WARNING)
            if (valor > 100) return interaction.reply({
                embeds: [embed100],
                ephemeral: true
            })
            
            const embed1 = new EmbedBuilder()
                .setDescription((client.languages.__mf({phrase: 'clear.clear-number', locale: language }, {cross: cross})))
                .setColor(Config.color.WARNING)
            if (valor < 1) return interaction.reply({
                embeds: [embed1],
                ephemeral: true
            })

            interaction.channel.bulkDelete(valor, true);
            const embedDelete = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'clear.clear-finished', locale: language }, {valor: valor}))
                .setColor(Config.color.GOOD)
            interaction.reply({
                embeds: [embedDelete],
                ephemeral: true
            })

            
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
    }
}