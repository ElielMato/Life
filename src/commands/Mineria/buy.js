const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const db = require('megadb')
const minar = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "minerales" })
const bag = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "mochila"})
const picos = new db.crearDB({carpeta: "Database",sub: "Mineria",nombre: "picos"})
const economia = new db.crearDB({carpeta: `Database`,sub: `economia`,nombre: `economia` })

const builder = new SlashCommandBuilder()
    .setName('buy')	
    .setDescription('Compra Items')
    .addSubcommand(subcommand =>
        subcommand
        .setName('mineria')
        .setDescription('Compra items de Mineria')
        .addStringOption(option => option.setName('item').setDescription('Items que vas a comprar').setRequired(true)))

module.exports = {
    builder: builder.toJSON(),
    name: 'buy',
    async run(client, interaction, language) {

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

        if (!minar.has(user.id)) {
            minar.set(user.id, {
                "bag": {
                    "piedra": 0,
                    "carbon": 0,
                    "hierro": 0,
                    "oro": 0,
                    "diamante": 0,
                    "cuarzo": 0,
                    "ruby": 0,
                    "esmeralda": 0
                }
            })
        }

        if (!economia.has(user.id)) {
            economia.set(user.id, {
                "cash": 0,
                "bank": 5000
            })
        }

        const item = interaction.options.getString("item")

        const piedra = await minar.obtener(`${user.id}.bag.piedra`)
        const hierro = await minar.obtener(`${user.id}.bag.hierro`)
        const oro = await minar.obtener(`${user.id}.bag.oro`)
        const diamante = await minar.obtener(`${user.id}.bag.diamante`)
        const esmeralda = await minar.obtener(`${user.id}.bag.esmeralda`)

        const picop = await picos.obtener(`${user.id}.piedra.tiene`)
        const picoh = await picos.obtener(`${user.id}.hierro.tiene`)
        const picoo = await picos.obtener(`${user.id}.oro.tiene`)
        const picod = await picos.obtener(`${user.id}.diamante.tiene`)
        const picon = await picos.obtener(`${user.id}.netherite.tiene`)

        const dinero = await economia.obtener(`${user.id}.cash`)
        
        if (item == 1) {
            if (piedra < 599 & dinero < 6499 ) return interaction.reply({content: client.languages.__({phrase: 'buy.buy-invalid', locale: language}), ephemeral: true})
            if (picop == true) return interaction.reply({content: client.languages.__({phrase: 'buy.true-pieadra', locale: language}), ephemeral: true})
            picos.establecer(`${user.id}.piedra.tiene`, true)
            minar.restar(`${user.id}.bag.piedra`, 600)
            economia.restar(`${user.id}.cash`, 6500)
            interaction.reply(client.languages.__({phrase: 'buy.finish-piedra', locale: language}))
        } else if (item == '2') {
            if (hierro < 799 & dinero < 6499) return interaction.reply({content: client.languages.__({phrase: 'buy.buy-invalid', locale: language}), ephemeral: true})
            if (picoh == true) return interaction.reply({content: client.languages.__({phrase: 'buy.true-hierro', locale: language}), ephemeral: true})
            picos.establecer(`${user.id}.hierro.tiene`, true)
            minar.restar(`${user.id}.bag.hierro`, 800)
            economia.restar(`${user.id}.cash`, 8000)
            interaction.reply(client.languages.__({phrase: 'buy.finish-hierra', locale: language}))
        } else if (item == '3') {
            if (oro < 699 & dinero < 7499) return interaction.reply({content: client.languages.__({phrase: 'buy.buy-invalid', locale: language}), ephemeral: true})
            if (picoo == true) return interaction.reply({content: client.languages.__({phrase: 'buy.true-oro', locale: language}), ephemeral: true})
            picos.establecer(`${user.id}.oro.tiene`, true)
            minar.restar(`${user.id}.bag.oro`, 700)
            economia.restar(`${user.id}.cash`, 7500)
            interaction.reply(client.languages.__({phrase: 'buy.finish-oro', locale: language}))
        } else if (item == '4') {
            if (diamante < 899 & dinero < 9999) return interaction.reply({content: client.languages.__({phrase: 'buy.buy-invalid', locale: language}), ephemeral: true})
            if (picod == true) return interaction.reply({content: client.languages.__({phrase: 'buy.true-diamante', locale: language}), ephemeral: true})
            picos.establecer(`${user.id}.diamante.tiene`, true)
            minar.restar(`${user.id}.bag.diamante`, 900)
            economia.restar(`${user.id}.cash`, 10000)
            interaction.reply(client.languages.__({phrase: 'buy.finish-diamante', locale: language}))
        } else if (item == '5') {
            if (esmeralda < 899 & dinero < 14999) return interaction.reply({content: client.languages.__({phrase: 'buy.buy-invalid', locale: language}), ephemeral: true})
            if (picon == true) return interaction.reply({content: client.languages.__({phrase: 'buy.true-netherite', locale: language}), ephemeral: true})
            picos.establecer(`${user.id}.esmeralda.tiene`, true)
            minar.restar(`${user.id}.bag.esmeralda`, 900)
            economia.restar(`${user.id}.cash`, 15000)
            interaction.reply(client.languages.__({phrase: 'buy.finish-netherite', locale: language}))
        } else {
            interaction.reply(client.languages.__({phrase: 'buy.buy-no', locale: language}))
        }
    }
}