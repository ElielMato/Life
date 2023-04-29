const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Config = require('./../../..//config.json');
const weather = require("weather-js");

const builder = new SlashCommandBuilder()
    .setName('clima')
    .setNameLocalizations({
        'es-ES': "clima",
        'en-US': "weather"
    })
    .setDescription('Mira el clima de una ciudad')
    .setDescriptionLocalizations({
        'es-ES': "Mira el clima de una ciudad",
        'en-US': "Look at the weather of a city"
    })
    .addStringOption(option => option
        .setName('ciudad')
        .setNameLocalizations({
            'es-ES': "ciudad",
            'en-US': "city"
        })
        .setDescription('Elige una ciudad')
        .setDescriptionLocalizations({
            'es-ES': "Elige una ciudad",
            'en-US': "Choose a city"
        })
        .setRequired(true))

module.exports = {
    builder: builder.toJSON(),
    name: 'clima',
    async run(client, interaction, language) {

        try {
            const city = interaction.options._hoistedOptions[0].value;

            weather.find({
                search: city,
                degreeType: "C"
            }, function (error, result) {

                if (error) return interaction.reply(error)
                const embedCity = new EmbedBuilder()
                    .setDescription(client.languages.__({phrase: 'clima.clima-invalid', locale: language}))
                    .setColor(Config.color.WARNING)

                if (!city) return interaction.reply({
                    embeds: [embedCity],
                    ephemeral: true
                });

                const embedResult = new EmbedBuilder()
                    .setDescription(client.languages.__({phrase: 'clima.clima-invalid', locale: language}))
                    .setColor(Config.color.WARNING)

                if (result === undefined || result.length === 0) return interaction.reply({
                    embeds: [embedResult],
                    ephemeral: true
                });

                let current = result[0].current
                let location = result[0].location

                const embed = new EmbedBuilder()
                    .setTitle(client.languages.__mf({phrase: 'clima.clima-title', locale: language}, {city: current.observationpoint})) 
                    .setDescription("`" + current.skytext + "`")
                    .setThumbnail(current.imageUrl)
                    .setColor(Config.color.CELE)
                    .addFields([
                        {
                            name: client.languages.__({phrase: 'clima.clima-zone', locale: language}),
                            value: `GMT ${location.timezone}`,
                        },
                        {
                            name: client.languages.__({phrase: 'clima.clima-temp', locale: language}),
                            value: `${current.temperature} °${location.degreetype}`,
                        },
                        {
                            name: client.languages.__({phrase: 'clima.clima-viento', locale: language}),
                            value: `${current.windspeed}`,
                        },
                        {
                            name: client.languages.__({phrase: 'clima.clima-hume', locale: language}),
                            value: `${current.humidity}%`,
                        },
                        {
                            name: client.languages.__({phrase: 'clima.clima-time', locale: language}),
                            value: `${current.day} ${current.date}`,
                        },
                    ])
                    .setTimestamp()
                interaction.reply({
                    embeds: [embed]
                })
            })
        } catch (error) {
            console.log("Error en SlashCommand:" + error);
        }

    ;}}