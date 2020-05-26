const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const bot = new Client({ disableEveryone: true });

["commands", "alias"].forEach((x) => (bot[x] = new Collection()));
["command", "event"].forEach((x) => require(`./handler/${x}`)(bot));

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

bot.login(process.env.TOKEN);
