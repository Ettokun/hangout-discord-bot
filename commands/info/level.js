const { MessageEmbed } = require("discord.js");
const levelSchema = require("../../model/level.js");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "level",
        description: "See Level User",
        alias: ["levels", "lvl", "exp"],
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const member = getMember(msg, args.join(" "));

        const mention = !member ? msg.author.id : member.user.id;

        levelSchema.findOne(
            {
                userid: mention,
                guildid: msg.guild.id,
            },
            (err, level) => {
                if (err) throw err;

                if (!level)
                    return msg.channel.send(`(404) Member Not Found XD!`);

                const lvlEmbed = new MessageEmbed()
                    .setColor("BLUE")
                    .setAuthor(
                        `${level.username}#${member.user.discriminator}`,
                        level.avatar
                    )
                    .setThumbnail(level.avatar)
                    .setDescription(
                        `Level: **${level.level}**\nTotal Xp: **${
                            level.xp
                        }**\n(perlu ${
                            level.nextLevel - level.xp
                        } XP to level up)`
                    )
                    .setFooter(
                        `${bot.user.username} | Level System`,
                        bot.user.displayAvatarURL()
                    );

                msg.channel.send(lvlEmbed);
            }
        );
    },
};
