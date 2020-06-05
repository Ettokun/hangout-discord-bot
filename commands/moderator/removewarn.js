const ChannelWarn = require("../../model/channel.js");
const { MessageEmbed } = require("discord.js");

let username = "";
let userDiscriminator = "";

module.exports = {
    help: {
        name: "removewarn",
        description: "Remove warn form a member",
        alias: ["rmwarn", "warnremove"],
        category: "moderator",
        usage: "[User]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_CHANNELS") ||
            !msg.member.hasPermission("MANAGE_GUILD")
        )
            return msg.channel.send(`You Dont Have Permission`);

        if (!args[0]) return msg.channel.send("You Must Mention a Member");
        if (args[0].startsWith("<@&"))
            return msg.channel.send(`You Can't Warn The Roles`);

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.find((u) => u.id === args[0]);

        if (!member) return msg.channel.send(`You Must Mention the member`);

        ChannelWarn.findOne(
            {
                guildID: msg.guild.id,
                guildName: msg.guild.name,
                ownerID: msg.guild.ownerID,
            },
            (err, warns) => {
                if (err) console.log(err);

                if (warns.warns.length <= 0) {
                    return msg.channel.send(`No One Get Warn!`);
                } else {
                    // gettin member form database
                    const findOut = warns.warns.find(
                        (members) => members.warnId === member.user.id
                    );

                    // checkinng if user warn already in database
                    if (!findOut)
                        return msg.channel.send(
                            `<@${member.user.id}> Not Found, Maybe His/Her not get warn`
                        );

                    const memberIndex = warns.warns.findIndex(
                        (warn) => warn.warnId === member.user.id
                    );

                    if (memberIndex < 0) {
                        return msg.channel.send(
                            `<@${member.user.id}> Not Found, Maybe His/Her not get warn`
                        );
                    }

                    warns.warns.splice(memberIndex, 1);

                    warns
                        .save()
                        .then(() => {
                            msg.channel.send(
                                `<@${member.user.id}> Succesfuly remove from warn`
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        );
    },
};
