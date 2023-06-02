const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');

const builder = new SlashCommandBuilder()
    .setName('pay')	
    .setNameLocalizations({
        "es-ES": "pagar",
        "en-US": "pay"
    })
    .setDescription('Le pagaras a un usuario')
    .setDescriptionLocalizations({
        "es-ES": "Le pagaras a un usuario",
        "en-US": "You will pay a user"
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
    .addNumberOption(option => option
        .setName('cantidad')
        .setNameLocalizations({
            "es-ES": "cantidad",
            "en-US": "amount"
        })
        .setDescription('Elige la cantidad')
        .setDescriptionLocalizations({
            "es-ES": "Elige la cantidad",
            "en-US": "Choose an amount"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'pay',
    async run(client, interaction, language) {
        
        try {

            const usuario = interaction.options.getUser("usuario")
            const cantidad = interaction.options._hoistedOptions[1].value;

            const economiaSujeto = await UserEconomy.findOne({
                GuildId: interaction.guild.id,
                MemberId: usuario.id
            })

            const economiaUser = await UserEconomy.findOne({
                GuildId: interaction.guild.id,
                MemberId: interaction.user.id
            })

            const economiaServer = await ServerEconomy.findOne({
                GuildId: interaction.guild.id
            })

            const Server = "";
            const User = "";
            let Sujeto = "";

            if (!economiaServer){
                Server = await ServerEconomy.create({ GuildId: interaction.guild.id })
            }

            if (!economiaUser){
                User = UserEconomy.create({ GuildId: interaction.guild.id, MemberId: interaction.user.id })
            }

            if (!economiaSujeto) {
                Sujeto = await UserEconomy.create({ GuildId: interaction.guild.id, MemberId: usuario.id })
            }

            await Server.save
            await User.save
            await Sujeto.save
            
            if (economiaUser && economiaServer && economiaSujeto) {

                const emoji = economiaServer.Emoji
                const dinero = economiaUser.Cash
                const payMas = economiaSujeto.Cash + cantidad
                const payMenos = economiaUser.Cash - cantidad

                if (usuario.id === interaction.user.id) return interaction.reply({
                content: client.languages.__({phrase: 'pay.pay-you', locale: language}),
                ephemeral: true
                })
                if (cantidad > dinero) return interaction.reply({
                    content: client.languages.__({phrase: 'pay.pay-invalid', locale: language}),
                    ephemeral: true
                })

                await UserEconomy.updateOne({MemberId: interaction.user.id}, {Cash: payMenos})
                await UserEconomy.updateOne({MemberId: usuario.id}, {Cash: payMas})

                const embed = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__mf({phrase: 'pay.pay-cantidad', locale: language}, {cantidad: cantidad, emoji: emoji, usuario: usuario.username}))
                interaction.reply({
                    embeds: [embed]
            })
                
            }

        } catch (error) {
            console.error(error);
        }

    }
}