const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const { readdirSync } = require("fs");

config({
    path: "D:\\discord\\bot discord/.env"
});
const prefix = process.env.PREFIX;

module.exports = {
    help: {
        name: "help",
        description: "Memunculkan Semua Command pada bot",
        alias: ["h", "command", "command"],
        category: "misc",
        usage: "(command)",
        accessableby: "Member"
    },
    run: async (bot, msg, args) => {
        if (args[0] === "help")
            return msg.channel.send(
                `Pls masukan \`${prefix}help\` / \`${prefix}help (command Name)\` Saja!`
            );

        const embed = new MessageEmbed()
            .setColor("#ADD8E6")
            .setAuthor(`${msg.guild.me.displayName} Help`, msg.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL);

        if (!args[0]) {
            const categories = readdirSync("./commands/");

            embed.setDescription(
                `These are the avaliable commands for ${msg.guild.me.displayName}\n\nThe bot prefix is **${prefix}**`
            );
            embed.setFooter(
                `© ${msg.guild.me.displayName} | Total Command: ${bot.commands.size}`,
                bot.user.displayAvatarURL
            );

            categories.forEach(category => {
                const dir = bot.commands.filter(
                    c => c.help.category === category
                );
                const capital =
                    category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(
                        `+ ${capital} [${dir.size}]:`,
                        dir.map(c => `\`${c.help.name}\``).join(" ")
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
                        .setTitle(`**Command Tidak Valid*`)
                        .setDescription(
                            `lakukan \`${prefix}help\` Untuk meliat list command`
                        )
                );

            command = command.help;

            embed.setDescription(`Bot Prefix: ${prefix}\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() +
                command.name.slice(1)}
            **Description:** ${command.description || "Tidak ada Descripsi"}
            **Usage:** ${
                command.usage
                    ? `\`${prefix}${command.name} ${command.usage}\``
                    : "No Usage"
            }
            **Accessible:** ${command.accessableby || "Member"}
            **Alias:** ${
                command.alias ? `\`${command.alias.join(", ")}\`` : "None."
            }`);

            return msg.channel.send(embed);
        }
    }
};
