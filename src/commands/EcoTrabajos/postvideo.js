const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')

const builder = new SlashCommandBuilder()
    .setName('postvideo')	
    .setDescription('Publicas un video en internet')
    .setDescriptionLocalizations({
        "es-ES": "Publicas un video en internet",
        "en-US": "You post video on the internet"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'postvideo',
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
                .setDescription(client.languages.__mf({phrase: 'postvideo.video-cooldown', locale: language}, {remaining: remaining}))
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

        if (!economiaServer){
            ServerEconomy.create({
                GuildId: interaction.guild.id
            })

            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__({phrase: "general.economy-create", locale: language}))
            interaction.reply({embeds: [embed]})
        }
        if (!economiaUser) {

            UserEconomy.create({
                GuildId: interaction.guild.id,
                MemberId: interaction.user.id
            })

            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(client.languages.__({phrase: "general.economy-create", locale: language}))
            interaction.reply({embeds: [embed]})
        }

        if (economiaUser && economiaServer) {
        const max = economiaServer.Max.Postmeme
        const min = economiaServer.Min.Postmeme
        let profits = Math.floor(Math.random() * (max - min))
        let probabilidad = Math.floor(Math.random() * 100)
        let mensajes = ['Instragram', 'Facebook', 'Youtube', 'TikTok', 'Twitch']
        let msg = mensajes[Math.floor(Math.random() * mensajes.length)]
        let likes = Math.floor(Math.random() * (1000 - 800) + 200)
        const won = economiaUser.Cash + profits
        const emoji = economiaServer.Emoji

        if (probabilidad > 40) {
            const embed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'postvideo.video-yes', locale: language}, {msg: msg, likes: likes,profits: profits, emoji: emoji}))
                .setColor(Config.color.CELE)
            interaction.reply({embeds: [embed]})
            await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: won})
        } else if (probabilidad > 30) {
            const noembed = new EmbedBuilder()
                .setDescription(client.languages.__mf({phrase: 'postvideo.video-no', locale: language}, {msg: msg}))
                .setColor(Config.color.CELE)
            interaction.reply({embed: [noembed]})
        }
        

        const tiempo = economiaServer.Cooldown.Postvideo
        used.set(user, Date.now() + tiempo);
        setTimeout(() => used.delete(user), tiempo);
        } 
    }
}