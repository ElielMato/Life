const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const UserEconomy = require('../../models/usereconomy');
const ServerEconomy = require('../../models/servereconomy');

const builder = new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Muestra el dinero que tienes')
    .setDescriptionLocalizations({
        "es-ES": "Muestra el dinero que tienes",
        "en-US": "Check your balance"
    })

module.exports = {
    builder: builder.toJSON(),
    name: 'balance',
    async run(client, interaction, language) {

    try {

        const user = interaction.user;

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
            let cash = economiaUser.Cash
            let bank = economiaUser.Bank
            let total = cash + bank

            const emoji = economiaServer.Emoji
            
            const embed = new EmbedBuilder()
                .setColor(Config.color.CELE)
                .setTitle(client.languages.__mf({phrase: 'balance.balance-title', locale: language}, {user: user.username}))
                .setDescription(client.languages.__mf({phrase: 'balance.balance-desc', locale: language}, {cash: cash, bank: bank, total: total, emoji: emoji}))
            interaction.reply({embeds: [embed]})
        }  
    } catch (error) {
        console.error(error);
    }
   
    }
}