const { MessageEmbed } = require("discord.js");
const xp = require("../../exp.json");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "level",
        description: "Melihat Level user",
        alias: ["levels", "lvl", "exp"],
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const member = getMember(msg, args.join(" "));
        console.log(member);

        if (!xp[member.user.id]) return msg.channel.send(`Member Tidak Ada!`);

        let curxp = xp[member.user.id].xp;
        let curlvl = xp[member.user.id].level;
        let nextLvl = xp[member.user.id].level * 300;

        const lvlEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(
                `${member.user.username || member.nickname}#${
                    member.user.discriminator
                }`,
                msg.author.displayAvatarURL()
            )
            .setDescription(
                `Level: **${curlvl}**\nTotal Xp: **${curxp}**\n(perlu ${
                    nextLvl - curxp
                } untuk naik level)\n\nJika bot maintance level akan reset`
            )
            .setFooter(
                `${bot.user.username} - Level System`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(lvlEmbed);
    },
};
