const { MessageEmbed } = require("discord.js");
const levelSchema = require("../../model/level.js");
const { dateNow } = require("../../functions");

module.exports = {
    help: {
        name: "leaderboard",
        description: "See Ranks From 1 To 10 on the Server",
        alias: ["lb"],
        category: "levels",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        levelSchema.find((err, level) => {
            if (err) console.log(err);

            const filterMember = level.filter(
                (x) => x.guildid === msg.guild.id
            );
            const sortMember = filterMember.sort(
                (a, b) => b.xp + b.level - (a.xp + a.level)
            );

            const topEmbed = new MessageEmbed()
                .setAuthor(
                    `Top User From 1 to 10 On ${msg.guild.name} Server`,
                    bot.user.displayAvatarURL({ format: "png" })
                )
                .setColor("BLUE")
                .setFooter(
                    `${bot.user.tag} | LeaderBoard`,
                    bot.user.displayAvatarURL({ format: "png" })
                );

            sortMember.forEach((user, index) => {
                if (index >= 10) return;

                topEmbed.addField(
                    `**#${index + 1}** ${user.username} :star2:`,
                    `Level ${user.level} With XP ${user.xp}`
                );
            });

            return msg.channel.send(topEmbed);
        });
    },
};
