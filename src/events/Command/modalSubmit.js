const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')
const Config = require('../../../config.json')
const Welcome = require('../../models/welcome')
const Emoji = require('../../json/emoji.json');
const Langs = require('../../models/guilds')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const Lang = await Langs.findOne({
            guildId: interaction.guildId
        })
        if (!Lang) return await Langs.create({
            guildId: interaction.guildId,
            lang: "es"
        })
        const language = Lang.lang

        const check = client.emojis.cache.get(Emoji.check)
        const cross = client.emojis.cache.get(Emoji.cross)

        if (!interaction.isModalSubmit()) return;

        const guildWelcome = await Welcome.findOne({GuildId: interaction.guild.id})
        if (!guildWelcome) return await Welcome.create({ GuildId: interaction.guild.id })

        const fields = interaction.fields.fields

        const titleField = fields.get("title")
        const descField = fields.get("description")
        const colorField = fields.get("color")
        const channelField = fields.get("channel")
        const roleField = fields.get("role")

        const embed = new EmbedBuilder()
            .setColor(Config.color.GOOD)
        
        const embedError = new EmbedBuilder()
            .setColor(Config.color.BAD)

        if (interaction.customId === 'embedWelcome' && channelField != undefined) {

            const channel = client.channels.cache.get(`${channelField.value}`)

            if (channel === undefined) return interaction.reply({
                embeds: [embedError.setDescription(`${cross}` + client.languages.__({phrase: 'welcome.not-channel', locale: language}))],
                ephemeral: true
            });

            if (channel.type != 0) return interaction.reply({
                embeds: [embedError.setDescription(`${cross}` + client.languages.__({phrase: 'welcome.not-textchannel', locale: language}))],
                ephemeral: true
            });

            if (channelField.value != '') {
                await guildWelcome.updateOne({ChannelId: `${channelField.value}`})
                embed.setDescription(`${check}`  + client.languages.__({phrase: 'welcome.success-channel', locale: language}));

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }

        }

        if (interaction.customId === 'embedWelcome' && titleField != undefined) {

            if (titleField.value != '') {
                await guildWelcome.updateOne({Title: titleField.value})

                embed.setDescription(`${check}` + client.languages.__({phrase: 'welcome.success-title', locale: language}));
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }

        }

        if (interaction.customId === 'embedWelcome' && descField != undefined) {

            if (descField.value != '') {
                await guildWelcome.updateOne({Descriptions: descField.value})

                embed.setDescription(`${check}` + client.languages.__({phrase: 'welcome.success-description', locale: language}));
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }

        }

        if (interaction.customId === 'embedWelcome' && colorField != undefined) {

            async function checkColorExistence(hexCode) {
                const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexCode}`);
                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            }

            function validateHexColor(hexCode) {
                const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
                if (!hexRegex.test(hexCode)) {
                    return false;
                }

                return checkColorExistence(hexCode);
            }

            const exists = await validateHexColor(colorField.value)

            if (colorField.value != '') {
                if (exists === true) {

                    await guildWelcome.updateOne({Color: colorField.value})

                    embed.setDescription(`${check}` + client.languages.__({phrase: 'welcome.success-color', locale: language}));
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    embedError.setDescription(`${cross}` + client.languages.__({phrase: 'welcome.not-color', locale: language}) )
                    interaction.reply({
                        embeds: [embedError],
                        ephemeral: true
                    })
                }
            }
        } 

        if (interaction.customId === 'embedWelcome' && roleField != undefined) {

            if (roleField.value != '') {

                const role = interaction.guild.roles.cache.get(`${roleField.value}`)

                if (role === undefined) return interaction.reply({
                    embeds: [embedError.setDescription(`${cross}` + client.languages.__({phrase: 'welcome.not-role', locale: language}))],
                    ephemeral: true
                });

                await guildWelcome.updateOne({RoleId: roleField.value})

                embed.setDescription(`${check}` + client.languages.__({phrase: 'welcome.success-role', locale: language}));
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
        } 
    }
}

