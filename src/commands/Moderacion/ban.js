const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('ban')	
    .setDescription('Banear a un usuario')
    .setDescriptionLocalizations({
        "es-ES": "Banear a un usuario",
        "en-US": "Ban a user"
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
        .setDescription('Elige la razon')
        .setDescriptionLocalizations({
            "es-ES": "Elige la razon",
            "en-US": "Choose a reason"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'ban',
    async run(client, interaction, language) {

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers);
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
            .setDescription(client.languages.__({phrase: 'ban.no-details', locale: language}))
            .setColor(Config.color.WARNING)

        if(!member) return interaction.reply({
            embeds: [nouser],
            ephemeral: true
        })

        const reason = interaction.options.getString('razon')

        const noban = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'ban.no-user', locale: language}))
            .setColor(Config.color.WARNING)

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply({
            embeds: [noban],
            ephemeral: true
        })

        const noperms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'ban.no-rol', locale: language}))
            .setColor(Config.color.WARNING)
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply({
            embeds: [noperms],
            ephemeral: true
        })

        
        const embed = new EmbedBuilder()
            .setDescription(client.languages.__mf({phrase: 'ban.finish', locale: language}, {member: member.user.tag, reason: reason})) 
            .setColor(Config.color.BAD)
            .setTimestamp()

        member.ban({ reason })
        return interaction.reply({
            embeds: [embed]
        })
    }
}