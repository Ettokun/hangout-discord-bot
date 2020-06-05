const ms = require("ms");

module.exports = {
    help: {
        name: "uptime",
        description: "uptime of bot",
        alias: "",
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        msg.channel.send(`My Uptime:\n${ms(bot.uptime, { long: true })}`);
    },
};
