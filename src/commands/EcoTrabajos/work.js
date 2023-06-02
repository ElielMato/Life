const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')
Duration(300000);
//Instalamos las npm megadb y humanize-duration

//Contrccion del comando
const builder = new SlashCommandBuilder()
    .setName('work')	
    .setDescription('Trabaja para conseguir dinero')
    .setDescriptionLocalizations({
        "es-ES": "Trabaja para conseguir dinero",
        "en-US": "Work to get money"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'work',
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
                .setDescription(client.languages.__mf({phrase: 'work.work-cooldown', locale: language}, {remaining: remaining}))
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

            let mensajes = [
                client.languages.__({phrase: 'work.work-men1', locale: language}),
                client.languages.__({phrase: 'work.work-men2', locale: language}),
                client.languages.__({phrase: 'work.work-men3', locale: language}),
                client.languages.__({phrase: 'work.work-men4', locale: language}),
                client.languages.__({phrase: 'work.work-men5', locale: language}),
                client.languages.__({phrase: 'work.work-men6', locale: language}),
                client.languages.__({phrase: 'work.work-men7', locale: language}),
                client.languages.__({phrase: 'work.work-men8', locale: language}),
                client.languages.__({phrase: 'work.work-men9', locale: language}),
                client.languages.__({phrase: 'work.work-men10', locale: language}),
            ]

            const min = economiaServer.Min.Work
            const max = economiaServer.Max.Work
            let random = Math.floor(Math.random() * (max - min))
            let msg = mensajes[Math.floor(Math.random() * mensajes.length)]
            const won = economiaUser.Cash + random
            const emoji = economiaServer.Emoji

            await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: won})

            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setDescription(`${msg} **${random}** ${emoji}`)

            interaction.reply({
                embeds: [embed]
            })

        const tiempo = economiaServer.Cooldown.Work
        used.set(user, Date.now() + tiempo);
        setTimeout(() => used.delete(user), tiempo);
        }      
    }
}