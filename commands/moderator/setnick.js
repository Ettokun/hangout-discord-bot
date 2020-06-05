module.exports = {
    help: {
        name: "setnick",
        description: "Set member nick",
        alias: ["changenick"],
        category: "moderator",
        usage: "[Mention Member] [new Nick]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_CHANNEL"))
            return msg.channel.send("No Have Permission!");

        if (!args[0] && !args[1])
            return msg.channel.send(">setnick [Mention] [New Nick]");

        if (!args[0] || !args[1])
            return msg.channel.send(">setnick [Mention] [New Nick]");

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.get(args[0]);
        const newNick = args.slice(1).join(" ");

        // console.log(member);
        member.setNickname(newNick, "Change it").catch((e) => {
            console.log(e);
            return msg.channel
                .send(e.message)
                .then((msg) => msg.delete({ timeout: 20000 }));
        });

        msg.channel.send(`<@${member.id}> Succesful change name to ${newNick}`);
    },
};
