const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('roles')	
    .setDescription('Muestra los roles del servidor')
    .setDescriptionLocalizations({
        "es-ES": "Muestra los roles del servidor",
        "en-US": "Shows server roles"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'roles',
    async run(client, interaction, language) {
        
        const id = interaction.guild.id

        const embed = new EmbedBuilder()
            .setTitle(client.languages.__({phrase: 'roles.roles-title', locale: language}))
            .setColor(Config.color.CELE)
            .setDescription(`${client.guilds.cache.get(id).roles.cache.map(role => `- ${role.name}`).join("\n")}`)

        interaction.reply({embeds: [embed]})

    }
}
