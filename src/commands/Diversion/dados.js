const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('dados')
    .setNameLocalizations({
        'es-ES': "dados",
        'en-US': "dices"
    })
    .setDescription('Tira los dados y ve que numero te toca')
    .setDescriptionLocalizations({
        'es-ES': "Tira los dados y ve que numero te toca",
        'en-US': "Roll the dice and see what number you get"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'dados',
    async run(client, interaction, language) {

        try {
            let numeros = ["1", "2", "3", "4", "5", "6"];
            const number = numeros[Math.floor(Math.random() * numeros.length)]
            const embed = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'dados.dados-title', locale: language}))
                .setDescription(client.languages.__mf({phrase: 'dados.dados-desc', locale: language}, {number: number}))
                .setColor(Config.color.CELE)
            interaction.reply({embeds: [embed]})
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
        
    }
}