module.exports = {
    help: {
        name: "settopic",
        description: "SetTopic of channel",
        alias: [],
        category: "moderator",
        usage: "[mention user]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_CHANNELS") ||
            !msg.member.hasPermission("MANAGE_SERVER")
        )
            return msg.channel.send(`You Dont Have Permission`);

        if (!args.join(" ")) return msg.channel.send(`You Must Include topic`);

        msg.channel.setTopic(args.join(" ")).then((topic) => {
            msg.channel.send(`Channel topic change to **${args.join(" ")}**`);
        });
    },
};
