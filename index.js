const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActivityType, ShardingManager } = require("discord.js")
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildEmojisAndStickers,
    ],
    partials: [
        Partials.User,
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
    ],

})
const fs = require('fs')
require('dotenv').config()

const manager = new ShardingManager('./bot.js', {
    token: process.env.TOKEN,
    totalShards: "auto",
    shardList: "auto",
    mode: `process`,
    respawn: true,
    timeout: 87398,
});

manager.on('shardCreate', shard => console.log(`Iniciando shard ${shard.id + 1}`));

manager.spawn().catch((err) => console.log(err));