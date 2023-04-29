const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('../../../config.json');
const executeCommand = require('../../functions/executeCommand.js')
const { InteractionType } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.type === InteractionType.ApplicationCommand) executeCommand(client, interaction)

        const Langs = require('../../models/guilds')
        const Lang = await Langs.findOne({
            guildId: interaction.guildId
        })
        if (!Lang) return await Langs.create({
            guildId: interaction.guildId,
            lang: "es"
        })
    }
}