const { EmbedBuilder } = require("discord.js");
const Config = require('../../../config.json');
const reminderSchema = require('../../models/reminder.schema.js')
const Guilds = require('../../models/guilds')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        const locale = await Guilds.findOne({ guildId: interaction.guild.id })
        const language = locale.lang
        setInterval(async () => {
            const reminders = await reminderSchema.find();
            if (!reminders) return;
            else {
                reminders.forEach(async reminder => {

                    if (reminder.Time > Date.now()) return;

                    const user = await client.users.cache.get(reminder.User);
                    const embedReminder = new EmbedBuilder()
                        .setTitle(client.languages.__({phrase: "reminder.title", locale: language}))
                        .setDescription(reminder.Message)
                        .setColor(Config.color.CELE)
                        .setTimestamp()
                    user?.send({ embeds: [embedReminder] }).catch(err => {return});

                    await reminderSchema.deleteMany({
                        User: user.id,
                        Time: reminder.Time,
                        Message: reminder.Message
                    });
                });
            };
        }, 1000 * 5)
    }
}