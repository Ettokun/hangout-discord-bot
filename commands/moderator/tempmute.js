const ms = require("ms");

module.exports = {
    help: {
        name: "tempmute",
        description: "Muted member in Guild",
        alias: ["tmute"],
        category: "moderator",
        usage: "[mention user] [How Long]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_ROLES") ||
            !msg.member.hasPermission("MANAGE_SERVER")
        )
            return msg.channel.send(`You Dont Have Permission`);

        const muted = "Muted";

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.find((u) => u.id === args[0]);
        const { cache } = msg.guild.roles;
        const role = cache.find(
            (rm) => rm.name.toLowerCase() === muted.toLowerCase()
        );

        if (!member) return msg.channel.send(`You Must Mention the member`);
        if (!args[1])
            return msg.channel.send(
                `How long You Want To Mute <@${member.user.id}>\ntype ${prefix}tempmute [@user] [time]\nExemple:\n${prefix}tempmute @user 11d`
            );

        if (!role) {
            // jika rolenya tidak ada
            await msg.guild.roles
                .create({
                    data: {
                        name: "Muted",
                        color: "#424954",
                        mentionable: false,
                        permissions: "VIEW_CHANNEL",
                        position: 1,
                    },
                })
                .then((role) => {
                    msg.guild.channels.cache
                        .map((channel, id) => channel)
                        .forEach((channel) => {
                            channel.overwritePermissions([
                                {
                                    id: role.id,
                                    deny: [
                                        "SEND_MESSAGES",
                                        "ADD_REACTIONS",
                                        "SPEAK",
                                        "CONNECT",
                                        "ATTACH_FILES",
                                    ],
                                },
                            ]);
                        });

                    member.roles.add(role.id).then(() => {
                        msg.channel.send(
                            `${member.user.username} has been Muted! ${ms(
                                ms(args[1]),
                                { long: true }
                            )}`
                        );
                        setTimeout(() => {
                            member.roles
                                .remove(role.id)
                                .then(() =>
                                    msg.channel.send(
                                        `<@${member.user.id}> has been UnMuted!`
                                    )
                                );
                        }, ms(args[1]));
                    });
                });
        } else {
            // jika rolenya ada
            if (member.roles.cache.has(role.id)) {
                return msg.channel.send(`This member already Muted`);
            } else {
                msg.guild.channels.cache
                    .map((channel, id) => channel)
                    .forEach((channel) => {
                        channel.overwritePermissions([
                            {
                                id: role.id,
                                deny: [
                                    "SEND_MESSAGES",
                                    "ADD_REACTIONS",
                                    "SPEAK",
                                    "CONNECT",
                                    "ATTACH_FILES",
                                ],
                            },
                        ]);
                    });

                member.roles.add(role.id).then(() => {
                    msg.channel.send(
                        `${member.user.username} has been Muted! ${ms(
                            ms(args[1]),
                            {
                                long: true,
                            }
                        )}`
                    );
                    setTimeout(() => {
                        member.roles
                            .remove(role.id)
                            .then(() =>
                                msg.channel.send(
                                    `<@${member.user.id}> has been UnMuted!`
                                )
                            );
                    }, ms(args[1]));
                });
            }
        }
    },
};
