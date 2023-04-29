const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');

const builder = new SlashCommandBuilder()
    .setName('withdraw')	
    .setDescription('Retiras dinero del banco')
    .setDescriptionLocalizations({
        "es-ES": "Depositas dinero al banco",
        "en-US": "You withdraw money from the bank"
    })
    .addStringOption(option => option
        .setName('cantidad')
        .setNameLocalizations({
            "es-ES": "cantidad",
            "en-US": "amount"
        })
        .setDescription('El dinero que desea depositar o todo')
        .setDescriptionLocalizations({
            "es-ES": "El dinero que desea depositar o todo",
            "en-US": "The money you want deposit or all"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'withdraw',
    async run(client, interaction, language) {

        try {

            const user = interaction.user
            const cantidad = interaction.options._hoistedOptions[0].value;
            const cantidadNumber = Number(cantidad)

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
                
                const banco = economiaUser.Bank
                const withAll = economiaUser.Cash + economiaUser.Bank
                const withCantidad = cantidadNumber + economiaUser.Cash
                const restCantidad = economiaUser.Bank - cantidad

                const emoji = economiaServer.Emoji
                
                const embedCero = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'withdraw.with-cero', locale: language}))
                .setColor(Config.color.WARNING)

                if (cantidad <= 0) return interaction.reply({ embeds: [embedCero], ephemeral: true})
                if (cantidad === 'all') {
                    await UserEconomy.updateOne({MemberId: interaction.user.id}, {Bank: 0})
                    await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: withAll})
                    const embedall = new EmbedBuilder()
                        .setColor(Config.color.CELE)
                        .setDescription(client.languages.__mf({phrase: 'withdraw.with-all', locale: language}, {user: user, dinero: dinero, emoji: emoji}))
                    interaction.reply({
                        embeds: [embedall]
                    })
                } else {
                    const embedMas = new EmbedBuilder()
                        .setDescription(client.languages.__({phrase: 'withdraw.with-mas', locale: language}))
                        .setColor(Config.color.WARNING)
                    if (banco < cantidad) return interaction.reply({ embeds: [embedMas], ephemeral: true})
                    const embedInvalid = new EmbedBuilder()
                        .setDescription(client.languages.__({phrase: 'withdraw.with-invalid', locale: language}))
                        .setColor(Config.color.WARNING)
                    if (isNaN(cantidad)) return interaction.reply({ embeds: [embedInvalid], ephemeral: true })
                    await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: withCantidad})
                    await UserEconomy.updateOne({MemberId: interaction.user.id}, {Bank: restCantidad})
                    const embedcan = new EmbedBuilder()
                        .setColor(Config.color.CELE)
                        .setDescription(client.languages.__mf({phrase: 'withdraw.with-finish', locale: language}, {user: user.username, cantidad: cantidad, emoji: emoji}))
                    interaction.reply({
                        embeds: [embedcan]
                    })
                }
            } 
            

        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
        
        
    }
}