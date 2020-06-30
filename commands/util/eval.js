const { MessageEmbed } = require("discord.js");
const { dateNow } = require("../../functions");
const { inspect } = require("util");
const { stripIndent } = require("common-tags");
const { VultrexHaste } = require("vultrex.haste");

const haste = new VultrexHaste({ url: "https://hasteb.in" });

module.exports = {
    help: {
        name: "eval",
        description: "Command Just For Developers!",
        alias: "",
        category: "util",
        usage: "[JS code]",
        accessableby: "DEVELOPERS!",
    },
    run: async (bot, msg, args, prefix) => {
        if (msg.author.id !== "348651859646349316")
            return msg.reply(`You Not My Owner Eval Command Just for My Owner`);

        if (!args[0]) return msg.reply(`Masukan JavaScript Code`);

        try {
            const start = process.hrtime();
            let output = eval(args.join(" "));
            const difference = process.hrtime(start);

            if (typeof output !== "string")
                output = inspect(output, { depth: 2 });

            if (args.join(" ").toLowerCase().includes("token"))
                output = "You Big Ass";

            const embed = new MessageEmbed()
                .setDescription(
                    stripIndent`
                **:inbox_tray: Output**
                ${
                    output.length > 1950
                        ? await haste.post(output)
                        : `\`\`\`${output}\`\`\``
                }
            `
                )
                .addField("**:question: Type**", `\`\`\`${typeof output}\`\`\``)
                .setFooter(
                    `Executed in ${
                        difference[0] > 0 ? `${difference[0]}` : ""
                    }${difference[1] / 1e6}ms`,
                    bot.user.displayAvatarURL({ format: "png" })
                );

            return msg.channel.send(embed);
        } catch (e) {
            return msg.channel.send(stripIndent`
                ERROR:
                \`${e}\`
            `);
        }
    },
};
