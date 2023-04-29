const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const db = require('megadb')
const minar = new db.crearDB({carpeta: `Database`,sub: `Mineria`,nombre: `minerales` })
const bag = new db.crearDB({carpeta: `Database`,sub: `Mineria`,nombre: `mochila`})
const picos = new db.crearDB({carpeta: `Database`,sub: `Mineria`,nombre: `picos`})
const economia = new db.crearDB({carpeta: "Database",sub: "Economia",nombre: "economia" })
const emoji = new db.crearDB({carpeta: "Database",sub: "Economia",nombre: "emoji" })

const builder = new SlashCommandBuilder()
    .setName('sell')	
    .setDescription('Vende tus minerales')
    .addStringOption(option =>
        option.setName('minerales')
        .setDescription('Minerales para vender')
        .setRequired(true)
        .addChoices(
            {name: "Piedra", value: "mp"},
            {name: "Carbon", value: "mc"},
            {name: "Hierro", value: "mh"},
            {name: "Oro", value: "mo"},
            {name: "Redstone", value: "mr"},
            {name: "Lapis", value: "ml"},
            {name: "Obsidiana", value: "mob"},
            {name: "Diamante", value: "md"},
            {name: "Esmeralda", value: "me"}))
    .addStringOption(option =>
        option.setName('cantidad')
        .setDescription('Cantidad de minerales')
        .setRequired(true));

module.exports = {
    builder: builder.toJSON(),
    name: 'sell',
    async run(client, interaction, language) {

        if (!economia.has(user.id)) {
            economia.set(user.id, {
                "cash": 0,
                "bank": 5000
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

        const piedra = await minar.obtener(`${user.id}.bag.piedra`)
        const carbon = await minar.obtener(`${user.id}.bag.carbon`)
        const hierro = await minar.obtener(`${user.id}.bag.hierro`)
        const oro = await minar.obtener(`${user.id}.bag.oro`)
        const redstone = await minar.obtener(`${user.id}.bag.redstone`)
        const lapis = await minar.obtener(`${user.id}.bag.lapis`)
        const diamante = await minar.obtener(`${user.id}.bag.diamante`)
        const esmeralda = await minar.obtener(`${user.id}.bag.esmeralda`)
        const obsidiana = await minar.obtener(`${user.id}.bag.obsidiana`)

        const diamond = await emoji.obtener(`${interaction.guild.id}`)

        const minerales = interaction.options._hoistedOptions[0].value
        const cantidad = interaction.options.getString("cantidad")

        const pcan = cantidad * 1
        const ccan = cantidad * 2
        const hcan = cantidad * 5
        const ocan = cantidad * 8
        const rcan = cantidad * 10
        const lcan = cantidad * 10
        const obcan = cantidad * 20
        const dcan = cantidad * 25
        const ecan = cantidad * 30

        if (minerales == "mp") {
            if (piedra > 1) {
                minar.restar(`${user.id}.bag.piedra`, cantidad)
                economia.sumar(`${user.id}.cash`, pcan)
                interaction.reply({content: client.languages.__mf({phrase: 'sell.gpiedra', locale: language}, {cantidad: cantidad}, {pcan: pcan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "mc") {
            if (carbon > 1) {
                minar.restar(`${user.id}.bag.carbon`, cantidad)
                economia.sumar(`${user.id}.cash`, ccan)
                interaction.reply({content: client.languages.__mf({phrase: 'sell.gcarbon', locale: language}, {cantidad: cantidad}, {ccan: ccan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "mh") {
            if (hierro > 1) {
                minar.restar(`${user.id}.bag.hierro`, cantidad)
                economia.sumar(`${user.id}.cash`, hcan)
                interaction.reply({content:client.languages.__mf({phrase: 'sell.ghierro', locale: language}, {cantidad: cantidad}, {hcan: hcan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "mo") {
            if (oro > 1) {
                minar.restar(`${user.id}.bag.oro`, cantidad)
                economia.sumar(`${user.id}.cash`, ocan)
                interaction.reply({content: client.languages.__mf({phrase: 'sell.goro', locale: language}, {cantidad: cantidad}, {ocan: ocan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "mr") {
            if (redstone > 1) {
                minar.restar(`${user.id}.bag.redstone`, cantidad)
                economia.sumar(`${user.id}.cash`, rcan)
                interaction.reply({content:client.languages.__mf({phrase: 'sell.gredstone', locale: language}, {cantidad: cantidad}, {rcan: rcan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "ml") {
            if (lapis > 1) {
                minar.restar(`${user.id}.bag.lapis`, cantidad)
                economia.sumar(`${user.id}.cash`, lcan)
                interaction.reply({content:client.languages.__mf({phrase: 'sell.glapis', locale: language}, {cantidad: cantidad}, {lcan: lcan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "mob") {
            if (obsidiana > 1) {
                minar.restar(`${user.id}.bag.obsidiana`, cantidad)
                economia.sumar(`${user.id}.cash`, obcan)
                interaction.reply({content: client.languages.__mf({phrase: 'sell.gobsidiana', locale: language}, {cantidad: cantidad}, {ocan: ocan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "md") {
            if (diamante > 1) {
                minar.restar(`${user.id}.bag.diamante`, cantidad)
                economia.sumar(`${user.id}.cash`, dcan)
                interaction.reply({content: client.languages.__mf({phrase: 'sell.gdiamante', locale: language}, {cantidad: cantidad}, {dcan: dcan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else if (minerales == "me") {
            if (esmeralda > 1) {
                minar.restar(`${user.id}.bag.esmeralda`, cantidad)
                economia.sumar(`${user.id}.cash`, ecan)
                interaction.reply({content: client.languages.__mf({phrase: 'sell.gesmeralda', locale: language}, {cantidad: cantidad}, {ecan: ecan}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__({phrase: 'sell.min', locale: language}), ephemeral: true})

        } else interaction.reply("No puedes vender ese mineral.")
        
    }
}