const {
    EmbedBuilder
} = require("discord.js")
const Config = require("../../config.json")
const Levels = require("../models/levels")
const Emoji = require('../json/emoji.json')

module.exports = {
    LevelsServer: async (message, client) => {

        const star = client.emojis.cache.get(Emoji.starLevel)

        if (message.author.bot === false) {
            const ServerLevel = await Levels.find({
                GuildId: message.guild.id,
                UserId: message.author.id
            })
            
            if (ServerLevel.Active == "on") {
                if (!ServerLevel) {

                    await Levels.create({
                        GuildId: message.guild.id,
                        UserId: message.author.id,
                        Level: 1,
                        XP: 0
                    })

                } else {
                    const randomxp = Math.floor(Math.random() * 5) + 1
                    const levelup = 5 * (ServerLevel.Level ** 2) + 100 * ServerLevel.Level + 100

                    if ((ServerLevel[0].XP + randomxp) >= levelup) {
                        await Levels.updateOne({UserId: message.author.id}, {XP: 0, Level: parseInt(ServerLevel.Level + 1)})
                        const embed = new EmbedBuilder()
                            .setColor(Config.color.CELE)
                            .setDescription(`<@${message.author.id}> Level Up **${ServerLevel.Level + 1} ${star} **`)
                        message.channel.send({
                            embeds: [embed]
                        });
                    } else {
                        await Levels.updateOne({UserId: message.author.id}, {XP: ServerLevel.XP + randomxp})
                    }
                }
            }
        }
    }
}