const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    EmbedBuilder,
    PermissionsBitField,
    StringSelectMenuBuilder,
    ActionRowBuilder,
} = require("discord.js");
const Config = require('./../../..//config.json');
const Welcome = require('../../models/welcome')

const builder = new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Establece las configuracion de la bienvenida')
    .setDescriptionLocalizations({
        'es-ES': "Establece las configuracion de la bienvenida",
        "en-US": "Set the welcome config"
    })
   

module.exports = {
    builder: builder.toJSON(),
    name: 'welcome',
    async run(client, interaction, language) {
  
        const welcome = await Welcome.findOne({ GuildId: interaction.guild.id})
        if (!welcome) return await Welcome.create({
            GuildId: interaction.guild.id
        });

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)

        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });

        const embed = new EmbedBuilder()
            .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setColor(Config.color.CELE)
            .setDescription(client.languages.__({phrase: 'welcome.description', locale: language}))

        const menuWelcome = new StringSelectMenuBuilder()
            .setCustomId('options')
            .setPlaceholder(client.languages.__({phrase: 'welcome.menu-options', locale: language}))
            .addOptions(
                {
                    label: client.languages.__({phrase: 'welcome.option-title', locale: language }),
                    description: client.languages.__({phrase: 'welcome.title-description', locale: language }),
                    value: "title",
                    emoji: "✏"
                },
                {
                    label: client.languages.__({phrase: 'welcome.option-description', locale: language }),
                    description: client.languages.__({phrase: 'welcome.description-description', locale: language }),
                    value: "description",
                    emoji: "📖"
                },
                {
                    label: client.languages.__({phrase: 'welcome.option-color', locale: language }),
                    description: client.languages.__({phrase: 'welcome.color-description', locale: language }),
                    value: "color",
                    emoji: "🎨"
                },
                {
                    label: client.languages.__({phrase: 'welcome.option-channel', locale: language }),
                    description: client.languages.__({phrase: 'welcome.channel-description', locale: language }),
                    value: "channel",
                    emoji: "📕"
                },
                {
                    label: client.languages.__({phrase: 'welcome.option-roleid', locale: language }),
                    description: client.languages.__({phrase: 'welcome.roleid-description', locale: language }),
                    value: "role",
                    emoji: "✨"
                });
    
        const row = new ActionRowBuilder().addComponents(menuWelcome);

        interaction.reply({
            embeds: [embed],
            components: [row],
        })
    }
}