const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')

const builder = new SlashCommandBuilder()
    .setName('crime')	
    .setDescription('Realizar un crime')
    .setDescriptionLocalizations({
        "es-ES": "Realizar un crime",
        "en-US": "Commit a crime"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'crime',
    async run(client, interaction, language) {

        const user = interaction.user
        
        const cooldown = used.get(user)
        if (cooldown) {
            const remaining = Duration(cooldown - Date.now(), {
                units: ["h", "m", "s"],
                language: "es",
                conjuction: " y ",
                serialComma: false,
                round: true
            });
            const embedtime = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'crime.crime-cooldown', locale: language}, {remaining: remaining}))
                .setColor(Config.color.CELE)
            return interaction.reply({
                embeds: [embedtime],
                ephemeral: true
            })
        }

        const economiaUser = await UserEconomy.findOne({
            GuildId: interaction.guild.id,
            MemberId: interaction.user.id
        })

        const economiaServer = await ServerEconomy.findOne({
            GuildId: interaction.guild.id
        })

        let Server = "";
        let User = "";

        if (!economiaServer){
            Server = await ServerEconomy.create({ GuildId: interaction.guild.id })
        }

        if (!economiaUser) {
            User = await UserEconomy.create({ GuildId: interaction.guild.id, MemberId: interaction.user.id })
        }

        await Server.save
        await User.save

        if (economiaUser && economiaServer) {
        const min = economiaServer.Min.Crime
        const max = economiaServer.Max.Crime
        let random = Math.floor(Math.random() * (max - min))
        let probabilidad = Math.floor(Math.random() * 100)
        const won = economiaUser.Cash + random
        const lose = economiaUser.Cash - random
        const emoji = economiaServer.Emoji

        if (probabilidad > 50) {
            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__mf({phrase: 'crime.crime-yes', locale: language}, {random: random, emoji: emoji}))
            await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: won})
            interaction.reply({
                embeds: [embed]
            })
        } else {
            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__mf({phrase: 'crime.crime-no', locale: language}, {random: random, emoji: emoji}))
            await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: lose})
            interaction.reply({
                embeds: [embed]
            })
        }

        const tiempo = economiaServer.Cooldown.Crime
        used.set(user, Date.now() + tiempo);
        setTimeout(() => used.delete(user), tiempo);
        } 

        
        
    }
}