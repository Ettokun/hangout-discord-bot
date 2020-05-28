const { getMember } = require("../../functions");

module.exports = {
    help: {
        name: "kick",
        description: "kick the Member",
        alias: ["kc"],
        category: "moderator",
        usage: "[User] (Reason)",
        accessableby: "Moderator/Admin",
    },

    run: async (bot, msg, args) => {
        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);

        if (!msg.member.hasPermission("MANAGE_CHANNEL"))
            return msg.channel
                .send("No have Permisson")
                .then((m) => m.delete({ timeout: 10000 }));
        if (!args[0] || member === undefined)
            return msg.channel
                .send("Mention `@user` To kick his/her from server")
                .then((m) => m.delete({ timeout: 10000 }));

        const reason = args.join(" ").slice(22) || "NO REASON!";

        msg.guild
            .member(user)
            .kick(reason)
            .then(() =>
                msg.channel
                    .send(`<@${member.user.id}> Succesful Kicked!`)
                    .then((m) => m.delete({ timeout: 10000 }))
            )
            .catch((err) => console.log(err));
    },
};
