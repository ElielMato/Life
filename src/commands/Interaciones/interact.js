const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const Config = require('./../../..//config.json');
const star = require('star-labs');

const builder = new SlashCommandBuilder()
    .setName('interact')	
    .setDescription('Comando para todas las interaciones.')
    .setDescriptionLocalizations({
        "es-ES": "Comando para todas las interacione.",
        "en-US": "Command for all interactions."
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('heal')
        .setDescription('Cura o revives a otro usuario.')
        .setDescriptionLocalizations({
            "es-ES": "Cura o revives a otro usuario.",
            "en-US": "Heal or revive another user."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('bye')
        .setDescription('Despedite de todos o de alguien especifico.')
        .setDescriptionLocalizations({
            "es-ES": "Despedite de todos o de alguien especifico.",
            "en-US": "Say goodbye to everyone or someone specific."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })))
    .addSubcommand(subcommand =>
        subcommand
        .setName('hi')
        .setDescription('Saluda a todo el servidor o alguien especifico.')
        .setDescriptionLocalizations({
            "es-ES": "Saluda a todo el servidor o alguien especifico.",
            "en-US": "Say hello to the whole server or someone specific."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })))
    .addSubcommand(subcommand =>
        subcommand
        .setName('blush')
        .setDescription('Sonrojarse.')
        .setDescriptionLocalizations({
            "es-ES": "Sonrojarse.",
            "en-US": "Blush."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })))
    .addSubcommand(subcommand =>
        subcommand
        .setName('bonk')
        .setDescription('Golpeas a alguien con un bate.')
        .setDescriptionLocalizations({
            "es-ES": "Golpeas a alguien con un bate.",
            "en-US": "You hit someone with a bat."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('confused')
        .setDescription('Te confundes.')
        .setDescriptionLocalizations({
            "es-ES": "Te confundes.",
            "en-US": "You get confused."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('cry')
        .setDescription('Llorar.')
        .setDescriptionLocalizations({
            "es-ES": "Llorar.",
            "en-US": "Cry."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('happy')
        .setDescription('Estas feliz.')
        .setDescriptionLocalizations({
            "es-ES": "Estas feliz.",
            "en-US": "Are you happy."
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('hug')
        .setDescription('Abraza a otro usuario.')
        .setDescriptionLocalizations({
            "es-ES": "Abraza a otro usuario.",
            "en-US": "Hug another user."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('kiss')
        .setDescription('Besa a otro usuario.')
        .setDescriptionLocalizations({
            "es-ES": "Besa a otro usuario.",
            "en-US": "Kiss another user."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('pat')
        .setDescription('Acaricia a otro usuario.')
        .setDescriptionLocalizations({
            "es-ES": "Acaricia a otro usuario.",
            "en-US": "Pat another user."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('slap')
        .setDescription('Le pegas a otro usuario.')
        .setDescriptionLocalizations({
            "es-ES": "Le pegas a otro usuario.",
            "en-US": "Slap another user."
        })
        .addUserOption(option => option
            .setName('user')
            .setDescription('Elige a un usuario')
            .setDescriptionLocalizations({
                "es-ES": "Elige a un usuario",
                "en-US": "Choose a user"
            })
            .setRequired(true)))

module.exports = {
    builder: builder.toJSON(),
    name: 'interact',
    async run(client, interaction, language) {
        
        if (interaction.options.getSubcommand() === "heal") {
        
            const interact = interaction.options._hoistedOptions[0].user.username;

            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.heal', locale: language}, {interact: interact}))
                .setColor(Config.color.CELE)
                .setImage(star.heal())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "bye") {

            const interact = interaction.options._hoistedOptions[0];

            if(!interact) {
                const embed = new EmbedBuilder()
                    .setDescription(client.languages.__({phrase: 'interaciones.bye-general', locale: language}))
                    .setColor(Config.color.CELE)
                    .setImage(star.bye())
                    .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed]
                });
            } else {
                const embed = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'interaciones.bye', locale: language}, {interact: interact.user.username}))
                    .setColor(Config.color.CELE)
                    .setImage(star.bye())
                    .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed]
                });
            }

        } else if (interaction.options.getSubcommand() === "hi") {
            const interact = interaction.options._hoistedOptions[0];

            if(!interact) {
                const embed = new EmbedBuilder()
                    .setDescription(client.languages.__({phrase: 'interaciones.hi-general', locale: language}))
                    .setColor(Config.color.CELE)
                    .setImage(star.hi())
                    .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed]
                });
            } else {
                const embed = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'interaciones.hi', locale: language}, {interact: interact.user.username}))
                    .setColor(Config.color.CELE)
                    .setImage(star.hi())
                    .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                    .setTimestamp();
                interaction.reply({
                    embeds: [embed]
                });
            }
        } else if (interaction.options.getSubcommand() === "blush") {

            const embed = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'interaciones.blush', locale: language}))
                .setColor(Config.color.CELE)
                .setImage(star.blush())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "bonk") {

            const interact = interaction.options._hoistedOptions[0].user.username;
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.bonk', locale: language}, {interact: interact}))
                .setColor(Config.color.CELE)
                .setImage(star.bonk())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "confused") {

            const embed = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'interaciones.confused', locale: language}))
                .setColor(Config.color.CELE)
                .setImage(star.confused())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "cry") {

            const embed = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'interaciones.cry', locale: language}))
                .setColor(Config.color.CELE)
                .setImage(star.cry())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "happy") {

            const embed = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'interaciones.happy', locale: language}))
                .setColor(Config.color.CELE)
                .setImage(star.happy())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "hug") {

            const interact = interaction.options._hoistedOptions[0].user.username;
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.hug', locale: language}, {interact: interact}))
                .setColor(Config.color.CELE)
                .setImage(star.hug())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "kiss") {

            const interact = interaction.options._hoistedOptions[0].user.username;
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.kiss',locale: language}, {interact: interact}))
                .setColor(Config.color.CELE)
                .setImage(star.kiss())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer',locale: language}, {user: interaction.user.username}),iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "pat") {

            const interact = interaction.options._hoistedOptions[0].user.username;
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.pat', locale: language}, {interact: interact}))
                .setColor(Config.color.CELE)
                .setImage(star.pat())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        } else if (interaction.options.getSubcommand() === "slap") {

            const interact = interaction.options._hoistedOptions[0].user.username;
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'interaciones.slap', locale: language}, {interact: interact}))
                .setColor(Config.color.CELE)
                .setImage(star.slap())
                .setFooter({text: client.languages.__mf({phrase: 'interaciones.footer', locale: language}, {user: interaction.user.username}), iconURL: `${client.user.displayAvatarURL()}`})
                .setTimestamp();
            interaction.reply({
                embeds: [embed]
            });

        }
    }
}