const { Client, Collection } = require("discord.js");
const bot = new Client({ disableEveryone: true });
const { config } = require("dotenv");

["commands", "alias"].forEach(x => (bot[x] = new Collection()));
["command", "event"].forEach(x => require(`./handler/${x}`)(bot));

config({
    path: __dirname + "/.env"
});
const prefix = process.env.PREFIX;

bot.login(process.env.TOKEN);
