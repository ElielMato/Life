const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const Emoji = require('../../json/emoji.json');
const db = require('megadb')
const minar = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "minerales" })
const picos = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "picos"})
const bag = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "mochila"})

const builder = new SlashCommandBuilder()
    .setName('bag')	
    .setDescription('Mochila para almacenar tus items')

module.exports = {
    builder: builder.toJSON(),
    name: 'bag',
    async run(client, interaction, language) {

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

        const pm = await picos.obtener(`${user.id}.madera.tiene`)
        const pp = await picos.obtener(`${user.id}.piedra.tiene`)
        const ph = await picos.obtener(`${user.id}.hierro.tiene`)
        const po = await picos.obtener(`${user.id}.oro.tiene`)
        const pd = await picos.obtener(`${user.id}.diamante.tiene`)
        const pn = await picos.obtener(`${user.id}.netherite.tiene`)

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

        const embed = new EmbedBuilder()
            .setColor(Config.color.CELE)
            .setTitle(client.languages.__mf({phrase: 'bag.bag-title', locale: language}, {user: user.username}))
            .setDescription(client.languages.__mf({phrase: 'bag.bag-title', locale: language}, {items: items}, {capacidad: capacidad}, {mpiedra: mpiedra}, {piedra: piedra}, {mcarbon: mcarbon}, {carbon: carbon}, {mhierro: mhierro}, {hierro: hierro}, {moro: moro}, {oro: oro}, {mredstone: mredstone}, {redstone: redstone}, {mlapis: mlapis}, {lapis: lapis}, {mobsidian: mobsidian}, {obsidiana: obsidian}, {mdiamante: mdiamante}, {diamante: diamante}, {mesmeralda: mesmeralda}, {esmeralda: esmeralda}, {esmeralda: esmeralda}))

        if (pm == true) {
            embed.addFields({name: `${pwood}`, value: client.languages.__({phrase: 'bag.bag-dura', locale: language}) + ` 500`, inline: true})
        }
        if (pp == true) {
            embed.addFields({name: `${pstone}`, value: client.languages.__({phrase: 'bag.bag-dura', locale: language}) + ` 1000`, inline: true})
        }
        if (ph == true) {
            embed.addFields({name: `${piron}`, value: client.languages.__({phrase: 'bag.bag-dura', locale: language}) + ` 1700`, inline: true})
        }
        if (po == true) {
            embed.addFields({name: `${pgold}`, value: client.languages.__({phrase: 'bag.bag-dura', locale: language}) + ` 2300`, inline: true})
        }
        if (pd == true) {
            embed.addFields({name: `${pdiamond}`, value: client.languages.__({phrase: 'bag.bag-dura', locale: language}) + ` 2700`, inline: true})
        }
        if (pn == true) {
            embed.addFields({name: `${pnetherite}`, value: client.languages.__({phrase: 'bag.bag-dura', locale: language}) + ` 3200`, inline: true})
        }
        interaction.reply({embeds: [embed]})
        
    }
}