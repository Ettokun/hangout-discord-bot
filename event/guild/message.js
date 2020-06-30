// node pacage meneger require
const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const mongoose = require("mongoose");

// file require
const levelSchema = require("../../model/level.js");
const PrefixSchema = require("../../model/guild.js");
const { customMessage } = require("../../functions");

// externa fungsion
const { dateNow } = require("../../functions.js");

// cofig env
config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

// prefix

const cooldown = new Set();

// message listener

module.exports = async (bot, msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;

    const member = msg.guild.members.cache.size;

    PrefixSchema.findOne(
        {
            guildID: msg.guild.id,
            guildName: msg.guild.name,
        },
        async (err, pref) => {
            if (err) console.log(err);

            if (!pref) {
                const newPrefix = new PrefixSchema({
                    guildName: msg.guild.name,
                    oldGuildName: msg.guild.name,
                    guildID: msg.guild.id,
                    member,
                    configGuild: {
                        Custome_Message: {
                            level_Up: "@user Level Up To @levelup",
                            Welcome:
                                "@user Joined!, Welcome To @guild Now We Have @membercount Member",
                            Leave:
                                "@user Leave!, Bye Bye Now We have @membercount Member",
                        },

                        Channel: {
                            level_Notification_Channel: "",
                            Member_Count_Channel: "",
                            Welcome_Channel: "",
                            Leave_Channel: "",
                            Mod_log_Channel: "",
                        },

                        General: {
                            prefix: "-",
                            leveling_System: true,
                        },

                        Roles: {
                            Auto_Assign_Role: "",
                        },
                    },
                });

                newPrefix.save().catch((err) => console.log(err));
                return;
            }

            // constractor
            // bot prefif
            const { leveling_System } = await pref.configGuild.General;
            const { level_Up } = await pref.configGuild.Custome_Message;
            const { level_Notification_Channel } = await pref.configGuild
                .Channel;
            const prefix = "<";
            // making args
            let args = msg.content.slice(prefix.length).trim().split(/ +/g);
            let cmd = args.shift().toLowerCase();

            // take command from command handler
            let command =
                (await bot.commands.get(cmd)) ||
                bot.commands.get(bot.alias.get(cmd));

            // mongoose startmongoose level
            let expAdd = Math.floor(Math.random() * 5) + 2;

            let nextlvl = 500;
            if (leveling_System) {
                levelSchema.findOne(
                    {
                        userid: msg.author.id,
                        guildid: msg.guild.id,
                    },
                    (err, level) => {
                        if (err) console.log(err);

                        if (!level) {
                            const newLevel = new levelSchema({
                                guildid: msg.guild.id,
                                username: msg.author.username,
                                oldUsername: msg.author.username,
                                userid: msg.author.id,
                                xp: expAdd,
                                level: 1,
                                nextLevel: nextlvl,
                                avatar: msg.author.displayAvatarURL(),
                            });

                            newLevel.save().catch((err) => console.log(err));
                        } else {
                            level.xp = level.xp + expAdd;

                            const levelUser = msg.guild.members.cache.find(
                                (usr) => usr.id === level.userid
                            );

                            if (level.nextLevel < level.xp) {
                                level.level = level.level + 1;

                                level.nextLevel = level.level ** 2 * 500;

                                const lvlEmbed = new MessageEmbed()
                                    .setColor("BLUE")
                                    .setAuthor(
                                        `${level.username}`,
                                        level.avatar
                                    )
                                    .setDescription(
                                        `${customMessage(
                                            bot,
                                            levelUser,
                                            level_Up,
                                            true,
                                            level.level
                                        )}`
                                    )
                                    .setFooter(
                                        `${
                                            bot.user.username
                                        } | Level System | ${dateNow(
                                            msg,
                                            false
                                        )}`,
                                        bot.user.displayAvatarURL()
                                    );

                                const channel = msg.guild.channels.cache.find(
                                    (x) => x.id === level_Notification_Channel
                                );
                                if (channel) {
                                    channel.send(lvlEmbed);
                                } else {
                                    msg.channel
                                        .send(lvlEmbed)
                                        .catch(console.error);
                                }
                            }

                            level.save().catch((err) => console.log(err));
                        }
                    }
                );
                // mongoose end level
            }
            // mention the bot
            if (
                msg.content.trim().split(/ +/g)[0] === "<@703427669605351434>"
            ) {
                const embed = new MessageEmbed()
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setDescription(
                        `This Guild Prefix is: \`${prefix}\`\nYou can Type \`${prefix}help\` To see All Command`
                    )
                    .setFooter(
                        `${bot.user.username} | Createby: HAVINGFUN#8812`,
                        bot.user.displayAvatarURL({ size: 512 })
                    );
                return msg.channel.send(embed);
            }

            if (getStartwith(msg)) return;

            if (!msg.content.startsWith(prefix))
                // checking if user not using preifx
                return;

            // ceking jika member salah memasukan command
            if (!command) {
                msg.channel
                    .send(":x: **Sorry, Command not found!**")
                    .then((m) => m.delete({ timeout: 10000 }));
                msg.delete().catch();
                return;
            } else {
                // ceking jika member melakukan command
                if (cooldown.has(msg.author.id)) {
                    return msg.channel
                        .send(`Use Command After 5 sec`)
                        .then((m) => m.delete({ timeout: 5000 }));
                } else {
                    cooldown.add(msg.author.id);
                    setTimeout(() => {
                        cooldown.delete(msg.author.id);
                    }, 5000);

                    command.run(bot, msg, args, prefix);
                }
            }
        }
    );
};

function getStartwith(msg) {
    return (
        msg.content.startsWith("<@&") ||
        msg.content.startsWith("<#") ||
        msg.content.startsWith("<@") ||
        msg.content.startsWith("<@!")
    );
}
