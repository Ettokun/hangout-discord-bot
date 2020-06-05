const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "howgay",
        description: "how gay you",
        alias: ["gay"],
        category: "fun",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        // :rainbow_flag:
        const count = Math.floor(Math.random() * 101);

        let predic;
        let color;

        if (count <= 25) {
            predic = "Maybe You Normal";
            color = "GREEN";
        } else if (count <= 50) {
            predic = "HMMMM!?";
            color = "BLUE";
        } else if (count <= 75) {
            predic = "You're Gay";
            color = "YELLOW";
        } else if (count <= 100) {
            predic = "You F*ck Gay Man!";
            color = "RED";
        }

        const howgayEmbed = new MessageEmbed()
            .setColor(color)
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setDescription(
                `:rainbow_flag: How Gay You:\n${count}%\n\n${predic}`
            )
            .setFooter(
                `${bot.user.username} | howgay`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(howgayEmbed);
    },
};
