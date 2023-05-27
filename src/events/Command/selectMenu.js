const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder
} = require("discord.js");
const Config = require('../../../config.json')
const Welcome = require('../../models/welcome')
const Emoji = require('../../json/emoji.json');
const Level = require('../../models/levels');
const Langs = require('../../models/guilds')
// const Twitch = require('../../models/twitch')

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

        if (!interaction.isStringSelectMenu()) return;

        const option = interaction.values[0];
        const check = client.emojis.cache.get(Emoji.check)
        const cross = client.emojis.cache.get(Emoji.cross)

        const embed = new EmbedBuilder()
            .setColor(Config.color.GOOD)

        const embedError = new EmbedBuilder()
            .setColor(Config.color.BAD)

        const welcome = await Welcome.findOne({GuildId: interaction.guild.id});
        if (!welcome) return await Welcome.create({GuildId: interaction.guild.id});

        const level = await Level.findOne({GuildId: interaction.guild.id});
        if (!level) return await Level.create({GuildId: interaction.guild.id});

        switch (option) {
            case 'title':
                const modal = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}));

                const modalTitle = new TextInputBuilder()
                    .setCustomId('title')
                    .setLabel(client.languages.__({phrase: 'welcome.write-title', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowTitle = new ActionRowBuilder().addComponents(modalTitle);

                modal.addComponents(rowTitle);

                await interaction.showModal(modal);
                break;
            case 'description':
                const modal1 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalDesc = new TextInputBuilder()
                    .setCustomId('description')
                    .setLabel(client.languages.__({phrase: 'welcome.write-description', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowDesc = new ActionRowBuilder().addComponents(modalDesc);

                modal1.addComponents(rowDesc);

                await interaction.showModal(modal1);
                break;
            case 'color':
                const modal2 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalColor = new TextInputBuilder()
                    .setCustomId('color')
                    .setLabel(client.languages.__({phrase: 'welcome.write-color', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowColor = new ActionRowBuilder().addComponents(modalColor);

                modal2.addComponents(rowColor);

                await interaction.showModal(modal2);
                break;
            case 'channel':
                const modal3 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalChannel = new TextInputBuilder()
                    .setCustomId('channel')
                    .setLabel(client.languages.__({phrase: 'welcome.write-channel', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowChannel= new ActionRowBuilder().addComponents(modalChannel);

                modal3.addComponents(rowChannel);

                await interaction.showModal(modal3);
                break;
            case 'role':
                const role1 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalRole = new TextInputBuilder()
                    .setCustomId('role')
                    .setLabel(client.languages.__({phrase: 'welcome.write-role', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowRole = new ActionRowBuilder().addComponents(modalRole);

                role1.addComponents(rowRole);

                await interaction.showModal(role1);
                break;
            case 'on':
                const welcomeOn = await Welcome.findOne({GuildId: interaction.guild.id})
                await welcomeOn.updateOne({Active: "on"})
                interaction.reply({
                    embeds: [embed.setDescription(`${check}` + client.languages.__({phrase: 'welcome.on', locale: language}))],
                    ephemeral: true
                })
                break;
            case 'off':
                const welcomeOff = await Welcome.findOne({GuildId: interaction.guild.id})
                await welcomeOff.updateOne({Active: "off"})
                interaction.reply({
                    embeds: [embedError.setDescription(`${cross}` + client.languages.__({phrase: 'welcome.off', locale: language}))],
                    ephemeral: true
                })
                break;
            case 'onLevels':
                const levelsOn = await Level.findOne({GuildId: interaction.guild.id})
                await levelsOn.updateOne({Active: "on"})
                interaction.reply({
                    embeds: [embed.setDescription(`${check}`  + client.languages.__({phrase: 'level.on', locale: language}))],
                    ephemeral: true
                })
                break;
            case 'offLevels':
                const levelsOff = await Level.findOne({GuildId: interaction.guild.id})
                await levelsOff.updateOne({Active: "off"})
                interaction.reply({
                    embeds: [embedError.setDescription(`${cross}`  + client.languages.__({phrase: 'level.off', locale: language}))],
                    ephemeral: true
                })
                break;
            // case 'onTwitch':
            //     const twitchOn = await Twitch.findOne({GuildId: interaction.guild.id})
            //     await twitchOn.updateOne({Active: "on"})
            //     interaction.reply({
            //         embeds: [embed.setDescription(`${check}`  + client.languages.__({phrase: 'twitch.on', locale: language}))],
            //         ephemeral: true
            //     })
            //     break;
            // case 'offTwitch':
            //     const twitchOff = await Twitch.findOne({GuildId: interaction.guild.id})
            //     await twitchOff.updateOne({Active: "off"})
            //     interaction.reply({
            //         embeds: [embedError.setDescription(`${cross}`  + client.languages.__({phrase: 'twitch.off', locale: language}))],
            //         ephemeral: true
            //     })
            //     break;
            
        }
    }
}