const { MessageEmbed } = require("discord.js");
const levelSystem = require("../../config/levelsystem");

module.exports = {
    help: {
        name: "config",
        description: "Configuration",
        alias: [],
        category: "misc",
        usage: "[Name config] [value]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        return msg.channel.send("Config is Disable");
        if (
            msg.author.id !== "348651859646349316" ||
            !msg.member.hasPermission("MANAGE_SERVER")
        )
            return msg.channel
                .send("You No Have Permission")
                .then((m) => m.delete({ timeout: 10000 }));

        if (!args[0]) return msg.channel.send("give some input");

        if (args[0].toLowerCase() === "levelsystem") {
            if (!args[1]) {
                levelSystem.level(bot, msg);
            } else if (args[1].toLowerCase() === "off") {
                levelSystem.level(bot, msg, args[1], prefix);
            } else if (args[1].toLowerCase() === "on") {
                levelSystem.level(bot, msg, args[1], prefix);
            }
        }
    },
};
