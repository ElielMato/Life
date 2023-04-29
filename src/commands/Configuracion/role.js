const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const Role = require('../../models/rolemute')

const builder = new SlashCommandBuilder()
    .setName('role')	
    .setDescription('Añade/Remueve roles')
    .addSubcommand(subcommand =>
            subcommand
            .setName('add')
            .setDescription('Añade un rol')
            .setDescriptionLocalizations({
                "es-ES": "Agregar una usuario a un roll",
                "en-US": "Add a user to a role"
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
            .addRoleOption(option => option
                .setName('rol')
                .setNameLocalizations({
                    "es-ES": "rol",
                    "en-US": "role"
                })
                .setDescription('Elige un rol')
                .setDescriptionLocalizations({
                    "es-ES": "Elige a un rol",
                    "en-US": "Choose a role"
                })
                .setRequired(true)))
    .addSubcommand(subcommand =>
            subcommand
            .setName('remove')
            .setDescription('Remueve un rol')
            .setDescriptionLocalizations({
                "es-ES": "Quitar el rol a un usuario",
                "en-US": "Remove a user from role"
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
            .addRoleOption(option => option
                .setName('rol')
                .setNameLocalizations({
                    "es-ES": "rol",
                    "en-US": "role"
                })
                .setDescription('Elige un rol')
                .setDescriptionLocalizations({
                    "es-ES": "Elige a un rol",
                    "en-US": "Choose a role"
                })
                .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('mute')
        .setDescription('Agrega el rol para mutear')
        .setDescriptionLocalizations({
            "es-ES": "Agrega el rol para mutear",
            "en-US": "Add role to mute"
        })
        .addRoleOption(option => option
                .setName('rol')
                .setNameLocalizations({
                    "es-ES": "rol",
                    "en-US": "role"
                })
                .setDescription('Elige un rol')
                .setDescriptionLocalizations({
                    "es-ES": "Elige a un rol",
                    "en-US": "Choose a role"
                })
                .setRequired(true)))

module.exports = {
    builder: builder.toJSON(),
    name: 'role',
    async run(client, interaction, language) {

         try {

            var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles);
            const embedPerms = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
                .setColor(Config.color.WARNING)

            if (!permisos) return interaction.reply({
                embeds: [embedPerms],
                ephemeral: true
            });

            if (interaction.options.getSubcommand() === "add") {

            const role = interaction.options.getRole("rol")
            const member = interaction.options.getUser("usuario")
            const usuario = await interaction.guild.members.fetch(member.id)

            if (interaction.member.roles.highest.position > usuario.roles.highest.position){

                usuario.roles.add(role)

                const embed = new EmbedBuilder()
                    .setColor(Config.color.GOOD)
                    .setDescription(client.languages.__mf({phrase: 'role.role-add', locale: language}, {member: member.id}))

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })

            } else {

                const embed = new EmbedBuilder()
                    .setColor(Config.color.WARNING)
                    .setDescription(client.languages.__({phrase: 'role.role-noperms', locale: language}))

                interaction.reply({
                    embeds: [embedPerms],
                    ephemeral: true,
                })
                
            }
            

            } else if (interaction.options.getSubcommand() === "remove") {

            const role = interaction.options.getRole("rol")
            const member = interaction.options.getUser("usuario")
            const usuario = await interaction.guild.members.fetch(member.id)

            if (interaction.member.roles.highest.position > usuario.roles.highest.position) {

                usuario.roles.remove(role)

                const embed = new EmbedBuilder()
                    .setColor(Config.color.BAD)
                    .setDescription(client.languages.__mf({phrase: 'role.role-remove', locale: language}, {member: member.id}))

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })

            } else {

                const embed = new EmbedBuilder()
                    .setColor(Config.color.WARNING)
                     .setDescription(client.languages.__({phrase: 'role.role-noperms', locale: language}))

                interaction.reply({
                    embeds: [embedPerms],
                    ephemeral: true,
                })

            }
            } else if (interaction.options.getSubcommand() === "mute") { 

            const mute = interaction.options.getRole("rol")

            await Role.findOne({GuildId: interaction.guildId.toString()}).then((s, err) => {
                    if (err) return console.log(err);
                    if (s) {
                        s.RoleId = mute
                        s.save().catch(e => console.log(e));
                    } else {
                        const newGuild = new Role({
                            GuildId: interaction.guild.id,
                            RoleId: mute
                        })
                        newGuild.save().catch(e => console.log(e));
                    }
                })

            const embed = new EmbedBuilder()
                .setColor(Config.color.GOOD)
                .setDescription(client.languages.__mf({phrase: 'role.role-mute', locale: language}, {mute: mute}))

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })

            }
            
         } catch (error) {
             console.log("Error en SlashCommand:" + error);
         }

        
    }
}