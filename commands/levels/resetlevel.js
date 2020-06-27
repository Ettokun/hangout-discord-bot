const { MessageEmbed } = require("discord.js");
const levelSchema = require("../../model/level.js");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "resetlevel",
        description: "See Level User",
        alias: ["rslevel", "rslvl"],
        category: "levels",
        usage: "[all / name member]",
        accessableby: "admin/moderator",
    },
    run: async (bot, msg, args, prefix) => {
        if (!msg.member.hasPermission("MANAGE_GUILD"))
            return msg.channel.send(`You don't Have Permission`);

        const member = msg.guild.members.cache.find(
            (urs) => `<@${urs.id}>` === args[0]
        );
        if (!args[0])
            return msg.channel.send(
                `**Type ${prefix}resetlevel [name member] / all to reset all member at server**`
            );

        if (args[0].toLowerCase() === "all") {
            levelSchema.find((err, level) => {
                if (err) console.log(err);

                const filterMember = level.filter(
                    (x) => x.guildid === msg.guild.id
                );

                filterMember.forEach((user, index) => {
                    levelSchema.findOne(
                        {
                            userid: user.userid,
                            guildid: msg.guild.id,
                        },
                        (err, level) => {
                            if (err) console.log(err);

                            level.xp = 0;
                            level.level = 1;
                            level.nextLevel = 500;

                            level.save().catch((err) => console.log(err));
                        }
                    );
                });
            });
        } else {
            if (member) {
                levelSchema.findOne(
                    {
                        userid: member.user.id,
                        guildid: msg.guild.id,
                    },
                    (err, level) => {
                        if (err) console.log(err);

                        if (!level)
                            return msg.channel.send(`Member Not Found!`);

                        level.xp = 0;
                        level.level = 1;
                        level.nextLevel = 500;

                        level.save().catch((err) => console.log(err));
                    }
                );
            } else {
                return msg.channel.send(`${args[0]} Is Not Found!`);
            }
        }
    },
};
