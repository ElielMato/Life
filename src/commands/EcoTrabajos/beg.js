const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('../../../config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')
Duration(10000);

const builder = new SlashCommandBuilder()
    .setName('beg')	
    .setDescription('Mendiga para conseguir dinero')
    .setDescriptionLocalizations({
        "es-ES": "Mendiga para conseguir dinero",
        "en-US": "Beg for money"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'beg',
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
                .setDescription(client.languages.__mf({phrase: 'beg.beg-cooldown', locale: language}, {remaining: remaining}))
                .setColor(Config.color.CELE)
            return interaction.reply({
                embeds: [embedtime]
            }).then(async (msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000)
            });
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
            let mensajes = [
                client.languages.__({phrase: 'beg.beg-men1', locale: language}),
                client.languages.__({phrase: 'beg.beg-men2', locale: language}),
                client.languages.__({phrase: 'beg.beg-men3', locale: language})
            ]

            const min = economiaServer.Min.Beg
            const max = economiaServer.Max.Beg

            let random = Math.floor(Math.random() * (max - min))
            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]
            const dinero = economiaUser.Cash + random
            const emoji = economiaServer.Emoji
            await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: dinero})

            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(`${msg} **${random}** ${emoji}`)

            interaction.reply({
                embeds: [embed]
            })

            const tiempo = economiaServer.Cooldown.Beg
            used.set(user, Date.now() + tiempo);
            setTimeout(() => used.delete(user), tiempo);
        } 
    }
}