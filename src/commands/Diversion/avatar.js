const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('avatar')	
    .setDescription('Muestra tu avatar o el de un usuario')
    .setDescriptionLocalizations({
        'es-ES': "Muestra tu avatar o el de un usuario",
        'en-US': "Show your avatar or that of a user"
    })
    .addUserOption(option => option
        .setName('usuario')
        .setNameLocalizations({
            'es-ES': "usuario",
            'en-US': "user"
        })
        .setDescription('Ver el avatar del usuario.')
        .setDescriptionLocalizations({
            'es-ES': "Ver el avatar del usuario",
            'en-US': "View the user's avatar"
        }))

module.exports = {
    builder: builder.toJSON(),
    name: 'avatar',
    async run(client, interaction, language) {

        try {
            const member = interaction.options.getUser('usuario')
            if (member) {
                const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setTitle(client.languages.__mf({phrase: 'avatar.avatar-member', locale: language}, {member: member.username}))
                .setImage(member.displayAvatarURL({ dynamic: true, size: 4096}))
                return interaction.reply({ embeds: [embed]})
            } else {
                const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setTitle(client.languages.__({phrase: 'avatar.avatar-you', locale: language}))
                .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 4096}))
                return interaction.reply({ embeds: [embed]})
            }
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
        
        
    }
}