const { MessageEmbed } = require("discord.js");
const { evaluate } = require("mathjs");

module.exports = {
    help: {
        name: "math",
        description: "Math command",
        alias: [],
        category: "miscellaneous",
        usage: "[number 1] [operation] [number 2]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        const input = args.join(" ");

        if (!input) {
            return msg.channel.send(
                `Pls insert number and operation \nExemple:\n${prefix}math 20 + 30`
            );
        }

        const evalEmbed = new MessageEmbed()
            .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL())
            .addField("**Operation**", `\`${input}\``)
            .addField("**Result**", `\`${evaluate(input)}\``)
            .setFooter(
                `${bot.user.username} | math`,
                bot.user.displayAvatarURL()
            );
        msg.channel.send(evalEmbed).catch((err) => console.log(err));
    },
};
