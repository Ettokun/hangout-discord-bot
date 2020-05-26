const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const { readdirSync } = require("fs");

config({
    path: "D:\\discord\\bot discord/.env",
});
const prefix = process.env.PREFIX;

module.exports = {
    help: {
        name: "help",
        description: "Memunculkan Semua Command pada bot",
        alias: ["h", "command", "command"],
        category: "info",
        usage: "(command)",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        if (args[0] === "help")
            return msg.channel.send(
                `Pls masukan \`${prefix}help\` / \`${prefix}help (command Name)\` Saja!`
            );

        const theOwner = "@kevin_octavian_";

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
                        `+ ${capital} [${dir.size}]:`,
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
                        .setTitle(`**Command Tidak Valid*`)
                        .setDescription(
                            `lakukan \`${prefix}help\` Untuk meliat list command`
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
                        command.description || "Tidak ada Descripsi"
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
                    }\n\n**Note:** jika menggunakan kurung () maka artinya itu opsional, jika menggunakan kurung siku [] maka wajib memasukan nilai!`
                )
                .setFooter(
                    `© ${msg.guild.me.displayName} | Total Command: ${bot.commands.size} | CreateBY: ${theOwner}`,
                    bot.user.displayAvatarURL()
                );
            return msg.channel.send(embed);
        }
    },
};
