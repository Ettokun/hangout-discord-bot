module.exports = {
    help: {
        name: "clear",
        description: "Clearing the chat in the channel",
        alias: ["clean", "cr"],
        category: "moderator",
        usage: "[include number 1-99]",
        accessableby: "Moderator/Admin",
    },

    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_MESSAGES"))
            return msg.channel.send("No Have Permission");

        if (!args[0])
            return msg.channel.send("include [1-99] to Delete the message");
        if (parseInt(args[0]) >= 100)
            return msg.channel
                .send("Too many")
                .then((m) => m.delete({ timeout: 30000 }));

        msg.channel
            .bulkDelete(parseInt(args[0]))
            .then(() => {
                msg.channel
                    .send(`deleting ${args[0]} Message.`)
                    .then((m) => m.delete({ timeout: 30000 }));
            })
            .catch((err) =>
                msg.channel
                    .send(err.message)
                    .then((m) => m.delete({ timeout: 30000 }))
            );
    },
};
