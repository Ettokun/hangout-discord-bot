const { Client, Collection } = require("discord.js");
const bot = new Client({ disableEveryone: true });

["commands", "alias"].forEach(x => (bot[x] = new Collection()));
["command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.login(process.env.TOKEN);
