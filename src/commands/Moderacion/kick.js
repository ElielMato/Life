const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kickear a un usuario')
    .setDescriptionLocalizations({
        "es-ES": "Kickear a un usuario",
        "en-US": "Kick a user"
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
        .setDescription('Elige la razon')
        .setDescriptionLocalizations({
            "es-ES": "razon",
            "en-US": "reason"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'kick',
    async run(client, interaction, language) {

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)
    
        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });

        const user = interaction.options.getUser('usuario')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        const nouser = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'kick.no-details', locale: language}))
            .setColor(Config.color.WARNING)

        if(!member) return interaction.reply({
            embeds: [nouser],
            ephemeral: true
        })

        const reason = interaction.options.getString('razon')

        const noban = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'kick.no-user', locale: language}))
            .setColor(Config.color.WARNING)

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply({
            embeds: [noban],
            ephemeral: true
        })

        const noperms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'kick.no-rol', locale: language}))
            .setColor(Config.color.WARNING)
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply({
            embeds: [noperms],
            ephemeral: true
        })

        
        const embed = new EmbedBuilder()
            .setDescription(client.languages.__mf({phrase: 'kick.finish', locale: language}, {member: member.user.tag, reason: reason})) 
            .setColor(Config.color.BAD)
            .setTimestamp()

        member.kick({ reason })
        return interaction.reply({
            embeds: [embed]
        })
    }
}