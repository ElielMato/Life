const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('8ball')	
    .setDescription('Realiza una pregunta a 8ball')
    .setDescriptionLocalizations({
        'es-ES': "Realiza una pregunta a 8ball",
        'en-US': "Ask 8ball a question"
    })
    .addStringOption(option => option
        .setName('pregunta')
        .setNameLocalizations({
            'es-ES': "pregunta",
            'en-US': "question"
        })
        .setDescription('¿Cual es la pregunta?')
        .setDescriptionLocalizations({
            'es-ES': "¿Cual es la pregunta?",
            'en-US': "What is the question?"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: '8ball',
    async run(client, interaction, language) {

        try {
            var rpts = [
                client.languages.__({phrase: '8ball.8-si', locale: language}),
                client.languages.__({phrase: '8ball.8-no', locale: language}),
                client.languages.__({phrase: '8ball.8-tal', locale: language}),
                client.languages.__({phrase: '8ball.8-nose', locale: language}),
                client.languages.__({phrase: '8ball.8-claro', locale: language}),
                client.languages.__({phrase: '8ball.8-supuesto', locale: language}),
                client.languages.__({phrase: '8ball.8-ahora', locale: language})
            ];

            let pregunta = interaction.options._hoistedOptions[0].value;

            const embed = new EmbedBuilder()
                .setTitle('🎱 | 8Ball')
                .setColor(Config.color.CELE)
                .addFields([
                    {
                        name: client.languages.__({phrase: '8ball.8-pregunta', locale: language}),
                        value: `${pregunta}`
                    },
                    {
                        name: client.languages.__({phrase: '8ball.8-respuesta', locale: language}),
                        value: `${rpts[Math.floor(Math.random() * rpts.length)]}`
                    }
                ])
            interaction.reply({
                embeds: [embed]
            })

        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
    }    
}