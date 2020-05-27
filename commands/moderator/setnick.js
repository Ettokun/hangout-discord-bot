const { getMember } = require("../../functions");

module.exports = {
    help: {
        name: "setnick",
        description: "Memunculkan Semua Command pada bot",
        alias: ["changenick"],
        category: "moderator",
        usage: "[Name target] [new Nick]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_CHANNEL"))
            return msg.channel.send("Tidak memiliki IZIN!");

        if (!args[0] && !args[1])
            return msg.channel.send(">setnick [Mention] [Nick baru]");

        if (!args[0] || !args[1])
            return msg.channel.send(">setnick [Mention] [Nick baru]");

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.get(args[0]);
        const newNick = args.slice(1).join(" ");

        // console.log(member);
        member.setNickname(newNick, "Change it").catch((e) => {
            console.log(e);
            msg.channel
                .send(e.message)
                .then((msg) => msg.delete({ timeout: 20000 }));
        });
    },
};
