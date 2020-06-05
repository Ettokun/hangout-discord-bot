module.exports = {
    help: {
        name: "owner",
        description: "Who owner from this bot",
        alias: "",
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        const owner =
            msg.guild.id === "581790531097722880"
                ? msg.guild.owner
                : "HAVEFUN#8812";
        msg.channel.send(`<@${msg.author.id}>, My Owner is\n${owner}`);
    },
};
