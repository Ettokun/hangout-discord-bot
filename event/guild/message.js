// node pacage meneger require
const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const mongoose = require("mongoose");

// file require
const levelSchema = require("../../model/level.js");
const PrefixSchema = require("../../model/prefix.js");

// cofig env
config({
    path: "D:\\discord\\bot discord/.env",
});

// prefix
let customPrefix;
const database = process.env.DATABASE;

(async () => {
    await mongoose
        .connect(`${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log("connect to monggo db"));
})();

// message listener

module.exports = async (bot, msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm")
        return msg.author.send(
            `Maaf Tidak bisa Gunakan command di${msg.guild.name}`
        );

    const member = msg.guild.members.cache.filter((m) => !m.user.bot).size;

    PrefixSchema.findOne(
        {
            guildName: msg.guild.name,
            guildID: msg.guild.id,
        },
        async (err, pref) => {
            if (err) console.log(err);

            if (!pref) {
                const newPrefix = new PrefixSchema({
                    guildName: msg.guild.name,
                    guildID: msg.guild.id,
                    prefix: ">",
                    member,
                });

                newPrefix.save().catch((err) => console.log(err));
            }

            customPrefix = pref.prefix;
        }
    );

    const prefix = (await customPrefix) || ">";
    // j=if msg from bod and dm

    // making args
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // take command from command handler
    let command =
        (await bot.commands.get(cmd)) || bot.commands.get(bot.alias.get(cmd));

    // mongoose startmongoose
    let expAdd = Math.floor(Math.random() * 7) + 8;

    let nextlvl;

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
                    level.nextLevel = level.level * 500;
                    const lvlEmbed = new MessageEmbed()
                        .setColor("BLUE")
                        .setAuthor(`${level.username}`, level.avatar)
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

    // mongoose end

    // checking if user not using preifx
    if (!msg.content.startsWith(prefix)) return;

    // ceking jika member salah memasukan command
    if (command === undefined) {
        msg.channel
            .send(":x: **Sorry, Command not found!**")
            .then((m) => m.delete({ timeout: 10000 }));
        msg.delete();
        return;
    }
    // ceking jika member melakukan command
    if (command) {
        command.run(bot, msg, args);
    }
};
