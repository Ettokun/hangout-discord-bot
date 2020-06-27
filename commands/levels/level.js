const { MessageEmbed } = require("discord.js");
const levelSchema = require("../../model/level.js");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "level",
        description: "See Level User",
        alias: ["levels", "lvl", "exp"],
        category: "levels",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const member = getMember(msg, args.join(" "));

        const mention = !member ? msg.author : member.user;

        levelSchema.findOne(
            {
                userid: mention.id,
                guildid: msg.guild.id,
            },
            (err, level) => {
                if (err) console.log(err);

                if (!level)
                    return msg.channel.send(`(404) Member Not Found XD!`);

                const lvlEmbed = new MessageEmbed()
                    .setColor("BLUE")
                    .setAuthor(
                        `${level.username}#${member.user.discriminator}`,
                        mention.displayAvatarURL({ format: "png" })
                    )
                    .setThumbnail(mention.displayAvatarURL({ format: "png" }))
                    .setDescription(
                        `Level: **${level.level}**\nTotal Xp: **${
                            level.xp
                        }**\n(Need ${
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
