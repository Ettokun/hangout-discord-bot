const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "invite",
        descripsi: 'Invite bot Ke server',
        alias: ["inv", "toserver"],
        category: "misc",
        usage: "",
        accessableby: "Member"
    },
    run: async (bot, msg, args) => {
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
                `:ballot_box_with_check: **Invite ${bot.user.username}** to Your Discord server: https://bit.ly/36iwux4`
            );

        msg.channel.send({ embed });
    }
};
