const { getMember } = require("../../functions");

module.exports = {
    help: {
        name: "ban",
        description: "MemBAN Member",
        alias: "",
        category: "moderator",
        usage: "[User] (Reason) (days)",
        accessableby: "Moderator/Admin"
    },

    run: async (bot, msg, args) => {
        const user = msg.mentions.users.first();
        const member = msg.guild.member(user);

        if (!msg.member.hasPermission("MANAGE_CHANNEL"))
            return msg.channel
                .send("Tidak memiliki izin")
                .then(m => m.delete({ timeout: 10000 }));
        if (!args[0] || member === undefined)
            return msg.channel
                .send("Masukan ``@user`` Untuk Melanjutkan")
                .then(m => m.delete({ timeout: 10000 }));

        const reason = args.join(" ").slice(22) || "NO REASON!";

        msg.guild
            .member(user)
            .ban({ reason })
            .then(() =>
                msg.channel
                    .send(`<@${member.user.id}> Berhasil di Kick!`)
                    .then(m => m.delete({ timeout: 10000 }))
            )
            .catch(err => console.log(err));
    }
};
