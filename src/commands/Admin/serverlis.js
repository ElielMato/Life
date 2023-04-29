const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    EmbedBuilder,
    PermissionFlagsBits,
    AttachmentBuilder
} = require("discord.js");
const Config = require('./../../..//config.json');


const builder = new SlashCommandBuilder()
    .setName('serverlist')
    .setDescription('Muestra la lista de servidores con las Ids de los servidor en los que esta tu bot')

module.exports = {
    builder: builder.toJSON(),
    name: 'serverlist',
    async run(client, interaction, language) {

        const embedPerms = new EmbedBuilder()
            .setDescription('🔒 | Este comando es para developers')
            .setColor(Config.color.WARNING)
        
        if (interaction.user.id !== "485223539557793792") return interaction.reply({
            embeds: [embedPerms]
        });

        const serverslist = client.guilds.cache.map(guild => `> **-** ${guild.name} \`(ID: ${guild.id})\``);
        const embed = new EmbedBuilder()
            .setTitle("Lista de Servidores")
            .setDescription(`El bot se encuentra en los siguientes servidores:\n${serverslist.join('\n')}`)
            .setColor(Config.color.CELE)
        interaction.reply({
            embeds: [embed]
        });

    }
}