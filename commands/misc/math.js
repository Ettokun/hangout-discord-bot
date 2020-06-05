const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "math",
        description: "Math command",
        alias: [],
        category: "misc",
        usage: "[number 1] [operation] [number 2]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (!args.join("")) {
            return msg.channel.send(
                `Pls insert number and operation \nExemple:\n${prefix}math 20 + 30`
            );
        }
        const x = args.join().split(/[0-9]/g);

        const hasil =
            x.filter((x) => x === "x").length >= 1
                ? undefined
                : eval(args.join(" "));
        if (!hasil) return msg.channel.send(`x is undefined`);
        const evalEmbed = new MessageEmbed()
            .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL())
            .addField("**Operation**", `\`${args.join(" ")}\``)
            .addField("**Result**", `\`${hasil}\``)
            .setFooter(
                `${bot.user.username} | math`,
                bot.user.displayAvatarURL()
            );
        msg.channel.send(evalEmbed).catch((err) => console.log(err));
    },
};
