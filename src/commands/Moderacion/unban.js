const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, GuildMemberManager } = require("discord.js")
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('unban')	
    .setDescription('Desbanear a un usuario')
    .setDescriptionLocalizations({
        "es-ES": "Desbanear a un usuario",
        "en-US": "Unban a user"
    })
    .addStringOption(option => option
        .setName('usuario')
        .setNameLocalizations({
            "es-ES": "usuario",
            "en-US": "user"
        })
        .setDescription('Elige un usuario')
        .setDescriptionLocalizations({
            "es-ES": "Ecribe la ID del usuario",
            "en-US": "Enter the user ID"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'unban',
    async run(client, interaction, language) {
        

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)
    
        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });

        //var permisos1 = interaction.guild.me.permissions.has(PermissionsBitField.Flags.BanMembers);
        //const embedPerms1 = new EmbedBuilder()
        //    .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
        //    .setColor(Config.color.WARNING)
        //
        //if (!permisos1) return interaction.reply({
        //    embeds: [embedPerms1],
        //    ephemeral: true
        //});
        const userId = interaction.options._hoistedOptions[0].value;
        const member = interaction.guild.members.cache.get(user) || await interaction.guild.members.fetch(user).catch(err => {})

        const noban = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'unban.no-user', locale: language}))
            .setColor(Config.color.WARNING)

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply({
            embeds: [noban],
            ephemeral: true
        })

        try {
            let user = await interaction.guild.members.unban(userId)
            let unbanSuccess = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'unban.finish', locale: language }))
                .setColor(Config.color.GOOD)
            return interaction.reply({ embeds: [unbanSuccess] })
         } catch {
            let errorEmbed = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'unban.no-bans', locale: language }))
                .setColor(Config.color.WARNING)
            return interaction.reply({embeds: [errorEmbed]})
         }

        
        
















        //const totalBans = await interaction.guild.bans.fetch()
//
        //console.log(interaction.guild.bans.fetch(user))
//
        //const userToUnban = totalBans.find(x => x.user.id == user.value || x.user.username == user.value || x.user.tag == user.value)
//
        //const nouser = new EmbedBuilder()
        //    .setDescription(client.languages.__({phrase: 'unban.no-bans', locale: language}))
        //    .setColor(Config.color.WARNING)
//
        //if (!userToUnban) return interaction.reply({
        //    embeds: [nouser],
        //    ephemeral: true
        //})
//
        //await interaction.guild.bans.remove(user)
//
        //const embed = new EmbedBuilder()
        //    .setDescription(client.languages.__mf({phrase: 'unban.finish', locale: language}, {member: userTag})) 
        //    .setColor(Config.color.BAD)
        //    .setTimestamp()
//
        //return interaction.reply({
        //    embeds: [embed]
        //})
    }
}