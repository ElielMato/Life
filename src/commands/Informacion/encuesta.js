const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('poll')	
    .setDescription('Empiza una encuesta')
    .setDescriptionLocalizations({
        "es-ES": "Empiza una encuesta",
        "en-US": "Start a poll"
    })
    .addStringOption(option => option
        .setName('pregunta')
        .setNameLocalizations({
            "es-ES": "pregunta",
            "en-US": "question"
        })
        .setDescription('Pregunta')
        .setDescriptionLocalizations({
            "es-ES": "Pregunta",
            "en-US": "Question"
        })
        .setRequired(true))
    .addStringOption(option => option
        .setName('opcion1')
        .setNameLocalizations({
            "es-ES": "opcion1",
            "en-US": "choose1"
        })
        .setDescription('Opcion N°1')
        .setDescriptionLocalizations({
            "es-ES": "Opcion N°1",
            "en-US": "Choose N°1"
        })
        .setRequired(true))
    .addStringOption(option => option
        .setName('opcion2')
        .setNameLocalizations({
            "es-ES": "opcion2",
            "en-US": "choose2"
        })
        .setDescription('Opcion N°2')
        .setDescriptionLocalizations({
            "es-ES": "Opcion N°2",
            "en-US": "Choose N°2"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'poll',
    async run(client, interaction, language) {

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)

        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });

        const pregunta = interaction.options._hoistedOptions[0].value;
        const opcion1 = interaction.options._hoistedOptions[1].value;
        const opcion2 = interaction.options._hoistedOptions[2].value;

        const embed = new EmbedBuilder()
            .setTitle(client.languages.__({phrase: 'encuesta.encuesta-title', locale: language}))
            .setColor(Config.color.CELE)
            .setDescription('**' + pregunta + '**' + '\n🅰 ' + opcion1 + '\n🅱 ' + opcion2)

        const exito = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'encuesta.encuesta-finish', locale: language}))
            .setColor(Config.color.GOOD)

        interaction.reply({
            embeds: [exito],
            ephemeral: true
        })

        client.channels.cache.get(`${interaction.channelId}`).send({embeds: [embed]}).then(async msg => {
            await msg.react('🅰');
            await msg.react('🅱')
        })
    }
}