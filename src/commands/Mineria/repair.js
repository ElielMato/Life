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
    .setName('repair')	
    .setDescription('Repara tu pico')
    .addStringOption(option => option
        .setName('pico')
        .setDescription('Elige el pico a reparar')
        .setRequired(true)
        .addChoices(
            {name: "Madera", value: "pm"},
            {name: "Piedra", value: "pp"},
            {name: "Hierro", value: "ph"},
            {name: "Oro", value: "po"},
            {name: "Diamante", value: "pd"},
            {name: "Netherite", value: "pn"}))

module.exports = {
    builder: builder.toJSON(),
    name: 'repair',
    async run(client, interaction, language) {
        


        if (!economia.has(user.id)) {
            economia.set(user.id, {
                "cash": 0,
                "bank": 5000
            })
        }

        const pico = interaction.options._hoistedOptions[0].value

        const duram = await picos.obtener(`${user.id}.madera.durabilidad`)
        const durap = await picos.obtener(`${user.id}.piedra.durabilidad`)
        const durah = await picos.obtener(`${user.id}.hierro.durabilidad`)
        const durao = await picos.obtener(`${user.id}.oro.durabilidad`)
        const durad = await picos.obtener(`${user.id}.diamante.durabilidad`)
        const duran = await picos.obtener(`${user.id}.netherite.durabilidad`)

        const diamond = await emoji.obtener(`${interaction.guild.id}`)

        const dinero = await economia.obtener(`${user.id}.cash`)

        if (pico == `pm`) {

            if (duram < 500) {
                if (999 > dinero) return interaction.reply({contente: client.languages.__mf({phrase: 'repair.vmadera', locale: language}, {diamond: diamond}), ephemeral: true})
                picos.establecer(`${user.id}.madera.durabilidad`, 500)
                economia.restar(`${user.id}.cash`, 1000)
                interaction.reply({content: client.languages.__mf({phrase: 'repair.rmadera', locale: language}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__mf({phrase: 'repair.dmadera', locale: language}, {duram: duram}), ephemeral: true})

        } else if (pico == `pp`) {

            if (durap < 1000) {
                if (1499 > dinero) return interaction.reply({contente: client.languages.__mf({phrase: 'repair.vpiedra', locale: language}, {diamond: diamond}), ephemeral: true})
                picos.establecer(`${user.id}.piedra.durabilidad`, 1000)
                economia.restar(`${user.id}.cash`, 1500)
                interaction.reply({content: client.languages.__mf({phrase: 'repair.rpiedra', locale: language}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__mf({phrase: 'repair.dpiedra', locale: language}, {durap: durap}), ephemeral: true})

        } else if (pico == `ph`) {

            if (durah < 1700) {
                if (1999 > dinero) return interaction.reply({contente: client.languages.__mf({phrase: 'repair.vhierro', locale: language}, {diamond: diamond}), ephemeral: true})
                picos.establecer(`${user.id}.hierro.durabilidad`, 1700)
                economia.restar(`${user.id}.cash`, 2000)
                interaction.reply({content: client.languages.__mf({phrase: 'repair.rhierro', locale: language}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__mf({phrase: 'repair.dhierro', locale: language}, {durah: durah}), ephemeral: true})

        } else if (pico == `po`) {

            if (durao < 2300) {
                if (2499 > dinero) return interaction.reply({contente: client.languages.__mf({phrase: 'repair.voro', locale: language}, {diamond: diamond}), ephemeral: true})
                picos.establecer(`${user.id}.oro.durabilidad`, 2300)
                economia.restar(`${user.id}.cash`, 2500)
                interaction.reply({content: client.languages.__mf({phrase: 'repair.roro', locale: language}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__mf({phrase: 'repair.doro', locale: language}, {durao: durao}), ephemeral: true})

        } else if (pico == `pd`) {

            if (durad < 2700) {
                if (2999 > dinero) return interaction.reply({contente: client.languages.__mf({phrase: 'repair.vdimante', locale: language}, {diamond: diamond}), ephemeral: true})
                picos.establecer(`${user.id}.diamante.durabilidad`, 2700)
                economia.restar(`${user.id}.cash`, 3000)
                interaction.reply({content: client.languages.__mf({phrase: 'repair.rdiamante', locale: language}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__mf({phrase: 'repair.ddimante', locale: language}, {durad: durad})})

        } else if (pico == `pn`) {

            if (duran < 3200) {
                if (3999 > dinero) return interaction.reply({contente: client.languages.__mf({phrase: 'repair.vnetherite', locale: language}, {diamond: diamond}), ephemeral: true})
                picos.establecer(`${user.id}.netherite.durabilidad`, 3200)
                economia.restar(`${user.id}.cash`, 4000)
                interaction.reply({content: client.languages.__mf({phrase: 'repair.rnetherite', locale: language}, {diamond: diamond}), ephemeral: true})
            } else interaction.reply({content: client.languages.__mf({phrase: 'repair.dnetherite', locale: language}, {duran: duran}), ephemeral: true})
        } else interaction.reply({content: client.languages.__({phrase: 'repair.no-pico', locale: language}), ephemeral: true})
    }
}