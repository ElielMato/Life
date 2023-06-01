const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const Config = require('../../../config.json');

const builder = new SlashCommandBuilder()
    .setName('lock')	
    .setDescription('Bloquea el canal')
    .setDescriptionLocalizations({
        "es-ES": "Bloquea el canal",
        "en-US": "Lock the channel"
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
    name: 'lock',
    async run(client, interaction, language) {

        try {

            var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
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
                SendMessages: false,
                AddReactions: false
            })

            const embedLock = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'lock.lock-channel', locale: language}))
                .setColor(Config.color.GOOD);
            interaction.reply({
                embeds: [embedLock]
            })
            
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }

        

    }
}