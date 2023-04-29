const { EmbedBuilder } = require('discord.js');
const { getTwitchTitle, getTwitchGame, getTwitchAvatar, getTwitchViewers, getTwitchUptime } = require('../../functions/Twitch/twitchInformation');
const Config = require('../../../config.json');
const Twitch = require('../../models/twitch');

const db = require('megadb');
let databaseTwitch = new db.crearDB({
    nombre: "Users",
    carpeta: "Database",
    sub: "TwitchInfo",
});


module.exports = {
    name: 'ready',
    async execute(interaction, client, member) {

        const servers = await Twitch.find({});

        setInterval(async () => {
            servers.forEach(async server => {
                const guildId = client.guilds.cache.get(server.GuildId);
                if (!guildId) return await Twitch.create({
                    GuildId: guildId.id,
                });

                const guildTwitch = await Twitch.findOne({
                    GuildId: guildId.id,
                });

                if (guildTwitch.Active === "on"){
                    const channelId = guildTwitch.ChannelId;
                    if (!channelId){
                        const notChannale = channels(guildId)
                        notChannale.then((data) =>{
                            const embed = new EmbedBuilder()
                                .setDescription("No tiene un canal definido de notificaciones de twitch, utiliza /twitch channel")
                            client.channels.cache.get(data).send({embeds: [embed]})
                        })
                    }
                    
                    const Users = guildTwitch.UserTwitch;

                    Users.forEach((user) => {
                        getTwitchUptime(user)
                            .then(async data => {
                                const uptimeTwitch = data
                                if (uptimeTwitch != `${user} is offline` && uptimeTwitch != "") {
                                    getTwitchTitle(user)
                                        .then(data => databaseTwitch.set(`${guildId.id}.${user}.title`, data))
                                        .catch(error => console.error(error));
                                    getTwitchGame(user)
                                        .then(data => databaseTwitch.set(`${guildId.id}.${user}.game`, data))
                                        .catch(error => console.error(error));	
                                    getTwitchAvatar(user)
                                        .then(data => databaseTwitch.set(`${guildId.id}.${user}.avatar`, data))
                                        .catch(error => console.error(error));	
                                    getTwitchViewers(user)
                                        .then(data => databaseTwitch.set(`${guildId.id}.${user}.viewers`, data))
                                        .catch(error => console.error(error));

                                    if (databaseTwitch.has(`${guildId.id}.${user}`)) {
                                        const title = await databaseTwitch.obtener(`${guildId.id}.${user}.title`)
                                        const game = await databaseTwitch.obtener(`${guildId.id}.${user}.game`)
                                        const avatar = await databaseTwitch.obtener(`${guildId.id}.${user}.avatar`)
                                        const viewers = await databaseTwitch.obtener(`${guildId.id}.${user}.viewers`)

                                        const embedTwitch = new EmbedBuilder()
                                            .setTitle(title)
                                            .setColor(Config.color.CELE)
                                            .setAuthor({ name: user, iconURL: avatar})
                                            .setFields(
                                                {
                                                    name: 'Viewers:',
                                                    value: viewers,
                                                    inline: true
                                                },
                                                {
                                                    name: 'Game:',
                                                    value: game,
                                                    inline: true
                                                })
                                            .setURL(`https://www.twitch.tv/${user}`)
                                            .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-1280x720.jpg`)

                                        client.channels.cache.get(channelId).send({
                                            embeds: [embedTwitch]
                                        })
                                    }
                                };
                            })
                            .catch(error => console.error(error));
                    });
                };
            });
        }, 1800000); //30m = 1800000ms
    }
};

async function channels(guild) {
    let channels = [];
    guild.channels.cache.forEach(channel => {
        channels.push(channel)
    });

    let i = 0;
    while (i < 1) {
        i++;
        if (channels[i].type == 0) {
            return channels[i].id
        }
    }
};