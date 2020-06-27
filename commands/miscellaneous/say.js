const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "say",
        description: "Bot Will say what you wanna say",
        alias: ["saying", "talk"],
        category: "miscellaneous",
        usage: "[word]",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        if (!args.join(" ")) {
            return msg.channel.send("Inclue the word");
        }
        let saying = args.join(" ");

        msg.delete().catch();

        await msg.channel.send(saying);
    },
};
