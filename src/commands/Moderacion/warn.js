const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const Config = require('../../../config.json')
const Warn = require('../../models/warn')

const builder = new SlashCommandBuilder()
    .setName('warn')	
    .setDescription('Sistema de Warn')
    .addSubcommand(subcommand =>
        subcommand
        .setName('add')
        .setDescription('Agrega una advertencia')
        .setDescriptionLocalizations({
            "es-ES": "Agrega una advertencia",
            "en-US": "Add a warning"
        })
        .addUserOption(option => option
            .setName('usuario')
            .setNameLocalizations({
                "es-ES": "usuario",
                "en-US": "user"
            })
            .setDescription('Elige un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true))
        .addStringOption(option => option
            .setName('razon')
            .setNameLocalizations({
                "es-ES": "razon",
                "en-US": "reason"
            })
            .setDescription('Elige un razon')
            .setDescriptionLocalizations({
                "es-ES": "Elige un razon",
                "en-US": "Choose a reason"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('check')
        .setDescription('Revisar las advertencias de un usuario')
        .setDescriptionLocalizations({
            "es-ES": "Revisar las advertencias de un usuario",
            "en-US": "Check user's warnings"
        })
        .addUserOption(option => option
            .setName('usuario')
            .setNameLocalizations({
                "es-ES": "usuario",
                "en-US": "user"
            })
            .setDescription('Elige un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('remove')
        .setDescription('Quita una advertencia')
        .setDescriptionLocalizations({
            "es-ES": "Quita una advertencia",
            "en-US": "Remove a warning"
        })
        .addUserOption(option => option
            .setName('usuario')
            .setNameLocalizations({
                "es-ES": "usuario",
                "en-US": "user"
            })
            .setDescription('Elige un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true))
        .addNumberOption(option => option
            .setName('id')
            .setNameLocalizations({
                "es-ES": "id",
                "en-US": "id"
            })
            .setDescription('Warn ID')
            .setDescriptionLocalizations({
                "es-ES": "Warn ID",
                "en-US": "Warn ID"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('clear')
        .setDescription('Quita todas las advertencias')
        .setDescriptionLocalizations({
            "es-ES": "Quita todas las advertencias",
            "en-US": "Remove all warnings"
        })
        .addUserOption(option => option
            .setName('usuario')
            .setNameLocalizations({
                "es-ES": "usuario",
                "en-US": "user"
            })
            .setDescription('Elige un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))

module.exports = {
    builder: builder.toJSON(),
    name: 'warn',
    async run(client, interaction, language) {

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)
    
        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });
        
        const user = interaction.options.getUser("usuario")
        const razon = interaction.options.getString("razon")
        const warnId = interaction.options.getNumber("id") - 1
        

        if (interaction.options.getSubcommand() === "add") {

            await Warn.findOne({ GuildId: interaction.guild.id, UserId: user.id, UserTag: user.tag}, async (err, data) => {
                if (err) throw err
                if (!data){
                    data = new Warn({
                        GuildId: interaction.guild.id,
                        UserId: user.id,
                        UserTag: user.tag,
                        Content: [
                            {
                                ExecuterID: interaction.user.id,
                                ExecuterTag: interaction.user.tag,
                                Reason: razon
                            }
                        ],
                    })
                } else{
                    const obj = {
                        ExecuterID: interaction.user.id,
                        ExecuterTag: interaction.user.tag,
                        Reason: razon
                    }
                    data.Content.push(obj)
                }
                data.save()
            })

            const embed = new EmbedBuilder()
                .setColor(Config.color.GOOD)
                .setTitle(client.languages.__({phrase: 'warn.title', locale: language}))
                .setDescription(client.languages.__mf({phrase: 'warn.add-desc', locale: language}, {usern: user.username, useri: user.id, razon: razon}))

            interaction.reply({embeds: [embed]})

        } else if (interaction.options.getSubcommand() === "check") {

            await Warn.findOne({ GuildId: interaction.guild.id, UserId: user.id, UserTag: user.tag}, async (err, data) => {
                if (err) throw err
                if (data) {
                    const embed = new EmbedBuilder()
                        .setColor(Config.color.CELE)
                        .setTitle(client.languages.__mf({phrase: 'warn.check-title', locale: language}, {usern: user.username}))
                        .setDescription(data.Content.map((w, i) => client.languages.__mf({phrase: 'warn.check-desc', locale: language}, {i: i + 1, wE: w.ExecuterTag, wR: w.Reason})).join(" ")) 

                    interaction.reply({embeds: [embed]})
                } else {
                    const embed = new EmbedBuilder()
                        .setColor(Config.color.WARNING)
                        .setDescription(client.languages.__mf({phrase: 'warn.no-warn', locale: language}, {usern: user.username}))

                    interaction.reply({embeds: [embed]})

                }
            })

        } else if (interaction.options.getSubcommand() === "remove") {

            await Warn.findOne({ GuildId: interaction.guild.id, UserId: user.id, UserTag: user.tag}, async (err, data) => {
                if (err) throw err
                if (data) {
                    data.Content.splice(warnId, 1)
                    const embed = new EmbedBuilder()
                        .setColor(Config.color.GOOD)
                        .setDescription(client.languages.__mf({phrase: 'warn.remove-desc', locale: language}, {usern: user.username, warnid: warnId + 1}))
                    interaction.reply({embeds: [embed]})
                    data.save()
                } else {
                     const embed = new EmbedBuilder()
                        .setColor(Config.color.WARNING)
                        .setDescription(client.languages.__({phrase: 'warn.no.warn', locale: language}))
                    interaction.reply({embeds: [embed]})
                }
            })

        } else if (interaction.options.getSubcommand() === "clear") {

            await Warn.findOne({ GuildId: interaction.guild.id, UserId: user.id, UserTag: user.tag}, async (err, data) => {
                if (err) throw err
                if (data) {
                    await Warn.findOneAndDelete({ GuildId: interaction.guild.id, UserId: user.id, UserTag: user.tag})
                    const embed = new EmbedBuilder()
                        .setColor(Config.color.GOOD)
                        .setDescription(client.languages.__mf({phrase: 'warn.clear-desc', locale: language}, {usern: user.username}))
                    interaction.reply({embeds: [embed]})
                    data.save()
                } else {
                     const embed = new EmbedBuilder()
                        .setColor(Config.color.WARNING)
                        .setDescription(client.languages.__mf({phrase: 'warn.no-warn', locale: language}, {usern: user.username}))
                    interaction.reply({embeds: [embed]})
                }
            })

        }
    }
}