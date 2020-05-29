module.exports = {
    help: {
        name: "addrole",
        description: "Addrole to member Guild",
        alias: ["roleadd"],
        category: "roles",
        usage: "[@user] [Name Role]",
        accessableby: "moderator/admin",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_ROLES") ||
            !msg.member.hasPermission("MANAGE_SERVER")
        )
            return msg.channel.send(`You Dont Have Permission`);

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.find((u) => u.id === args[0]);
        const { cache } = msg.guild.roles;
        const role = cache.find(
            (role) =>
                role.name.toLowerCase() ===
                    args.join(" ").slice(22).toLowerCase() ||
                `<@&${role.id}>` === args.join(" ").slice(22)
        );

        if (!member) return msg.channel.send(`You Must Mention the member`);
        if (!role) return msg.channel.send(`Role Not Found!`);

        if (member.roles.cache.has(role.id)) {
            return msg.channel.send(
                `This member already have <@&${role.id}> roles`
            );
        } else {
            if (role.name === "muted") {
                return msg.channel
                    .send(
                        `can't add this role type \`${prefix}mute / ${prefix}tempmute\` to mute member`
                    )
                    .then((m) => m.delete({ timeout: 20000 }));
            }
            member.roles
                .add(role.id)
                .then(() =>
                    msg.channel.send(
                        `${member.user.username} given ${role.name} roles`
                    )
                );
            // member.roles.add()
        }
    },
};
