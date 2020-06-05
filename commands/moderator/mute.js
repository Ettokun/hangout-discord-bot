module.exports = {
    help: {
        name: "mute",
        description: "Muted member in Guild",
        alias: [],
        category: "moderator",
        usage: "[mention user]",
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
        if (!role) {
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
                            channel.createOverwrite(role.id, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                                SPEAK: false,
                                CONNECT: false,
                                ATTACH_FILES: false,
                            });
                        });

                    member.roles.add(role.id);
                    msg.channel.send(`${member.user.username} has been Muted!`);
                });
        } else {
            if (member.roles.cache.has(role.id)) {
                return msg.channel.send(`This member already Muted`);
            } else {
                msg.guild.channels.cache
                    .map((channel, id) => channel)
                    .forEach((channel) => {
                        channel.createOverwrite(role.id, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                            ATTACH_FILES: false,
                        });
                    });

                member.roles
                    .add(role.id)
                    .then(() =>
                        msg.channel.send(
                            `${member.user.username} has been Muted!`
                        )
                    );
            }
        }
    },
};
