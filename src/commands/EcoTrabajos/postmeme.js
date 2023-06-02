const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')

const builder = new SlashCommandBuilder()
    .setName('postmeme')	
    .setDescription('Publicas memes en internet')
    .setDescriptionLocalizations({
        "es-ES": "Publicas memes en internet",
        "en-US": "You post memes on the internet"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'postmeme',
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
                .setDescription(client.languages.__mf({phrase: 'postmeme.meme-cooldown', locale: language}, {remaining: remaining}))
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
            const max = economiaServer.Max.Postmeme
            const min = economiaServer.Min.Postmeme
            let profits = Math.floor(Math.random() * (max - min))
            let probabilidad = Math.floor(Math.random() * 100)
            let mensajes = ['Instragram', 'Facebook', 'Discord', 'Twitter']
            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]
            let likes = Math.floor(Math.random() * (1000 - 800) + 200)
            const won = economiaUser.Cash + profits
            const emoji = economiaServer.Emoji

            if (probabilidad > 40) {
                const embed = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'postmeme.meme-yes', locale: language}, {msg: msg, likes: likes, profits: profits, emoji: emoji}))
                    .setColor(Config.color.CELE)
                interaction.reply({embeds: [embed]})
                await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: won})
            } else {
                const noembed = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'postmeme.meme-no', locale: language}, {msg: msg}))
                    .setColor(Config.color.CELE)
                interaction.reply({embeds: [noembed]})
            }

            const tiempo = economiaServer.Cooldown.Postmeme
            used.set(user, Date.now() + tiempo);
            setTimeout(() => used.delete(user), tiempo);
        } 
    }
}