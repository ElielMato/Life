const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const Emoji = require('../../json/emoji.json');
const db = require('megadb')
const minar = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "minerales" })
const bag = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "mochila"})
const picos = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "picos"})
const used = new Map();
const Duration = require('humanize-duration')
Duration(5000);

const builder = new SlashCommandBuilder()
    .setName('minar')	
    .setDescription('Mineria gratis y sencilla')
    .addSubcommand(subcommand =>
        subcommand
        .setName('madera')
        .setDescription('Minar con un pico de madera'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('piedra')
        .setDescription('Minar con un pico de piedra'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('hierro')
        .setDescription('Minar con un pico de hierro'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('oro')
        .setDescription('Minar con un pico de oro'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('diamante')
        .setDescription('Minar con un pico de diamante'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('netherite')
        .setDescription('Minar con un pico de netherite'))


module.exports = {
    builder: builder.toJSON(),
    name: 'minar',
    async run(client, interaction, language) {

        try {

            const cooldown = used.get(interaction.user.id)
            if (cooldown) {
                const remaining = Duration(cooldown - Date.now(), {
                    units: ["h", "m", "s"],
                    language: "es",
                    conjuction: " y ",
                    serialComma: false,
                    round: true
                });
                const embedtime = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'minar.minar-cooldown', locale: language}, {remaining: remaining}))
                .setColor(Config.color.CELE)
                return interaction.reply({
                    embeds: [embedtime]
                }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000)
                });
            }

            if (!bag.has(user.id)) {
                bag.set(user.id, {
                    "capacidad": 1000
                })
            }

            if (!minar.has(user.id)) {
                minar.set(user.id, {
                    "bag": {
                        "piedra": 0,
                        "carbon": 0,
                        "hierro": 0,
                        "oro": 0,
                        "redstone": 0,
                        "lapis": 0,
                        "diamante": 0,
                        "esmeralda": 0,
                        "obsidiana": 0,
                    }
                })
            }

            if (!picos.has(user.id)) {
                picos.set(user.id, {
                    "madera": {
                        "tiene": true,
                        "durabilidad": 500
                    },
                    "piedra": {
                        "tiene": false,
                        "durabilidad": 1000
                    },
                    "hierro": {
                        "tiene": false,
                        "durabilidad": 1700
                    },
                    "oro": {
                        "tiene": false,
                        "durabilidad": 2300
                    },
                    "diamante": {
                        "tiene": false,
                        "durabilidad": 2700
                    },
                    "netherite": {
                        "tiene": false,
                        "durabilidad": 3200
                    }
                })
            }

            const capacidad = await bag.obtener(`${user.id}.capacidad`)

            const mcarbon = client.emojis.cache.get(Emoji.coal)
            const mpiedra = client.emojis.cache.get(Emoji.stone)
            const mhierro = client.emojis.cache.get(Emoji.iron)
            const moro = client.emojis.cache.get(Emoji.gold)
            const mredstone = client.emojis.cache.get(Emoji.redstone)
            const mlapis = client.emojis.cache.get(Emoji.lapis)
            const mdiamante = client.emojis.cache.get(Emoji.diamante)
            const mesmeralda = client.emojis.cache.get(Emoji.emerald)
            const mobsidian = client.emojis.cache.get(Emoji.obsidian)

            const pnetherite = client.emojis.cache.get(Emoji.pnetherite);
            const pdiamond = client.emojis.cache.get(Emoji.pdiamond);
            const pgold = client.emojis.cache.get(Emoji.pgold);
            const piron = client.emojis.cache.get(Emoji.piron);
            const pstone = client.emojis.cache.get(Emoji.pstone);
            const pwood = client.emojis.cache.get(Emoji.pwood);

            const piedra = await minar.obtener(`${user.id}.bag.piedra`)
            const carbon = await minar.obtener(`${user.id}.bag.carbon`)
            const hierro = await minar.obtener(`${user.id}.bag.hierro`)
            const oro = await minar.obtener(`${user.id}.bag.oro`)
            const redstone = await minar.obtener(`${user.id}.bag.redstone`)
            const lapis = await minar.obtener(`${user.id}.bag.lapis`)
            const diamante = await minar.obtener(`${user.id}.bag.diamante`)
            const esmeralda = await minar.obtener(`${user.id}.bag.esmeralda`)
            const obsidiana = await minar.obtener(`${user.id}.bag.obsidiana`)

            const items = piedra + carbon + hierro + oro + diamante + redstone + lapis + esmeralda + obsidiana

            const picom = await picos.obtener(`${user.id}.madera.tiene`)
            const picop = await picos.obtener(`${user.id}.piedra.tiene`)
            const picoh = await picos.obtener(`${user.id}.hierro.tiene`)
            const picoo = await picos.obtener(`${user.id}.oro.tiene`)
            const picod = await picos.obtener(`${user.id}.diamante.tiene`)
            const picon = await picos.obtener(`${user.id}.netherite.tiene`)

            const duram = await picos.obtener(`${user.id}.madera.durabilidad`)
            const durap = await picos.obtener(`${user.id}.piedra.durabilidad`)
            const durah = await picos.obtener(`${user.id}.hierro.durabilidad`)
            const durao = await picos.obtener(`${user.id}.oro.durabilidad`)
            const durad = await picos.obtener(`${user.id}.diamante.durabilidad`)
            const duran = await picos.obtener(`${user.id}.netherite.durabilidad`)

            function random(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            if (interaction.options.getSubcommand() === "madera") {
                if (items < capacidad) {
                    if (picom == true) {
                        if (duram > 1){
                            let mensajes = [client.languages.__mf({phrase: 'minar.minar', locale: language}, {user: user})]

                            let probabilidades = Math.floor(Math.random() * 100)
                            let piedra = random(15, 40)
                            let carbon = random(5, 20)
                            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

                            minar.sumar(`${user.id}.bag.piedra`, piedra)
                            minar.sumar(`${user.id}.bag.carbon`, carbon)

                            const res = (piedra + carbon)
                            const resdura = duram - res

                            picos.restar(`${user.id}.madera.durabilidad`, res)

                            const embed = new EmbedBuilder()
                                .setColor(Config.color.CELE)
                                .setDescription(`${msg}\n**+${piedra}** ${mpiedra}\n**+${carbon}** ${mcarbon}` + client.languages.__({phrase: 'minar.mmadera', locale: language}) +`\n${pwood} ${resdura}`+ client.languages.__({phrase: 'minar.durabi', locale: language}))

                            interaction.reply({
                                embeds: [embed]
                            })
                            used.set(interaction.user.id, Date.now() + 2000);
                            setTimeout(() => used.delete(interaction.user.id), 2000);
                        } else interaction.reply({content: client.languages.__({phrase: 'minar.repair', locale: language}), ephemeral: true})
                    } else interaction.reply({content: client.languages.__({phrase: 'minar.no-pico', locale: language}), ephemeral: true})
                } else interaction.reply({content: client.languages.__({phrase: 'minar.espacio', locale: language}), ephemeral: true})

            } else if (interaction.options.getSubcommand() === "piedra") {
                if (items < capacidad) {
                    if (picop == true) {
                        if (durap > 1) {
                            let mensajes = [client.languages.__mf({phrase: 'minar.minar', locale: language}, {user: user})]

                            let probabilidades = Math.floor(Math.random() * 100)
                            let piedra = random(15, 40)
                            let carbon = random(5, 20)
                            let hierro = random(0, 5)
                            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

                            minar.sumar(`${user.id}.bag.piedra`, piedra)
                            minar.sumar(`${user.id}.bag.carbon`, carbon)
                            minar.sumar(`${user.id}.bag.hierro`, hierro)

                            const res = (piedra + carbon + hierro)
                            const resdura = durap - res
                            picos.restar(`${user.id}.piedra.durabilidad`, res)

                            const embed = new EmbedBuilder()
                                .setColor(Config.color.CELE)
                                .setDescription(`${msg}\n**+${piedra}** ${mpiedra}\n**+${carbon}** ${mcarbon}\n**+${hierro}** ${mhierro}` + client.languages.__({phrase: 'minar.mpiedra', locale: language}) + `\n${pstone} ${resdura}` + client.languages.__({phrase: 'minar.durabi', locale: language}))

                            interaction.reply({
                                embeds: [embed]
                            })
                            used.set(interaction.user.id, Date.now() + 2000);
                            setTimeout(() => used.delete(interaction.user.id), 2000);
                        } else interaction.reply({content: client.languages.__({phrase: 'minar.repair', locale: language}), ephemeral: true})
                    } else interaction.reply({content: client.languages.__({phrase: 'minar.no-pico', locale: language}), ephemeral: true})
                } else interaction.reply({content: client.languages.__({phrase: 'minar.espacio', locale: language}), ephemeral: true})

            } else if (interaction.options.getSubcommand() === "hierro") {

                if (items < capacidad) {
                    if (picoh == true) {
                        if (durap > 1) {
                            let mensajes = [client.languages.__mf({phrase: 'minar.minar', locale: language}, {user: user})]

                            let probabilidades = Math.floor(Math.random() * 100)
                            let carbon = random(15, 30)
                            let hierro = random(10, 20)
                            let oro = random(10, 20)
                            let diamante = random(0, 5)
                            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

                            minar.sumar(`${user.id}.bag.carbon`, carbon)
                            minar.sumar(`${user.id}.bag.hierro`, hierro)
                            minar.sumar(`${user.id}.bag.oro`, oro)
                            minar.sumar(`${user.id}.bag.diamante`, diamante)

                            const res = (carbon + hierro + oro + diamante)
                            const resdura = durah - res
                            picos.restar(`${user.id}.hierro.durabilidad`, res)

                            const embed = new EmbedBuilder()
                                .setColor(Config.color.CELE)
                                .setDescription(`${msg}\n**+${carbon}** ${mcarbon}\n**+${hierro}** ${mhierro}\n**+${oro}** ${moro}\n**+${diamante}** ${mdiamante}` + client.languages.__({phrase: 'minar.mhierro',locale: language}) + `\n${piron} ${resdura}` + client.languages.__({phrase: 'minar.durabi',locale: language}))

                            interaction.reply({
                                embeds: [embed]
                            })
                            used.set(interaction.user.id, Date.now() + 2000);
                            setTimeout(() => used.delete(interaction.user.id), 2000);
                        } else interaction.reply({content: client.languages.__({phrase: 'minar.repair', locale: language}), ephemeral: true})
                    } else interaction.reply({content:client.languages.__({phrase: 'minar.no-pico', locale: language}), ephemeral: true})
                } else interaction.reply({content: client.languages.__({phrase: 'minar.espacio', locale: language}), ephemeral: true})

            } else if (interaction.options.getSubcommand() === "oro") {

                if (items < capacidad) {
                    if (picoo == true) {
                        if (durap > 1) {
                            let mensajes = [client.languages.__mf({phrase: 'minar.minar', locale: language}, {user: user})]

                            let probabilidades = Math.floor(Math.random() * 100)
                            let carbon = random(15, 30)
                            let hierro = random(10, 20)
                            let oro = random(10, 20)
                            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

                            minar.sumar(`${user.id}.bag.carbon`, carbon)
                            minar.sumar(`${user.id}.bag.hierro`, hierro)
                            minar.sumar(`${user.id}.bag.oro`, oro)

                            const res = (carbon + hierro + oro)
                            const resdura = durao - res
                            picos.restar(`${user.id}.oro.durabilidad`, res)

                            const embed = new EmbedBuilder()
                                .setColor(Config.color.CELE)
                                .setDescription(`${msg}\n**+${carbon}** ${mcarbon}\n**+${hierro}** ${mhierro}\n**+${oro}** ${moro}` + client.languages.__({phrase: 'minar.moro',locale: language}) + `\n${pgold} ${resdura}` + client.languages.__({phrase: 'minar.durabi',locale: language}))

                            interaction.reply({
                                embeds: [embed]
                            })
                            used.set(interaction.user.id, Date.now() + 2000);
                            setTimeout(() => used.delete(interaction.user.id), 2000);
                        } else interaction.reply({content: client.languages.__({phrase: 'minar.repair', locale: language}), ephemeral: true})
                    } else interaction.reply({content:client.languages.__({phrase: 'minar.no-pico', locale: language}), ephemeral: true})
                } else interaction.reply({content: client.languages.__({phrase: 'minar.espacio', locale: language}), ephemeral: true})

            } else if (interaction.options.getSubcommand() === "diamante") { 

                if (items < capacidad) {
                    if (picod == true) {
                        if (durap > 1) {
                            let mensajes = [`Bien hecho ${user} has ido a minar y encontraste`]

                            let probabilidades = Math.floor(Math.random() * 100)
                            let oro = random(10, 20)
                            let diamante = random(5, 10)
                            let obsidiana = random(8, 15)
                            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

                            minar.sumar(`${user.id}.bag.oro`, oro)
                            minar.sumar(`${user.id}.bag.diamante`, diamante)
                            minar.sumar(`${user.id}.bag.obsidiana`, obsidiana)

                            const res = (oro + diamante + obsidiana)
                            const resdura = durad - res
                            picos.restar(`${user.id}.diamante.durabilidad`, res)

                            const embed = new EmbedBuilder()
                                .setColor(Config.color.CELE)
                                .setDescription(`${msg}\n**+${oro}** ${moro}\n**+${diamante}** ${mdiamante}\n**+${obsidiana}** ${mobsidiana}` + client.languages.__({phrase: 'minar.mdiamante',locale: language}) + `\n${pdiamond} ${resdura}` + client.languages.__({phrase: 'minar.durabi',locale: language}))
 
                            interaction.reply({
                                embeds: [embed]
                            })
                            used.set(interaction.user.id, Date.now() + 2000);
                            setTimeout(() => used.delete(interaction.user.id), 2000);
                        } else interaction.reply({content: client.languages.__({phrase: 'minar.repair', locale: language}), ephemeral: true})
                    } else interaction.reply({content:client.languages.__({phrase: 'minar.no-pico', locale: language}), ephemeral: true})
                } else interaction.reply({content: client.languages.__({phrase: 'minar.espacio', locale: language}), ephemeral: true})

            } else if (interaction.options.getSubcommand() === "netherite") {

                if (items < capacidad) {
                    if (picon == true) {
                        if (durap > 1) {
                            let mensajes = [client.languages.__mf({phrase: 'minar.minar', locale: language}, {user: user})]

                            let probabilidades = Math.floor(Math.random() * 100)
                            let oro = random(15, 25)
                            let diamante = random(10, 20)
                            let esmeralda = random(8, 12)
                            let obsidiana = random(15, 25)
                            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

                            minar.sumar(`${user.id}.bag.oro`, oro)
                            minar.sumar(`${user.id}.bag.diamante`, diamante)
                            minar.sumar(`${user.id}.bag.esmeralda`, esmeralda)
                            minar.sumar(`${user.id}.bag.obsidiana`, obsidiana)

                            const res = (oro + diamante + esmeralda + obsidiana)
                            const resdura = duran - res
                            picos.restar(`${user.id}.netherite.durabilidad`, res)

                            const embed = new EmbedBuilder()
                                .setColor(Config.color.CELE)
                                .setDescription(`${msg}\n**+${oro}** ${moro}\n**+${diamante}** ${mdiamante}\n**+${esmeralda}** ${mesmeralda}\n**+${obsidiana}** ${mobsidiana}` + client.languages.__({phrase: 'minar.mnetherite',locale: language}) + `\n${pnetherite} ${resdura}` + client.languages.__({phrase: 'minar.durabi',locale: language}))
    

                            interaction.reply({embeds: [embed]})
                            used.set(interaction.user.id, Date.now() + 2000);
                            setTimeout(() => used.delete(interaction.user.id), 2000);
                        } else interaction.reply({content: client.languages.__({phrase: 'minar.repair', locale: language}), ephemeral: true})
                    } else interaction.reply({content:client.languages.__({phrase: 'minar.no-pico', locale: language}), ephemeral: true})
                } else interaction.reply({content: client.languages.__({phrase: 'minar.espacio', locale: language}), ephemeral: true})
            }
        } catch (error) {
            console.log("Error en SlashCommand: " + error);
        }
        
    }
}