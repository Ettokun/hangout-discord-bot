module.exports = {
    help: {
        name: "botnick",
        description: "Set bot nick",
        alias: ["mynick"],
        category: "moderator",
        usage: "[new Nick]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_MEMBERS"))
            return msg.channel.send("No Have Permission!");

        if (!args.join(" ")) return msg.channel.send(`Pls Include My New Name`);

        const bots = msg.guild.members.cache.find(
            (bot) => bot.id === "703427669605351434"
        );

        bots.setNickname(args.join(" ")).then(() =>
            msg.channel.send(`My name set to \`${args.join("")}\``)
        );
    },
};
