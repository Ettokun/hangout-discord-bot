const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../utility.json");

module.exports = {
    help: {
        name: "reload",
        description: "Command Just For Developers!",
        alias: "",
        category: "util",
        usage: "",
        accessableby: "DEVELOPERS!",
    },
    run: async (bot, msg, args, prefix) => {
        if (msg.author.id !== ownerId) return msg.reply(`Just For Developers`);

        try {
            await msg.channel.send(`reloading...`);
            process.exit();
        } catch (e) {
            console.log(e);
        }
    },
};
