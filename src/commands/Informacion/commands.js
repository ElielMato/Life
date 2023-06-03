const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const translate = require('google-translate');
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('commands')	
    .setDescription('Muestra la lista de comandos')
    .setDescriptionLocalizations({
        'es-ES': 'Muestra la lista de comandos',
        'en-US': 'Show command list'
    })
    .addStringOption(option => option
            .setName('options')
            .setDescription('Todos los comandos del bot')
            .setDescriptionLocalizations({
                'es-ES': 'Todos los comandos del bot',
                'en-US': 'All bot commands'
            })
            .setRequired(true)
            .addChoices(
                { name: 'Settings', value: 'config' },
                { name: 'Fun', value: 'fun' },
                { name: 'Economy', value: 'econ' },
                { name: 'Information', value: 'info' },
                { name: 'Interacctions', value: 'inte' },
                { name: 'Actions', value: 'act' },
                { name: 'Moderation', value: 'mod' },
                //{ name: 'Mining', value: 'mine' },
                { name: 'Music', value: 'music' },
                { name: 'Levels', value: 'level' },
                { name: 'Setup', value: 'setup' },
                { name: 'Giveaway', value: 'give' },
                ))

module.exports = {
    builder: builder.toJSON(),
    name: 'commands',
    async run(client, interaction, language) {

        const command = interaction.options._hoistedOptions[0].value
        
        if(command == "config"){

            const admin = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-config', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-config', locale: language}))
                .setColor(Config.color.CELE)
            
            interaction.reply({
                embeds: [admin],
                ephemeral: true
            })

        } else if (command == "fun") {

            const diver = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-fun', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-fun', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [diver],
                ephemeral: true
            })

        } else if (command == "econ") {

            const eco = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-econo', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-eco', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [eco],
                ephemeral: true
            })

        } else if (command == "info") {

            const info = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-info', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-info', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [info],
                ephemeral: true
            })

        } else if (command == "inte") {

            const inte = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-inte', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-inte', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [inte],
                ephemeral: true
            })

        } else if (command == "mine") {

            const mine = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-mine', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-mine', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [mine],
                ephemeral: true
            })  
        } else if (command == "level") {

            const nivel = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-level', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-level', locale: language}))
                .setColor(Config.color.CELE)
            
            interaction.reply({
                embeds: [nivel],
                ephemeral: true
            })

        } else if (command == "setup") {

            const setup = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-setup', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-setup', locale: language}))
                .setColor(Config.color.CELE)
            
            interaction.reply({
                embeds: [setup],
                ephemeral: true
            })

        } else if (command == "give") {

            const sorteo = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-giveaway', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-give', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [sorteo],
                ephemeral: true
            })

        } else if (command == "music") {

            const sorteo = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-giveaway', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-music', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [sorteo],
                ephemeral: true
            })

        }  else if (command == "act") {

            const action = new EmbedBuilder()
                .setTitle(client.languages.__({phrase: 'commands.title-action', locale: language}))
                .setDescription(client.languages.__({phrase: 'commands.desc-act', locale: language}))
                .setColor(Config.color.CELE)

            interaction.reply({
                embeds: [action],
                ephemeral: true
            })

        }









       
    }
}