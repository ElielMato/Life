const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('slowmode')	
    .setDescription('Activa/Desactiva el slowmode.')
    .setDescriptionLocalizations({
        "es-ES": "Activa/Desactiva el slowmode",
        "en-US": "Enable/Disable slowmode"
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('set')
        .setDescription('Activa el slowmode.')
        .setDescriptionLocalizations({
            "es-ES": "Activa el slowmode",
            "en-US": "Enable slowmode"
        })
        .addNumberOption(option => option
            .setName('duracion')
            .setNameLocalizations({
                "es-ES": "duracion",
                "en-US": "duration"
            })
            .setDescription('Establece el tiempo (segundos)')
            .setDescriptionLocalizations({
                "es-ES": "Establece el tiempo (segundos)",
                "en-US": "Set the time (seconds)"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('off')
        .setDescription('Desactiva el slowmode.')
        .setDescriptionLocalizations({
            "es-ES": "Desactiva el slowmode",
            "en-US": "Disable slowmode"
        }))
            

module.exports = {
    builder: builder.toJSON(),
    name: 'slowmode',
    async run(client, interaction, language) {
        try {

            var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessage);
            const embedPerms = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
                .setColor(Config.color.WARNING)

            if (!permisos) return interaction.reply({
                embeds: [embedPerms],
                ephemeral: true
            });

            if (interaction.options.getSubcommand() === "set") {

                const duration = interaction.options._hoistedOptions[0].value;

                interaction.channel.setRateLimitPerUser(duration)
                const embedSet = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'slowmode.slowmode-set', locale: language}, {duration: duration}))
                    .setColor(Config.color.GOOD)
                interaction.reply({
                    embeds: [embedSet],
                    ephemeral: true
                })
                
            } else if (interaction.options.getSubcommand() === "off") {

                interaction.channel.setRateLimitPerUser(0)
                const embedOff = new EmbedBuilder()
                    .setDescription(client.languages.__({phrase: 'slowmode.slowmode-off', locale: language}))
                    .setColor(Config.color.BAD)
                interaction.reply({
                    embeds: [embedOff],
                    ephemeral: true
                })
            }
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }   
    }
}