const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    EmbedBuilder,
    PermissionsBitField,
    StringSelectMenuBuilder,
    ActionRowBuilder
} = require("discord.js");
const Config = require('../../../config.json');
const ServerEconomy = require('../../models/servereconomy');
const Emoji = require('../../json/emoji.json')
const Welcome = require('../../models/welcome')

const builder = new SlashCommandBuilder()
    .setName('setup')	
    .setDescription('Configura los diferentes modulos')
    .setDescriptionLocalizations({
        "es-ES": "Configura los diferentes modulos",
        "en-US": "Configure the different modules"
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('currency')
        .setDescription('Establece el emoji de la economia')
        .setDescriptionLocalizations({
            "es-ES": "Establece el emoji de la economia",
            "en-US": "Set the economy emoji"
        })
        .addStringOption(option => option
            .setName('emoji')
            .setDescription('Elige tu emoji para la economia')
            .setDescriptionLocalizations({
                "es-ES": "Elige tu emoji para la economia",
                "en-US": "Choose the economy emoji"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('payout')
        .setDescription('Establece el maximo y minimo de la economia')
        .setDescriptionLocalizations({
            "es-ES": "Establece el maximo y minimo de los trabajos",
            "en-US": "Sets the maximum and minimum of the jobs"
        })
        .addStringOption(option => option
                .setName('trabajo')
                .setNameLocalizations({
                    "es-ES": "trabajo",
                    "en-US": "job"
                })
                .setDescription('Elige uno de los trabajos')
                .setDescriptionLocalizations({
                    "es-ES": "Elige uno de los trabajos",
                    "en-US": "Choose one of the jobs"
                })
                .setRequired(true)
                .addChoices(
                    { name: 'Work', value: 'work' },
                    { name: 'Beg', value: 'beg' },
                    { name: 'Crime', value: 'crime' },
                    { name: 'Postvideo', value: 'postvideo' },
                    { name: 'Postmeme', value: 'postmeme' }))
        .addNumberOption(option => option
            .setName('min')
            .setDescription('Minimo que se le paga')
            .setDescriptionLocalizations({
                    "es-ES": "Minimo que se le paga",
                    "en-US": "Minimum paid"
                })
                .setMinValue(1)
            .setRequired(true))
        .addNumberOption(option => option
            .setName('max')
            .setDescription('Maximo que se le paga')
            .setDescriptionLocalizations({
                "es-ES": "Maximo que se le paga",
                "en-US": "Maximum paid"
            })
            .setMinValue(1)
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('cooldown')
        .setDescription('Establece el cooldown de los trabajos')
        .setDescriptionLocalizations({
            "es-ES": "Establece el cooldown de los trabajos",
            "en-US": "Set the economy emoji"
        })
        .addStringOption(option => option
                .setName('trabajo')
                .setNameLocalizations({
                    "es-ES": "trabajo",
                    "en-US": "job"
                })
                .setDescription('Elige uno de los trabajos')
                .setDescriptionLocalizations({
                    "es-ES": "Elige uno de los trabajos",
                    "en-US": "Choose one of the jobs"
                })
                .setRequired(true)
                .addChoices(
                    { name: 'Work', value: 'work' },
                    { name: 'Beg', value: 'beg' },
                    { name: 'Crime', value: 'crime' },
                    { name: 'Postvideo', value: 'postvideo' },
                    { name: 'Postmeme', value: 'postmeme' }))
        .addNumberOption(option => option
            .setName('tiempo')
            .setNameLocalizations({
                "es-ES": "tiempo",
                "en-US": "time"
            })
            .setDescription('Elige el tiempo de cooldown de los trabajos (minutos)')
            .setDescriptionLocalizations({
                "es-ES": "Elige el tiempo de cooldown de los trabajo (minutos)",
                "en-US": "Choose the cooldown time of jobs (minutes)"
            })
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('welcome')
        .setDescription('Activas/Desactivar el sistema de bienvenida')
        .setDescriptionLocalizations({
            "es-ES": "Activas/Desactivar el sistema de bienvenida",
            "en-US": "Enable/Disable the welcome system"
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('level')
        .setDescription('Activas/Desactivar el sistema de niveles')
        .setDescriptionLocalizations({
            "es-ES": "Activas/Desactivar el sistema de niveles",
            "en-US": "Enable/Disable the levels system"
        }))
    .addSubcommand(subcommand =>
        subcommand
        .setName('twitch')
        .setDescription('Activas/Desactivar el sistema de notificaciones de twitch')
        .setDescriptionLocalizations({
            "es-ES": "Activas/Desactivar el sistema de notificaciones de twitch",
            "en-US": "Enable/Disable the twitch notification system"
        }))

module.exports = {
    builder: builder.toJSON(),
    name: 'setup',
    async run(client, interaction, language) {

        const star = client.emojis.cache.get(Emoji.starLevel)
        const twitch = client.emojis.cache.get(Emoji.twitch)

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)

        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });

        try {

            if (interaction.options.getSubcommand() === "currency") {

                const currency = interaction.options._hoistedOptions[0].value;

                const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                })

                if (economiaServer){
                    await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Emoji: currency})
                    const embed = new EmbedBuilder()
                        .setDescription(client.languages.__mf({phrase: 'setup.currency-finish', locale: language}, {currency: currency}))
                        .setColor(Config.color.GOOD);

                    interaction.reply({embeds: [embed]})
                } else {
                    ServerEconomy.create({
                        GuildId: interaction.guild.id
                    })

                    const embed = new EmbedBuilder()
                        .setColor(Config.color.CELE)
                        .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                    interaction.reply({embeds: [embed]})
                }

                

            } else if (interaction.options.getSubcommand() === "payout") {

                const trabajo = interaction.options._hoistedOptions[0].value;
                const min = interaction.options.getNumber("min")
                const max = interaction.options.getNumber("max")

                if (trabajo == "work") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Min:{Work: min }})
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Max:{Work: max }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.payout-finish', locale: language}, {min: min, max: max}))
                            .setColor(Config.color.GOOD);

                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "beg") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Min:{Beg: min }})
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Max:{Beg: max }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.payout-finish', locale: language}, {min: min, max: max}))
                            .setColor(Config.color.GOOD);

                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "crime") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Min:{Crime: min }})
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Max:{Crime: max }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.payout-finish', locale: language}, {min: min, max: max}))
                            .setColor(Config.color.GOOD);

                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "postvideo") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Min:{Postvideo: min }})
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Max:{Postvideo: max }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.payout-finish', locale: language}, {min: min, max: max}))
                            .setColor(Config.color.GOOD);

                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "postmeme") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Min:{Postmeme: min }})
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Max:{Postmeme: max }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.payout-finish', locale: language}, {min: min, max: max}))
                            .setColor(Config.color.GOOD);

                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } 

            } else if (interaction.options.getSubcommand() === "cooldown") {

                const trabajo = interaction.options._hoistedOptions[0].value;
                const tiempo = interaction.options._hoistedOptions[1].value;
                const cooldownReady = tiempo * 60000

                if (trabajo == "work") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Cooldown:{Work: cooldownReady }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.cooldown-finish', locale: language}, {tiempo: tiempo}))
                            .setColor(Config.color.GOOD);
                        
                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "beg") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Cooldown:{Beg: cooldownReady }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.cooldown-finish', locale: language}, {tiempo: tiempo}))
                            .setColor(Config.color.GOOD);
                        
                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "crime") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Cooldown:{Crime: cooldownReady }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.cooldown-finish', locale: language}, {tiempo: tiempo}))
                            .setColor(Config.color.GOOD);
                        
                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "postvideo") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Cooldown:{Postvideo: cooldownReady }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.cooldown-finish', locale: language}, {tiempo: tiempo}))
                            .setColor(Config.color.GOOD);
                        
                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } else if (trabajo == "postmeme") {

                    const economiaServer = await ServerEconomy.findOne({
                    GuildId: interaction.guild.id
                    })

                    if (economiaServer){
                        
                        await ServerEconomy.updateOne({GuildId: interaction.guild.id}, {Cooldown:{Postmeme: cooldownReady }})

                        const embed = new EmbedBuilder()
                            .setDescription(client.languages.__mf({phrase: 'setup.cooldown-finish', locale: language}, {tiempo: tiempo}))
                            .setColor(Config.color.GOOD);
                        
                        interaction.reply({embeds: [embed]})
                    } else {
                        ServerEconomy.create({
                            GuildId: interaction.guild.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(client.languages.__({phrase: 'general.economy-create', locale: language}))
                        interaction.reply({embeds: [embed]})
                    }

                } 
            } else if (interaction.options.getSubcommand() === "welcome") {
                const embed = new EmbedBuilder()
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__({phrase: 'welcome.menu-description', locale: language}))

                const menuWelcome = new StringSelectMenuBuilder()
                    .setCustomId('activeWelcome')
                    .setPlaceholder(client.languages.__({phrase: 'welcome.menu-options', locale: language}))
                    .addOptions(
                        {
                            label: "On",
                            description: client.languages.__({phrase: 'welcome.menu-on', locale: language}),
                            value: "on"
                        },
                        {
                            label: "Off",
                            description: client.languages.__({phrase: 'welcome.menu-off', locale: language}),
                            value: "off"
                        }, );
            
                
                const row = new ActionRowBuilder().addComponents(menuWelcome);

                interaction.reply({
                    embeds: [embed],
                    components: [row],
                })
            } else if (interaction.options.getSubcommand() === "level") {

                const embed = new EmbedBuilder()
                    .setTitle(`${star}` + client.languages.__({phrase: 'level.menu-title', locale: language}) + `${star}`)
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__({phrase: 'level.menu-description', locale: language}))

                const menuLevels = new StringSelectMenuBuilder()
                    .setCustomId('activeLevels')
                    .setPlaceholder(client.languages.__({phrase: 'level.menu-option', locale: language}))
                    .addOptions(
                        {
                            label: "On",
                            description: client.languages.__({phrase: 'level.menu-on', locale: language}),
                            value: "onLevels"
                        },
                        {
                            label: "Off",
                            description: client.languages.__({phrase: 'level.menu-off', locale: language}),
                            value: "offLevels"
                        }, );
            
                
                const row = new ActionRowBuilder().addComponents(menuLevels);

                interaction.reply({
                    embeds: [embed],
                    components: [row],
                })
            } else if (interaction.options.getSubcommand() === "twitch") {
                const Welcome = require('../../models/welcome')
                const welcome = await Welcome.findOne({ GuildId: interaction.guild.id})
                if (!welcome) return await Welcome.create({
                    GuildId: interaction.guild.id
                });

                const embed = new EmbedBuilder()
                    .setTitle(`${twitch}` + client.languages.__({phrase: 'twitch.menu-title', locale: language}) + `${twitch}`)
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__({phrase: 'twitch.menu-description', locale: language}))

                const menuLevels = new StringSelectMenuBuilder()
                    .setCustomId('activeTwitch')
                    .setPlaceholder(client.languages.__({phrase: 'twitch.menu-option', locale: language}))
                    .addOptions(
                        {
                            label: "On",
                            description: client.languages.__({phrase: 'twitch.menu-on', locale: language}),
                            value: "onTwitch"
                        },
                        {
                            label: "Off",
                            description: client.languages.__({phrase: 'twitch.menu-off', locale: language}),
                            value: "offTwitch"
                        }, );
            
                
                const row = new ActionRowBuilder().addComponents(menuLevels);

                interaction.reply({
                    embeds: [embed],
                    components: [row],
                })
            }

        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }

        
    }
}