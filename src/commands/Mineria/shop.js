const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const Emoji = require('../../json/emoji.json');
const db = require('megadb')
const minar = new db.crearDB({carpeta: `Database`,sub: `Mineria`,nombre: `minerales` })
const bag = new db.crearDB({carpeta: `Database`,sub: `Mineria`,nombre: `mochila`})
const picos = new db.crearDB({carpeta: `Database`,sub: `Mineria`,nombre: `picos`})

const builder = new SlashCommandBuilder()
    .setName('shop')	
    .setDescription('Visita la tienda')
    .addSubcommand(subcommand =>
        subcommand
        .setName('mineria')
        .setDescription('Tienda de Mineria'))

module.exports = {
    builder: builder.toJSON(),
    name: 'shop',
    async run(client, interaction, language) {

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

        if (interaction.options.getSubcommand() === "mineria") {
            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__mf({phrase: 'setlang.newLang', locale: language}, {pstone: pstone}, {mpiedra: mpiedra}, {piron: piron}, {mhierro: mhierro}, {pgold: pgold}, {moro: moro}, {pdiamond: pdiamond}, {mdiamante: mdiamante}, {pnetherite: pnetherite}, {mesmeralda: mesmeralda}))

            interaction.reply({embeds: [embed]})
        }
    }
}