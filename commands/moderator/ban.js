const { getMember } = require("../../functions");

module.exports = {
    help: {
        name: "ban",
        description: "Banned Member",
        alias: "",
        category: "moderator",
        usage: "[User] (Reason) (days)",
        accessableby: "Moderator/Admin",
    },

    run: async (bot, msg, args) => {
        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);

        if (!msg.member.hasPermission("MANAGE_CHANNELS"))
            return msg.channel
                .send("No Have Permission")
                .then((m) => m.delete({ timeout: 10000 }));
        if (!args[0] || member === undefined)
            return msg.channel
                .send("Mention `@user` to Ban his/her from the server")
                .then((m) => m.delete({ timeout: 10000 }));

        const reason = args.join(" ").slice(22) || "NO REASON!";

        msg.guild
            .member(user)
            .ban({ day: 1, reason })
            .then(() =>
                msg.channel
                    .send(
                        `<@${member.user.id}> Get Kicked from ${msg.guild.name}!`
                    )
                    .then((m) => m.delete({ timeout: 10000 }))
            )
            .catch((err) => console.log(err));
    },
};
