// node pacage meneger require
const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
// const mongoose = require("mongoose");

// file require
const xp = require("../../exp.json");
// const levelSchema = require("../../model/level.schema");

config({
    path: "D:\\discord\\bot discord/.env",
});
const prefix = process.env.PREFIX;
// const pass = process.env.PASSWORDDB;

// message listener

module.exports = async (bot, msg) => {
    // j=if msg from bod and dm
    if (msg.author.bot) return;
    if (msg.channel.type === "dm")
        return msg.author.send(
            `Maaf Tidak bisa Gunakan command di${msg.guild.name}`
        );
    // mongoose startmongoose
    // mongoose end

    // level system start
    let expAdd = Math.floor(Math.random() * 7) + 8;

    if (!xp[msg.author.id]) {
        xp[msg.author.id] = {
            xp: 0,
            level: 1,
        };
    }

    let curxp = xp[msg.author.id].xp;
    let curlvl = xp[msg.author.id].level;
    let nextLvl = xp[msg.author.id].level * 300;
    xp[msg.author.id].xp = parseInt(curxp) + expAdd;
    console.log();

    if (nextLvl <= xp[msg.author.id].xp) {
        xp[msg.author.id].level = parseInt(curlvl) + 1;
        const lvlEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL())
            .setDescription(
                `<@${msg.author.id}> telah naik level ke level ${
                    xp[msg.author.id].level
                }`
            )
            .setFooter(
                `${bot.user.username} - Level System`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(lvlEmbed);
    }

    fs.writeFile("./exp.json", JSON.stringify(xp), (err) => {
        if (err) throw err;
    });
    // level sytem end

    // checking if user not using preifx
    if (!msg.content.startsWith(prefix)) return;

    // making args
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // take command from command handler
    let command =
        (await bot.commands.get(cmd)) || bot.commands.get(bot.alias.get(cmd));

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
