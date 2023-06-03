const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const Config = require('./../../..//config.json');



const builder = new SlashCommandBuilder()
    .setName('guilds')	
    .setDescription('Cantidad de servidores')

module.exports = {
    builder: builder.toJSON(),
    name: 'guilds',
    async run(client, interaction, language) {

        try {
            const embedPerms = new EmbedBuilder()
                .setDescription('🔒 | Este comando es para developers')
                .setColor(Config.color.WARNING)
        
            if (interaction.user.id !== "485223539557793792") return interaction.reply({
            embeds: [embedPerms]
            });
            
            let servidores = client.guilds.cache.size
            let embed = new EmbedBuilder()
            .setDescription('**' + servidores + "** Servidores")
            .setColor(Config.color.CELE)
            
        
            interaction.reply({
            embeds: [embed]
            })

        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
    }
}
