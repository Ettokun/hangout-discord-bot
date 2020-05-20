const discord = require("discord.js");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\bot discord/.env"
});
const prefix = process.env.PREFIX;

module.exports = async (bot, msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    if (!msg.content.startsWith(prefix)) return;

    let args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let command =
        (await bot.commands.get(cmd)) || bot.commands.get(bot.alias.get(cmd));

    // ceking jika member salah memasukan command
    if (command === undefined) {
        msg.channel
            .send(":x: **Sorry, Command not found!**")
            .then(m => m.delete({ timeout: 10000 }));
        msg.delete();
        return;
    }
    // ceking jika member melakukan command
    if (command) {
        command.run(bot, msg, args);
    }
};
