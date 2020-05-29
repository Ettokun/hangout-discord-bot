module.exports = {
    help: {
        name: "removerole",
        description: "Addrole to member Guild",
        alias: ["rmrole", "deleterole", "dlrole"],
        category: "roles",
        usage: "[@user] [Name Role]",
        accessableby: "moderator/admin",
    },
    run: async (bot, msg, args) => {
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
        if (!role) return msg.channel.send(`You must added name role`);

        if (member.roles.cache.has(role.id)) {
            return member.roles
                .remove(role.id)
                .then(() =>
                    msg.channel.send(
                        `${msg.author.username} remove <@&${role.id}> Roles from ${member.user.username}`
                    )
                );
        } else {
            return msg.channel.send(
                `${member.user.username} Don't have <@&${role.id}> roles`
            );
        }
    },
};
