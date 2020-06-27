const { MessageEmbed } = require("discord.js");
const isgd = require("isgd");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "shorten",
        description: "Showing Your avatar Or another member",
        alias: ["short"],
        category: "miscellaneous",
        usage: "[link] (custom link)",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        if (!args[0])
            return msg.channel.send(
                `**Pls Enter the Link what you want to shorten**`
            );

        if (!args[1]) {
            isgd.shorten(args[0], (res) => {
                const sortEmbed = new MessageEmbed().setDescription(
                    `**Before Shorten:**\n${args[0]}\n\n**After**\n${res}`
                );

                msg.channel.send(sortEmbed);
            });
        } else {
            if (args[1].length < 5)
                return msg.channel.send(
                    `Short URL/s must be at least 5 characters long`
                );
            isgd.custom(args[0], args[1], (res) => {
                const sortEmbed = new MessageEmbed().setDescription(
                    `**Before Shorten:**\n${args[0]}\n\n**After**\n${res}`
                );

                msg.channel.send(sortEmbed);
            });
        }
    },
};
