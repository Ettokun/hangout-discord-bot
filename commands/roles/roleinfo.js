const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "roleinfo",
        description: "Addrole to member Guild",
        alias: ["rinfo"],
        category: "roles",
        usage: "[@role / Name of role]",
        accessableby: "member",
    },
    run: async (bot, msg, args, prefix) => {
        const { cache } = msg.guild.roles;
        const role = cache.find(
            (role) =>
                role.name.toLowerCase() === args.join(" ").toLowerCase() ||
                `<@&${role.id}>` === args.join(" ")
        );

        if (!role) {
            return msg.channel.send(`Role Not Found!`);
        } else {
            const member = role.members
                .filter((members) => !members.user.bot)
                .map((members) => members.user.username)
                .join(", ");

            const roleInfoEmbed = new MessageEmbed()
                .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                .setColor(role.hexColor)
                .addField("**Name:**", role.name, true)
                .addField("**ID:**", role.id, true)
                .addField("**Color:**", role.hexColor, true)
                .addField(
                    "**Mention:**",
                    `${role.mentionable ? "Yes" : "No"}`,
                    true
                )
                .addField("**Hoisted:**", `${role.hoist ? "Yes" : "No"}`, true)
                .addField("**Position:**", role.position, true)
                .addField("**Who have:**", member, true)
                .setFooter(
                    `${bot.user.username} | RoleInfo`,
                    bot.user.displayAvatarURL()
                );

            msg.channel.send(roleInfoEmbed);
        }
    },
};
