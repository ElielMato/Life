const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const Suggest = require('../../models/channelsuggest')

const builder = new SlashCommandBuilder()
    .setName('suggest')	
    .setDescription('Envia una sugerencia')
    .setDescriptionLocalizations({
        "es-ES": "Envia una sugerencia",
        "en-US": "Send a suggestion"
    })
    .addStringOption(option => option
        .setName('sugerencia')
        .setDescriptionLocalizations({
            "es-ES": "sugerencia",
            "en-US": "suggestion"
        })
        .setDescription('Escribe una sugerencia')
        .setDescriptionLocalizations({
            "es-ES": "Escribe una sugerencia",
            "en-US": "Write a suggestion"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'suggest',
    async run(client, interaction, language) {
        
        const sugerencia = interaction.options._hoistedOptions[0].value;

        const suggest = await Suggest.findOne({
             GuildId: interaction.guild.id
        })

        if (suggest) {
            const canal = suggest.ChannelId

            const embed = new EmbedBuilder()
                .setAuthor({name: interaction.user.username})
                .setDescription(client.languages.__mf({phrase: 'suggest.suggest-desc', locale: language}, {sugerencia: sugerencia}))
                .setColor(Config.color.CELE)
                .setThumbnail(interaction.user.displayAvatarURL())
                .setFooter({text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`});


            const embedFinish = new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__({phrase: 'suggest.suggest-finish', locale: language}))
            interaction.reply({embeds: [embedFinish], ephemeral: true});

            client.channels.cache.get(`${canal}`).send({embeds: [embed]}).then(async msg => {
                await msg.react('✅');
                await msg.react('❎')
            })
        } else {

            const embedNot= new EmbedBuilder()
                    .setColor(Config.color.CELE)
                    .setDescription(client.languages.__({phrase: 'suggest.suggest-channel', locale: language}))
            interaction.reply({embeds: [embedNot], ephemeral: true});
        }

       
    }
}