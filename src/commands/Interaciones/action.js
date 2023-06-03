const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('act')	
    .setDescription('Comando para todas las acciones')
    .setDescriptionLocalizations({
        "es-ES": "Comando para todas las acciones.",
        "en-US": "Command for all actions."
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('jump')
        .setDescription('Saltar.')
        .setDescriptionLocalizations({
            "es-ES": "Saltar.",
            "en-US": "Jump."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('sing')
        .setDescription('Canta con tu voz hermosa.')
        .setDescriptionLocalizations({
            "es-ES": "Canta con tu voz hermosa.",
            "en-US": "Sing with your beautiful voice."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('run')
        .setDescription('Corre lo mas lejos que puedas.')
        .setDescriptionLocalizations({
            "es-ES": "Corre lo mas lejos que puedas.",
            "en-US": "Run as far as you can."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('play')
        .setDescription('Juega a lo que mas te guste.')
        .setDescriptionLocalizations({
            "es-ES": "Juega a lo que mas te guste.",
            "en-US": "Play what you like."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('dab')
        .setDescription('Realiza un dab.')
        .setDescriptionLocalizations({
            "es-ES": "Realiza un dab.",
            "en-US": "Make a Dab."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('boom')
        .setDescription('Haz una explosion.')
        .setDescriptionLocalizations({
            "es-ES": "Haz una explosion.",
            "en-US": "Make a boom."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('cook')
        .setDescription('Cocina lo que mas te guste.')
        .setDescriptionLocalizations({
            "es-ES": "Cocina lo que mas te guste.",
            "en-US": "Cook what you like."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('claps')
        .setDescription('Aplaude.')
        .setDescriptionLocalizations({
            "es-ES": "Aplaude.",
            "en-US": "Applaud."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('dance')
        .setDescription('Baila sin parar.')
        .setDescriptionLocalizations({
            "es-ES": "Baila sin parar.",
            "en-US": "Dance without stoppinge."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('eat')
        .setDescription('Come lo que quieras.')
        .setDescriptionLocalizations({
            "es-ES": "Come lo que quieras.",
            "en-US": "Eat what you want."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('sleep')
        .setDescription('Duerme, asi recuperas energias.')
        .setDescriptionLocalizations({
            "es-ES": "Duerme, asi recuperas energias.",
            "en-US": "Sleep, so you recover energy."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('suicide')
        .setDescription('No uses este comando, es peligroso.')
        .setDescriptionLocalizations({
            "es-ES": "No uses este comando, es peligroso.",
            "en-US": "Don't use this command, it's dangerous."
        }))

module.exports = {
    builder: builder.toJSON(),
    name: 'act',
    async run(client, interaction, language) {
        
        if (interaction.options.getSubcommand() === "jump") {

            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.jump', locale: language}, {user: user})) 
                .setColor(Config.color.CELE)
                .setImage(star.jump())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "sing") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.sing', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.sing())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "run") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.run', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.run())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "play") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.play', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.play())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "dab") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.dab', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.dab())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "boom") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.boom', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.boom())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "cook") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.cook', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.cook())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "claps") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.claps', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.claps())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "dance") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.dance', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.dance())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "eat") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.eat', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.feed())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "sleep") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.sleep', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.sleep())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "suicide") {
            
            const user = interaction.user.username
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.suicide', locale: language}, {user: user}))
                .setColor(Config.color.CELE)
                .setImage(star.suicide())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        }
    }
}