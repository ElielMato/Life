const { ShardingManager } = require("discord.js")
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