const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "rps",
        description: "Rock, Paper, Scissors games",
        alias: ["suit", "gbt"],
        category: "fun",
        usage: "[rock, paper, scissors]",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        // jika ada pilihan
        if (args[0]) {
            // pilihan
            const userChoise = args[0].toLowerCase();
            const botchoise = ["paper", "rock", "scissors"];

            const namaBot = bot.user.username || bot.nickname;
            const namaUser = msg.member.nickname || msg.member.user.username;

            const random =
                botchoise[Math.floor(Math.random() * botchoise.length)];

            // algoritma permainan
            if (random === userChoise) {
                return msg.channel.send(
                    `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n Tie!`
                );
            }

            if (userChoise === "rock") {
                if (random === "scissors") {
                    return msg.channel.send(
                        `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n ${namaUser} win!`
                    );
                } else {
                    return msg.channel.send(
                        `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n ${namaBot} win!`
                    );
                }
            }

            if (userChoise === "paper") {
                if (random === "scissors") {
                    return msg.channel.send(
                        `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n ${namaBot} win!`
                    );
                } else {
                    return msg.channel.send(
                        `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n ${namaUser} win!`
                    );
                }
            }

            if (userChoise === "scissors") {
                if (random === "rock") {
                    return msg.channel.send(
                        `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n ${namaBot} win! `
                    );
                } else {
                    return msg.channel.send(
                        `${namaUser} choose **${userChoise.toUpperCase()}** and ${namaBot} choose **${random.toUpperCase()}**\n ${namaUser} win!`
                    );
                }
            }

            if (
                userChoise !== "paper" ||
                userChoise !== "rock" ||
                userChoise !== "scissors"
            )
                return msg.channel.send(
                    "You must choose between Rock Paper Scissors"
                );
        } else {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Command : >rps\nAlias : >suit, >gbt\n\n")
                .setDescription("Masukan : [rock, paper, scissors]");
            msg.channel.send(embed);
        }
    },
};
