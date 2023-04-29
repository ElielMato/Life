const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('unlock')	
    .setDescription('Desbloquea el canal')
    .setDescriptionLocalizations({
        "es-ES": "Desbloquea el canal",
        "en-US": "Unlock the channel"
    })
    .addChannelOption(option => option
        .setName('canal')
        .setNameLocalizations({
            "es-ES": "canal",
            "en-US": "channel"
        })
        .setDescription('Elige el canal')
        .setDescriptionLocalizations({
            "es-ES": "Elige el canal",
            "en-US": "Choose the channel"
        })
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'unlock',
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

        const channel = interaction.options._hoistedOptions[0].channel;
        const ever = interaction.guild.roles.cache.find(aus => aus.name === '@everyone');

        channel.permissionOverwrites.edit(ever, {
            ViewChannel: true,
            SendMessages: true,
            AddReactions: true
        })

        const embedUnLock = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'unlock.unlock-channel', locale: language}))
            .setColor(Config.color.GOOD);
            
        interaction.reply({
            embeds: [embedUnLock],
            ephemeral: true
        })

        } catch (error) {
            console.log("Error en SlashCommand: " + error);
        }
    }
}