const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "invite",
        descripsi: "Invite bot to your server",
        alias: ["inv", "toserver"],
        category: "miscellaneous",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
                `:ballot_box_with_check: **Invite ${bot.user.username}** to Your Discord server: [INVITE](https://bit.ly/2zattmq)`
            );

        msg.channel.send({ embed });
    },
};
