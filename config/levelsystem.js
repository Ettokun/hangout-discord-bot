const levels = require("../model/prefix");
const { MessageEmbed } = require("discord.js");

module.exports = {
    level: async (bot, msg, swtich = "none", prefix) => {
        // no parameter
        if (swtich === "none") {
            levels.findOne(
                {
                    guildID: msg.guild.id,
                },
                (err, level) => {
                    if (err) console.log(err);

                    const embed = new MessageEmbed()
                        .setAuthor(
                            msg.author.tag,
                            msg.author.displayAvatarURL()
                        )
                        .setColor("BLUE")
                        .addField(
                            "**Level System:**",
                            level.levelSytem ? "**ON**" : "**OFF**"
                        )
                        .setDescription(
                            `Type ${prefix}config levelsytem [on/off]`
                        )
                        .setFooter(
                            `${bot.user.tag} | Config`,
                            bot.user.displayAvatarURL()
                        );

                    msg.channel.send(embed);
                }
            );
        }

        // level system on
        if (swtich.toLowerCase() === "on") {
            levels.findOne(
                {
                    guildID: msg.guild.id,
                },
                (err, level) => {
                    if (err) console.log(err);

                    if (!level.levelSytem) {
                        level.levelSytem = true;
                        msg.channel.send("Level System set **On**");
                    } else {
                        if (level.levelSytem) {
                            msg.channel.send("Level System Already **On**");
                        } else {
                            level.levelSytem = true;
                            msg.channel.send("Level System set **On**");
                        }
                    }

                    level.save().catch((err) => console.log(err));
                }
            );
        }

        // level system off
        if (swtich.toLowerCase() === "off") {
            levels.findOne(
                {
                    guildID: msg.guild.id,
                },
                (err, level) => {
                    if (err) console.log(err);

                    if (!level.levelSytem) {
                        level.levelSytem = false;
                        msg.channel.send("Level System set **Off**");
                    } else {
                        if (!level.levelSytem) {
                            msg.channel.send("Level System Already **Off**");
                        } else {
                            level.levelSytem = false;
                            msg.channel.send("Level System set **Off**");
                        }
                    }

                    level.save().catch((err) => console.log(err));
                }
            );
        }
    },
};
