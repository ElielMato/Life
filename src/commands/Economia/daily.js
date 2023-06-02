const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')
Duration(86400000);

const builder = new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Reclama tu recompensa diaria')
    .setDescriptionLocalizations({
        "es-ES": "Reclama tu recompensa diaria",
        "en-US": "Claim your daily reward"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'daily',
    async run(client, interaction, language) {

        try {

            const user = interaction.user

            const economiaUser = await UserEconomy.findOne({
                GuildId: interaction.guild.id,
                MemberId: interaction.user.id
            })

            const economiaServer = await ServerEconomy.findOne({
                GuildId: interaction.guild.id
            })

            const Server = "";
            const User = "";

            if (!economiaServer){
                Server = await ServerEconomy.create({ GuildId: interaction.guild.id })
            }

            if (!economiaUser) {
                User = await UserEconomy.create({ GuildId: interaction.guild.id, MemberId: interaction.user.id })
            }

            await Server.save
            await User.save

            if (economiaUser && economiaServer) {
                let random = Math.floor(Math.random() * (200 - 100) + 100)

                const daily = economiaUser.Cash + random
                const emoji = economiaServer.Emoji
                await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: daily})

                const embed = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__mf({phrase: 'daily.daily-recom', locale: language}, {random: random, emoji: emoji}))

                interaction.reply({
                    embeds: [embed]
                })
            } 
           

            used.set(user, Date.now() + 86400000);
            setTimeout(() => used.delete(user), 86400000);
        
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
        
        
    }
}