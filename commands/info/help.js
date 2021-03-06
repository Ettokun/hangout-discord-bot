const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    help: {
        name: "help",
        description: "Memunculkan Semua Command pada bot",
        alias: ["h", "command"],
        category: "info",
        usage: "(command)",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (args[0] === "help")
            return msg.channel.send(
                `Just do type\`${prefix}help\` / \`${prefix}help (command Name)\`!`
            );

        const theOwner = "@kevin_octavian_";

        const embed = new MessageEmbed()
            .setColor("#ADD8E6")
            .setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL);

        if (!args[0]) {
            const categories = readdirSync("./commands/");

            embed.setDescription(
                `These are the avaliable commands for ${msg.guild.me.displayName}\n\nThe bot prefix is **${prefix}**\n\n\nType ${prefix}help (command Name) to see Spesific Command\n`
            );
            embed.setFooter(
                `© ${msg.guild.me.displayName} | Total Command: ${bot.commands.size} | CreateBY: ${theOwner}`,
                bot.user.displayAvatarURL
            );

            categories.forEach((category) => {
                const dir = bot.commands.filter(
                    (c) => c.help.category === category
                );
                const capital =
                    category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(
                        ` ❯ ${capital} [${dir.size}]:`,
                        dir.map((c) => `\`${c.help.name}\``).join(", ")
                    );
                } catch (r) {
                    console.log(r);
                }
            });

            return msg.channel.send(embed);
        } else {
            let command = bot.commands.get(
                bot.alias.get(args[0].toLowerCase()) || args[0].toLowerCase()
            );
            if (!command)
                return msg.channel.send(
                    embed
                        .setTitle(`**Command Not Found**`)
                        .setDescription(
                            `type \`${prefix}help\`to see list command`
                        )
                        .setFooter(
                            `© ${msg.guild.me.displayName} | Total Command: ${bot.commands.size} | CreateBY: ${theOwner}`,
                            bot.user.displayAvatarURL()
                        )
                );

            command = command.help;

            embed
                .setDescription(
                    `Bot Prefix: ${prefix}\n\n**Command:** ${
                        command.name.slice(0, 1).toUpperCase() +
                        command.name.slice(1)
                    }\n**Description:** ${
                        command.description || "No Description"
                    }\n**Usage:** ${
                        command.usage
                            ? `\`${prefix}${command.name} ${command.usage}\``
                            : "No Usage"
                    }\n**Accessible:** ${
                        command.accessableby || "Member"
                    }\n**Alias:** ${
                        command.alias
                            ? `\`${command.alias.join(", ")}\``
                            : "None."
                    }\n\n**Note:** () = Optional ,[] Required`
                )
                .setFooter(
                    `© ${msg.guild.me.displayName} | Total Command: ${bot.commands.size} | CreateBY: ${theOwner}`,
                    bot.user.displayAvatarURL()
                );
            return msg.channel.send(embed);
        }
    },
};
