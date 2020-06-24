// node pacage meneger require
const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const mongoose = require("mongoose");

// file require
const levelSchema = require("../../model/level.js");
const PrefixSchema = require("../../model/prefix.js");

// externa fungsion
const { getMember } = require("../../functions.js");

// cofig env
config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

// prefix
const database = process.env.DATABASE;

(async () => {
    await mongoose
        .connect(`${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log("connect to monggo db"));
})();

const cooldown = new Set();

// message listener

module.exports = async (bot, msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;

    const member = msg.guild.members.cache.filter((m) => !m.user.bot).size;

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
                    prefix: "-",
                    member,
                    levelSytem: true,
                });

                newPrefix.save().catch((err) => console.log(err));
                return;
            }

            // bot prefix
            const prefix = pref.prefix || "-";

            // making args
            let args = msg.content.slice(prefix.length).trim().split(/ +/g);
            let cmd = args.shift().toLowerCase();

            // take command from command handler
            let command =
                (await bot.commands.get(cmd)) ||
                bot.commands.get(bot.alias.get(cmd));

            // mongoose startmongoose level
            let expAdd = Math.floor(Math.random() * 7) + 8;

            let nextlvl = 500;
            if (pref.levelSytem) {
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

                            if (level.nextLevel <= level.xp) {
                                level.level = level.level + 1;
                                level.nextLevel =
                                    level.level * 500 * level.level;
                                const lvlEmbed = new MessageEmbed()
                                    .setColor("BLUE")
                                    .setAuthor(
                                        `${level.username}`,
                                        level.avatar
                                    )
                                    .setDescription(
                                        `<@${level.userid}> telah naik level ke level ${level.level}`
                                    )
                                    .setFooter(
                                        `${bot.user.username} - Level System`,
                                        bot.user.displayAvatarURL()
                                    );

                                msg.channel.send(lvlEmbed);
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

            // checking if user not using preifx
            if (!msg.content.startsWith(prefix)) return;

            // ceking jika member salah memasukan command
            if (!command) {
                msg.channel
                    .send(":x: **Sorry, Command not found!**")
                    .then((m) => m.delete({ timeout: 10000 }));
                msg.delete();
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
