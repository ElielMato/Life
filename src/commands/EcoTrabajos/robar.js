const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');
const used = new Map();
const Duration = require('humanize-duration')
Duration(5000);

const builder = new SlashCommandBuilder()
    .setName('rob')	
    .setDescription('Robale dinero a otro usuario')
    .setDescriptionLocalizations({
        "es-ES": "Robale dinero a otro usuario",
        "en-US": "Steal money from another user"
    })
    .addUserOption(option => option
        .setName('usuario')
        .setNameLocalizations({
            "es-ES": "usuario",
            "en-US": "user"
        })
        .setDescription('Elige un usuario')
        .setDescriptionLocalizations({
            "es-ES": "Elige un usuario",
            "en-US": "Choose a user"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'rob',
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
                .setDescription(client.languages.__mf({phrase: 'robar.robar-cooldown', locale: language}, {remaining: remaining}))
                .setColor(Config.color.CELE)
            return interaction.reply({
                embeds: [embedtime],
                ephemeral: true
            })
        }

        const victima = interaction.options.getUser("usuario")

        const economiaUser = await UserEconomy.findOne({
            GuildId: interaction.guild.id,
            MemberId: interaction.user.id
        })

        const economiaSujeto = await UserEconomy.findOne({
            GuildId: interaction.guild.id,
            MemberId: victima.id
        })

        const economiaServer = await ServerEconomy.findOne({
            GuildId: interaction.guild.id
        })

        let Server = "";
        let User = "";
        let Sujeto = "";

        if (!economiaServer){
            Server = await ServerEconomy.create({ GuildId: interaction.guild.id })
        }

        if (!economiaUser) {
            User = await UserEconomy.create({ GuildId: interaction.guild.id, MemberId: interaction.user.id })
        }

        if (!economiaSujeto){
            Sujeto = await UserEconomy.create({ GuildId: interaction.guild.id, MemberId: victima.id })
        }

        await Server.save
        await User.save
        await Sujeto.save

        if (economiaUser && economiaServer && economiaSujeto) {

            if (victima.id === user.id) return interaction.reply({
                content: client.languages.__({phrase: 'robar.robar-you', locale: language}),
                ephemeral: true
            })

            let sujetobal = economiaSujeto.Cash
            let probabilidad = Math.floor(Math.random() * 100)
            let moneyRob = Math.floor(Math.random(500 - 300) * 1000)
            const emoji = economiaServer.Emoji

            const robMas = economiaUser.Cash + moneyRob
            const robMenos = economiaSujeto.Cash - moneyRob
            const MenosMe = economiaUser.Cash - moneyRob

            if (sujetobal < 1000) return interaction.reply({
            content: client.languages.__mf({phrase: 'robar.robar-1000', locale: language}, {emoji: emoji}),
            ephemeral: true
            })
            
            if (probabilidad > 60) {
                const embed = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__mf({phrase: 'robar.robar-yes', locale: language}, {user: victima.username, moneyRob: moneyRob, emoji: emoji}))
                await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: robMas})
                await UserEconomy.updateOne({MemberId: victima.id}, {Cash: robMenos})
                interaction.reply({
                    embeds: [embed]
                })
            } else {
                const embed = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__mf({phrase: 'robar.robar-no', locale: language}, {user: victima.username, moneyRob: moneyRob, emoji: emoji}))
                await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: MenosMe})
                interaction.reply({embeds: [embed]})
            }

            used.set(user, Date.now() + 1000 * 60 * 10);
            setTimeout(() => used.delete(user), 1000 * 60 * 10);
        }         
    }
}