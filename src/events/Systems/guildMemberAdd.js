const { EmbedBuilder } = require('discord.js')
const Welcome = require('../../models/welcome')

module.exports = {
    name: 'guildMemberAdd',
    async execute(interaction, client) {

            const welcome = await Welcome.findOne({ GuildId: interaction.guild.id})
            if (!welcome) return await Welcome.create({
                GuildId: interaction.guild.id
            });
            if (welcome.Active = "on") {
                if (welcome.Title != "" && welcome.Descriptions != "") {
                    if(welcome.RoleId != ""){

                        const role = interaction.guild.roles.cache.get(welcome.RoleId);
                        if (role) {
                            await interaction.roles.add(role);
                        }

                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: interaction.user.username,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024})
                            })
                            .setTitle(` ${welcome.Title}`)
                            .setDescription(`${welcome.Descriptions}`)
                            .setColor(`${welcome.Color}`)
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024}))
                            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024})})
                            .setTimestamp()

                        client.channels.cache.get(`${welcome.ChannelId}`).send({embeds: [embed]})
                    } else {
                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: interaction.user.username,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024})
                            })
                            .setTitle(` ${welcome.Title}`)
                            .setDescription(`${welcome.Descriptions}`)
                            .setColor(`${welcome.Color}`)
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024}))
                            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024})})
                            .setTimestamp()

                        client.channels.cache.get(`${welcome.ChannelId}`).send({embeds: [embed]})
                    }
                    
                }

            } else if (welcome.Active = "off") {
            }  
}}