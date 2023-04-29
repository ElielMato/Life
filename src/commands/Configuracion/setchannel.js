const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const Config = require('./../../..//config.json');
const Suggest = require('../../models/channelsuggest')


const builder = new SlashCommandBuilder()
    .setName('setchannel')	
    .setDescription('Establecer canales')
    .setDescriptionLocalizations({
        "es-ES": "Establecer canales",
        "en-US": "Set channels"
    })
    .addSubcommand(subcommand =>
        subcommand
        .setName('suggest')
        .setDescription('Añade el canal de sugerencias')
        .setDescriptionLocalizations({
            "es-ES": "Añade el canal de sugerencias",
            "en-US": "Add the suggestion channel"
        })
        .addChannelOption(option => option
            .setName('suggest')
            .setDescription('Elige el canal de sugerencias.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)))
    //.addSubcommand(subcommand =>
    //    subcommand
    //    .setName('logs')
    //    .setDescription('Añade el canal de logs')
    //    .addChannelOption(option => option
    //        .setName('logs')
    //        .setDescription('Elige el canal de logs.')
    //        .addChannelTypes(ChannelType.GuildText)
    //        .setRequired(true)))
    
module.exports = {
    builder: builder.toJSON(),
    name: 'setchannel',
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

            if (interaction.options.getSubcommand() === "suggest") {

                const suggestchannel = interaction.options.getChannel("suggest");

                await Suggest.findOne({GuildId: interaction.guildId.toString()}).then((s, err) => {
                    if (err) return console.log(err);
                    if (s) {
                        s.ChannelId = suggestchannel.id
                        s.save().catch(e => console.log(e));
                    } else {
                        const newGuild = new Suggest({
                            GuildId: interaction.guild.id,
                            ChannelId: suggestchannel.id
                        })
                        newGuild.save().catch(e => console.log(e));
                    }
                })

                const embedSet = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'setchannels.channel-suggest', locale: language}, {suggestchannel: suggestchannel}))
                    .setColor(Config.color.GOOD)

                interaction.reply({
                    embeds: [embedSet],
                    ephemeral: true
                });


            }  else if (interaction.options.getSubcommand() === "logs") {

                const logschannel = interaction.options.getChannel("logs");
                
                if (logschannel.type == `0`) {
                
                logs.establecer(`${interaction.guild.id}.CanalId`, logschannel.id)

                const embedSet = new EmbedBuilder()
                    .setDescription(client.languages.__mf({phrase: 'channels.channel-suggest', locale: language}, {logschannel: logschannel}))
                    .setColor(Config.color.GOOD)

                interaction.reply({
                    embeds: [embedSet],
                    ephemeral: true
                });

                } else {

                    const embedWar = new EmbedBuilder()
                        .setDescription(client.languages.__({phrase: 'general.channel-text', locale: language}))
                        .setColor(Config.color.WARNING)
                    
                    interaction.reply({
                        embeds: [embedWar],
                        ephemeral: true
                    })

                }

            }

        } catch (error) {
            console.log("Error en SlashCommand: " + error);

        }
        
    }
}