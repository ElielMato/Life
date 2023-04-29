const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('logro')
    .setNameLocalizations({
        'es-ES': "logro",
        'en-US': "achievement"
    })
    .setDescription('Minecraft Logro')
    .setDescriptionLocalizations({
        'es-ES': "Minecraft Logro",
        'en-US': "Minecraft Achievement"
    })
    .addStringOption(option => option
        .setName('texto')
        .setNameLocalizations({
            'es-ES': "texto",
            'en-US': "text"
        })
        .setDescription('Escribe un texto')
        .setDescriptionLocalizations({
            'es-ES': "Escribe un texto",
            'en-US': "White a text"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'logro',
    async run(client, interaction, language) {

        try {
            const texto = interaction.options._hoistedOptions[0].value;

            const texto_logro = texto.replace(/( )/g, '+');

            const embedMin = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'logro.logro-min', locale: language}))
                .setColor(Config.color.WARNING)

            if (texto.length < 2) return interaction.reply({
                embeds: [embedMin],
                ephemeral: true
            });

            const embedMax = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'logro.logro-max', locale: language}))
                .setColor(Config.color.WARNING)

            if (texto.length > 23) return interaction.reply({
                embeds: [embedMax],
                ephemeral: true
            });

            const imagen = Math.floor(Math.random() * 38) + 1;

            interaction.reply(`https://minecraftskinstealer.com/achievement/${imagen}/%C2%A1Logro+obtenido%21/${texto_logro}`)
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }

        
    }
}