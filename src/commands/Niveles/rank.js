const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const Config = require('../../../config.json');
const Emoji = require('../../json/emoji.json')
const Levels = require('../../models/levels')

const builder = new SlashCommandBuilder()
    .setName('rank')	
    .setDescription('Mira tu nivel o el de los demas')
    .setDescriptionLocalizations({
        "es-ES": "Mira tu nivel o el de los demas",
        "en-US": "Look at your level or that of others"
    })
    .addUserOption(option => option
        .setName('usuario')
        .setDescriptionLocalizations({
            "es-ES": "usuario",
            "en-US": "user"
        })
        .setDescription('Elige un usuario'))
        .setDescriptionLocalizations({
            "es-ES": "Elige un usuario",
            "en-US": "Choose  a user"
        })

module.exports = {
builder: builder.toJSON(),
name: 'rank',
async run(client, interaction, language) {
        
        const star = client.emojis.cache.get(Emoji.starLevel)
        const target = interaction.options.getUser('usuario');
        const user = interaction.user;

        if (target) {
            const TargetLevel = await Levels.find({
                GuildId: interaction.guild.id,
                UserId: target.id
            })

            const nomember = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'rank.no-xp', locale: language}))
                .setColor(Config.color.GOOD)
            if (!TargetLevel[0]) return interaction.reply({embeds: [nomember], ephemeral: true});
            
            const level = new EmbedBuilder()
                .setDescription(`${star}` + client.languages.__mf({phrase: 'rank.level-user', locale: language}, {target: target.username, member: TargetLevel[0].Level}))
                .setColor(Config.color.GOOD)
            interaction.reply({embeds: [level], ephemeral: true})
        } else {
            const UserLevel = await Levels.find({
                GuildId: interaction.guild.id,
                UserId: user.id
            })

            const nomember = new EmbedBuilder()
                .setDescription(client.languages.__({phrase: 'rank.no-xp-you', locale: language}))
                .setColor(Config.color.GOOD)
            if (!UserLevel) return interaction.reply({embeds: [nomember], ephemeral: true})
            const level = new EmbedBuilder()
                .setDescription(`${star}` + client.languages.__mf({phrase: 'rank.level-you', locale: language}, {user: user.username, member: UserLevel[0].Level}))
                .setColor(Config.color.GOOD)
            interaction.reply({embeds: [level], ephemeral: true})
        }
    }
}

