const levels = require("../model/guild.js");
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, msg, swtich, prefix) => {
    // level system on
    if (swtich.toLowerCase() === "on") {
        levels.findOne(
            {
                guildID: msg.guild.id,
            },
            (err, level) => {
                if (err) console.log(err);

                if (!level.configGuild.General.leveling_System) {
                    level.configGuild.General.leveling_System = true;
                    msg.channel.send("Level System set **On**");
                } else {
                    if (level.configGuild.General.leveling_System) {
                        msg.channel.send("Level System Already **On**");
                    } else {
                        level.configGuild.General.leveling_System = true;
                        msg.channel.send("Level System set **On**");
                    }
                }

                level.save().catch((err) => console.log(err));
            }
        ); // level system off
    } else if (swtich.toLowerCase() === "off") {
        levels.findOne(
            {
                guildID: msg.guild.id,
            },
            (err, level) => {
                if (err) console.log(err);

                if (level.configGuild.General.leveling_System) {
                    level.configGuild.General.leveling_System = false;
                    msg.channel.send("Level System set **Off**");
                } else {
                    if (level.configGuild.General.leveling_System) {
                        level.configGuild.General.leveling_System = false;
                        msg.channel.send("Level System set **Off**");
                    } else {
                        msg.channel.send("Level System Already **Off**");
                    }
                }

                level.save().catch((err) => console.log(err));
            }
        );
    } else {
        levels.findOne(
            {
                guildID: msg.guild.id,
            },
            (err, level) => {
                if (err) console.log(err);

                const { leveling_System } = level.configGuild.General;

                const embed = new MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                    .setColor("BLUE")
                    .addField(
                        "**Level System:**",
                        leveling_System ? "**ON**" : "**OFF**"
                    )
                    .setDescription(`Type ${prefix}config levelsytem [on/off]`)
                    .setFooter(
                        `${bot.user.tag} | Config`,
                        bot.user.displayAvatarURL()
                    );

                msg.channel.send(embed);
            }
        );
    }
};
