const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "rps",
        description: "Permainan Rock, Paper, Scissors",
        alias: ["suit", "gbt"],
        category: "fun",
        usage: "[rock, paper,scissors]",
        accessableby: "Member"
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
                    `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n Hasilnya Seri! | ketik >rps [pilihan]`
                );
            }

            if (userChoise === "rock") {
                if (random === "scissors") {
                    return msg.channel.send(
                        `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n ${namaUser} Menang! | ketik >rps [pilihan]`
                    );
                } else {
                    return msg.channel.send(
                        `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n ${namaBot} Menang! | ketik >rps [pilihan]`
                    );
                }
            }

            if (userChoise === "paper") {
                if (random === "scissors") {
                    return msg.channel.send(
                        `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n ${namaBot} Menang! | ketik >rps [pilihan]`
                    );
                } else {
                    return msg.channel.send(
                        `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n ${namaUser} Menang! | ketik >rps [pilihan]`
                    );
                }
            }

            if (userChoise === "scissors") {
                if (random === "rock") {
                    return msg.channel.send(
                        `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n ${namaBot} Menang!  | ketik >rps [pilihan]`
                    );
                } else {
                    return msg.channel.send(
                        `${namaUser} Memilih **${userChoise.toUpperCase()}** dan ${namaBot} Memilih **${random.toUpperCase()}**\n ${namaUser} Menang! | ketik >rps [pilihan]`
                    );
                }
            }

            if (
                userChoise !== "paper" ||
                userChoise !== "rock" ||
                userChoise !== "scissors"
            )
                return msg.channel.send("Maaf, Pilihan mu tidak ada di list");
        } else {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Command : >rps\nAlias : >suit, >gbt\n\n")
                .setDescription("Masukan : [rock, paper, scissors]");
            msg.channel.send(embed);
        }
    }
};
