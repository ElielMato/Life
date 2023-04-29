const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js')
const Lang = require('../../models/guilds');
const Config = require('../../../config');

const builder = new SlashCommandBuilder()
    .setName('setlang')	
    .setDescription('Establece el idioma para el bot.')
    .setDescriptionLocalizations({
        "es-ES": "Establece el idioma para el bot",
        "en-US": "Sets language for the bot"
    })
    .addStringOption(option => option
                .setName('lang')
                .setDescription('Lenguaje del servidor')
                .setDescriptionLocalizations({
                    "es-ES": "Lenguaje del bot",
                    "en-US": "Bot Language"
                })
                .setRequired(true)
                .addChoices(
                    { name: 'Spanish', value: 'es' },
                    { name: 'English', value: 'en' }))

module.exports = {
    builder: builder.toJSON(),
    name: 'setlang',
    async run(client, interaction, language) {

        var permisos = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
        const embedPerms = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'general.not-permissions', locale: language }))
            .setColor(Config.color.WARNING)
        
        if (!permisos) return interaction.reply({
            embeds: [embedPerms],
            ephemeral: true
        });

        const newLang = interaction.options._hoistedOptions[0].value

        await Lang.findOne({guildId: interaction.guildId.toString()}).then((s, err) => {
            if (err) return console.log(err);
            if (s) {
                s.lang = newLang
                s.save().catch(e => console.log(e));
            } else {
                const newGuild = new Lang({
                    guildId: interaction.guild.id,
                    lang: newLang
                })
                newGuild.save().catch(e => console.log(e));
            }
        })

        const embed = new EmbedBuilder()
            .setDescription(client.languages.__({phrase: 'setlang.newLang', locale: newLang}))
            .setColor(Config.color.CELE)

        return interaction.reply({embeds: [embed], ephemeral: true})
    }
}