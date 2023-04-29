const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');

const builder = new SlashCommandBuilder()
    .setName('give')	
    .setDescription('Giveas dinero a un usuario')
    .setDescriptionLocalizations({
        "es-ES": "Giveas dinero a un usuario",
        "en-US": "Give money to a user"
    })
    .addUserOption(option => 
        option.setName('usuario')
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
    .addNumberOption(option => 
        option.setName('dinero')
        .setNameLocalizations({
            "es-ES": "dinero",
            "en-US": "money"
        })
        .setDescription('Elige una cantidad')
        .setDescriptionLocalizations({
            "es-ES": "Elige una cantidad",
            "en-US": "Choose an amount"
        })
        .setRequired(true)) 
    .addStringOption(option => 
        option.setName('lugar')
        .setNameLocalizations({
            "es-ES": "lugar",
            "en-US": "place"
        })
        .setDescription('Elige el lugar')
        .setDescriptionLocalizations({
            "es-ES": "Elige el lugar",
            "en-US": "Choose the place"
        })
        .setRequired(true)
        .addChoices(
            {name: "Billetera/Wallet", value: "wallet"},
            {name: "Banco/Bank", value: "bank"}))

module.exports = {
    builder: builder.toJSON(),
    name: 'give',
    async run(client, interaction, language) {

        try {
            
            var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
            const embedPerms = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
                .setColor(Config.color.WARNING)

            if (!permisos) return interaction.reply({
                embeds: [embedPerms],
                ephemeral: true
            });

            const usuario = interaction.options.getUser("usuario")
            const cantidad = interaction.options._hoistedOptions[1].value;
            const lugar = interaction.options._hoistedOptions[2].value;

            const economiaSujeto = await UserEconomy.findOne({
                GuildId: interaction.guild.id,
                MemberId: usuario.id
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
            if (!economiaSujeto) {

                UserEconomy.create({
                    GuildId: interaction.guild.id,
                    MemberId: usuario.id
                })

                const embed = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__({phrase: "general.economy-create", locale: language}))
                interaction.reply({embeds: [embed]})
            }

            

            if (economiaServer && economiaSujeto) {

                const emoji = economiaServer.Emoji
                const giveWallet = economiaSujeto.Cash + cantidad
                const giveBank = economiaSujeto.Bank + cantidad

                if (lugar === "wallet") {
                await UserEconomy.updateOne({MemberId: usuario.id}, {Cash: giveWallet})
                const embedBille = new EmbedBuilder()
                    .setDescription( client.languages.__mf({phrase: 'give.give-wallet', locale: language}, {usuario: usuario.username, cantidad: cantidad, emoji: emoji}))
                    .setColor(Config.color.CELE)
                interaction.reply({embeds: [embedBille]})
                } else if (lugar === "bank") {
                    await UserEconomy.updateOne({MemberId: usuario.id}, {Bank: giveBank})
                    const embedWall = new EmbedBuilder()
                        .setDescription( client.languages.__mf({phrase: 'give.give-bank', locale: language}, {usuario: usuario.username, cantidad: cantidad, emoji: emoji}))
                        .setColor(Config.color.CELE)
                    interaction.reply({
                        embeds: [embedWall]
                    })
                }
                
            } 

        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }
        
        
    }
}