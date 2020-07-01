const { ShardingManager } = require("discord.js");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

const maneger = new ShardingManager("./bot.js", {
    token: process.env.TOKEN,
    totalShards: 1,
});

maneger.spawn();
maneger.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
