const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    EmbedBuilder,
    PermissionsBitField
} = require("discord.js");
const Config = require('./../../..//config.json');
const ms = require("ms")
const Emoji = require('../../json/emoji.json')

const builder = new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Configura los sorteos para tu servidor')
    .setDescriptionLocalizations({
        "es-ES": "Configura los sorteos para tu servidor",
        "en-US": "Configure giveaways for your server"
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('start')
        .setDescription('Inicia sorteos para tu servidor')
        .setDescriptionLocalizations({
            "es-ES": "Inicia sorteos para tu servidor",
            "en-US": "Start giveaways for your server"
        })
        .addStringOption(option => option
            .setName('duration')
            .setRequired(true)
            .setNameLocalizations({
                "es-ES": "duracion",
                "en-US": "duration"
            })
            .setDescription('Elige el tiempo de duracion')
            .setDescriptionLocalizations({
                "es-ES": "Elige el tiempo de duracion",
                "en-US": "Choose the duration time"
            }))
        .addNumberOption(option => option
            .setName('winners')
            .setRequired(true)
            .setNameLocalizations({
                "es-ES": "ganadores",
                "en-US": "winners"
            })
            .setDescription('Elige la cantidad de ganadores')
            .setDescriptionLocalizations({
                "es-ES": "Elige la cantidad de ganadores",
                "en-US": "Choose the number of winners"
            }))
        .addStringOption(option => option
            .setName('prize')
            .setRequired(true)
            .setNameLocalizations({
                "es-ES": "premio",
                "en-US": "prize"
            })
            .setDescription('Elige el premio')
            .setDescriptionLocalizations({
                "es-ES": "Elige el premio",
                "en-US": "Choose the prize"
            }))
        .addChannelOption(option => option
            .setName('channel')
            .setRequired(true)
            .setNameLocalizations({
                "es-ES": "canal",
                "en-US": "channel"
            })
            .setDescription('Elige el canal')
            .setDescriptionLocalizations({
                "es-ES": "Elige el canal",
                "en-US": "Choose the channel"
            })))
    .addSubcommand(subcommand =>
        subcommand
        .setName('reroll')
        .setDescription('Elije nuevamente los ganadores del sorteo')
        .setDescriptionLocalizations({
            "es-ES": "Elije nuevamente los ganadores del sorteo",
            "en-US": "Choose again the winners of the giveaway"
        })
        .addStringOption(option => option
            .setName('giveaway')
            .setRequired(true)
            .setNameLocalizations({
                "es-ES": "giveaway",
                "en-US": "sorteo"
            })
            .setDescription('Escribe la ID del mensaje')
            .setDescriptionLocalizations({
                "es-ES": "Escribe la ID del mensaje",
                "en-US": "Write the message ID"
            })))

module.exports = {
    builder: builder.toJSON(),
    name: 'giveaway',
    async run(client, interaction, language) {

        const dot = client.emojis.cache.get(Emoji.dot)
        const check = client.emojis.cache.get(Emoji.check)
        const cross = client.emojis.cache.get(Emoji.cross)

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)

        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });


        if (interaction.options.getSubcommand() === "start") {

            const giveawayChannel = interaction.options.getChannel('channel');
            const giveawayDuration = interaction.options.getString('duration');
            const giveawayWinnerCount = interaction.options.getNumber('winners');
            const giveawayPrize = interaction.options.getString('prize');

            if (!giveawayChannel.isTextBased()) {
                return interaction.reply({
                    content: 'Selecciona un canal de texto!',
                    ephemeral: true
                });
            }

            if (isNaN(ms(giveawayDuration))) {
                return interaction.reply({
                    content: 'Selecciona un tiempo valido.',
                    ephemeral: true
                });
            }

            if (giveawayWinnerCount < 1) {
                return interaction.reply({
                    content: 'Selecciona una cantidad de ganadores valido.',
                })
            }

            await interaction.deferReply({ ephemeral: true })

            client.giveawaysManager.start(giveawayChannel, {
                duration: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayWinnerCount),
                hostedBy: interaction.user,
                messages: {
                    drawing: `${dot}` + client.languages.__({phrase: 'giveaway.drawing', locale: language}),
                    winners: `${dot}` + client.languages.__({phrase: 'giveaway.winner', locale: language}),
                    inviteToParticipate: `${dot}` + client.languages.__({phrase: 'giveaway.participate', locale: language}),
                    hostedBy: `${dot}` + client.languages.__mf({phrase: 'giveaway.hosted', locale: language}, {user: interaction.user.id}),
                    winMessage: client.languages.__({phrase: 'giveaway.winMenssage', locale: language}),
                    embedFooter: client.languages.__({phrase: 'giveaway.footer', locale: language}),
                    noWinner: `${dot}` + client.languages.__({phrase: 'giveaway.noWinner', locale: language}),
                    endedAt: client.languages.__({phrase: 'giveaway.end', locale: language})
                }
                
            });

            interaction.editReply({
                content: `Giveaway started in ${giveawayChannel}!`,
                ephemeral: true
            })

        } else if (interaction.options.getSubcommand() === "reroll") {

            const embedNot = new EmbedBuilder()
                .setColor(Config.color.BAD)
            const query = interaction.options.getString('giveaway');

            const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

            if (!giveaway) {
                embedNot.setDescription(`${cross}` + client.languages.__({phrase: 'giveaway.notExist', locale: language }))
                return interaction.reply({
                    embeds: [embedNot],
                    ephemeral: true
                });
            }

            if (!giveaway.ended) {
                embedNot.setDescription(`${cross}` + client.languages.__({phrase: 'giveaway.notEnd', locale: language }))
                return interaction.reply({
                    embeds: [embedNot],
                    ephemeral: true
                });
            }
            client.giveawaysManager.reroll(giveaway.messageId, {
                congrat: client.languages.__({phrase: 'giveaway.congrat', locale: language }),
                error: client.languages.__({phrase: 'giveaway.error', locale: language }),
                replyWhenNoWinner: true
            }).then(() =>{
                const embed = new EmbedBuilder()
                    .setColor(Config.color.GOOD)
                    .setDescription(`${check}` + client.languages.__({phrase: 'giveaway.rerrol', locale: language }))
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            })
        }
    }
}
