module.exports = {
    help: {
        name: "unmute",
        description: "Unmute all member or one of them",
        alias: [],
        category: "moderator",
        usage: "all or [mention user]",
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

        if (args[0] === "all") {
            if (!role) {
                msg.channel.send(`Nothing Get muted`);
            } else {
                role.delete().then(() =>
                    msg.channel.send("All member has UnMute")
                );
            }
            return;
        }

        if (!member) return msg.channel.send(`You Must Mention the member`);

        if (!role) {
            return msg.channel.send(`Role not Found`);
        } else {
            if (!member.roles.cache.has(role.id)) {
                return msg.channel.send(`<@${member.user.id}> Not Get Muted`);
            } else {
                member.roles
                    .remove(role.id)
                    .then(() =>
                        msg.channel.send(
                            `${member.user.username} has been UnMuted!`
                        )
                    );
            }
        }
    },
};
