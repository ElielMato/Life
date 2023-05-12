const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    EmbedBuilder,
    PermissionsBitField,
    StringSelectMenuBuilder,
    ActionRowBuilder,
    ChannelType
} = require("discord.js");
const Config = require('./../../..//config.json')
const Twitch = require('../../models/twitch')
const Emoji = require('../../json/emoji.json')

const builder = new SlashCommandBuilder()
    .setName('twitch')
    .setDescription('Añade/Elimina un usuario de twitch de las notificaciones')
    .setDescriptionLocalizations({
        'es-ES': "Añade/Elimina un usuario de twitch de las notificaciones",
        "en-US": "Add/Remove a twitch user from notifications"
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('add')
        .setNameLocalizations({
            'es-ES': "añade",
            "en-US": "add"
        })
        .setDescription('Agrega un usuario de twitch de las notificaciones')
        .setDescriptionLocalizations({
        'es-ES': "Agrega un usuario de twitch de las notificaciones",
        "en-US": "Add a twitch user notifications"
        })
        .addStringOption(option => option
            .setName('name')
            .setNameLocalizations({
                'es-ES': "nombre",
                "en-US": "name"
            })
            .setDescription('Escribe el nombre de twitch')
                .setDescriptionLocalizations({
                'es-ES': "Escribe el nombre de twitch",
                "en-US": "Write the name of twitch"
                })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('remove')
        .setNameLocalizations({
            'es-ES': "elimina",
            "en-US": "remove"
        })
        .setDescription('Elimina un usuario de twitch de las notificaciones')
        .setDescriptionLocalizations({
            'es-ES': "Elimina un usuario de twitch de las notificaciones",
            "en-US": "Remove a twitch user notifications"
        })
        .addStringOption(option => option
            .setName('name')
            .setNameLocalizations({
                'es-ES': "nombre",
                "en-US": "name"
            })
            .setDescription('Escribe el nombre de twitch')
                .setDescriptionLocalizations({
                'es-ES': "Escribe el nombre de twitch",
                "en-US": "Write the name of twitch"
                })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('channel')
        .setNameLocalizations({
            'es-ES': "canal",
            "en-US": "channel"
        })
        .setDescription('Elige un canal de notificaciones')
        .setDescriptionLocalizations({
            'es-ES': "Quita usuario de twitch para las notificaciones",
            "en-US": "Choose a notification channel"
        })
        .addChannelOption(option => option
            .setName('canal')
            .setNameLocalizations({
                'es-ES': "canal",
                "en-US": "channel"
            })
            .setDescription('Elige un canal')
                .setDescriptionLocalizations({
                'es-ES': "Elige un canal",
                "en-US": "Choose a channel"
                })
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)))


module.exports = {
    builder: builder.toJSON(),
    name: 'twitch',
    async run(client, interaction, language) {

        try {
            const check = client.emojis.cache.get(Emoji.check)
            const cross = client.emojis.cache.get(Emoji.cross)

            var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
            const embedPerms = new EmbedBuilder()
                .setDescription(client.languages.__({
                    phrase: 'general.not-permissions',
                    locale: language
                }))
                .setColor(Config.color.WARNING)

            if (!permisos) return interaction.reply({
                embeds: [embedPerms],
                ephemeral: true
            });

            if (interaction.options.getSubcommand() === "add") {  
                
                const userName = interaction.options.getString("name");
                const guildTwitch = await Twitch.findOne({
                    GuildId: interaction.guild.id,
                });

                if(!guildTwitch) {
                    Twitch.create({
                        GuildId: interaction.guild.id,
                        UserTwitch: [userName]
                    });

                } else {
                    guildTwitch.UserTwitch.push(userName);
                    await guildTwitch.save();
                }

                const embedAdd = new EmbedBuilder()
                    .setDescription(`${check}` + client.languages.__mf({
                        phrase: 'twitch.add',
                        locale: language
                    }, {userName: userName}))
                    .setColor(Config.color.GOOD)

                interaction.reply({
                    embeds: [embedAdd],
                    ephemeral: true
                })

            } else if (interaction.options.getSubcommand() === "remove") {

                const userName = interaction.options.getString("name");
                const guildTwitch = await Twitch.findOne({
                    GuildId: interaction.guild.id,
                });

                if (!guildTwitch) {
                    const embedNot = new EmbedBuilder()
                        .setDescription(`${cross}` + client.languages.__({
                            phrase: 'twitch.notremove',
                            locale: language
                        }))
                        .setColor(Config.color.BAD)

                    interaction.reply({
                        embeds: [embedNot],
                        ephemeral: true
                    })
                    return;
                } else {
                    if (guildTwitch.UserTwitch.includes(userName)) {
                        guildTwitch.UserTwitch = guildTwitch.UserTwitch.filter(name => name !== userName);
                        const embedRemove = new EmbedBuilder()
                            .setDescription(`${check}` + client.languages.__mf({
                                phrase: 'twitch.remove',
                                locale: language
                            }, {userName: userName}))
                            .setColor(Config.color.GOOD)

                        interaction.reply({
                            embeds: [embedRemove],
                            ephemeral: true
                        })
                        await guildTwitch.save();
                    } else {
                        const embedUser = new EmbedBuilder()
                            .setDescription(`${cross}` + client.languages.__mf({
                                phrase: 'twitch.user',
                                locale: language
                            }, {userName: userName}))
                            .setColor(Config.color.BAD)

                        interaction.reply({
                            embeds: [embedUser],
                            ephemeral: true
                        })
                        interaction.reply(``);
                    } 
                }

                
            } else if (interaction.options.getSubcommand() === "channel") {

                const channel = interaction.options.getChannel("canal");
                const guildTwitch = await Twitch.findOne({
                    GuildId: interaction.guild.id,
                });

                if (!guildTwitch) {
                    Twitch.create({
                        GuildId: interaction.guild.id,
                    });
                } else {
                    await guildTwitch.updateOne({ChannelId: channel.id})
                    const embedChannel = new EmbedBuilder()
                        .setDescription(`${check}` + client.languages.__({
                            phrase: 'twitch.channel',
                            locale: language
                        }))
                        .setColor(Config.color.GOOD)

                    interaction.reply({
                        embeds: [embedChannel],
                        ephemeral: true
                    })
                }
            }

        } catch (error) {
            console.log("Error en SlashCommand: " + error);
        }
    }
}