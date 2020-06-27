module.exports = {
    help: {
        name: "setnick",
        description: "Set member nick",
        alias: ["changenick"],
        category: "moderator",
        usage: "[Mention Member] [new Nick]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_NICKNAMES", {
                checkOwner: false,
            }) ||
            !msg.member.hasPermission(6710864, { checkOwner: false })
        )
            return msg.channel.send("No Have Permission!");

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.get(args[0]);

        const newNick = args.slice(1).join(" ");

        if (!member) return msg.channel.send(`Member Not Found!`);
        if (!newNick)
            return msg.channel.send(`Include New Nick ${member.user.tag}`);

        // console.log(member);
        member.setNickname(newNick, "Change it").catch((e) => {
            console.log(e);
            return msg.channel
                .send(e.message)
                .then((msg) =>
                    msg
                        .delete({ timeout: 20000 })
                        .catch((err) => console.log(err))
                );
        });

        msg.channel.send(`<@${member.id}> Succesful change name to ${newNick}`);
    },
};
