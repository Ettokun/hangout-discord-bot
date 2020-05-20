const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "say",
        description: "Bot akan Menulis ulang yang telah di tulis",
        alias: ["saying", "talk"],
        category: "misc",
        usage: "[Tulis apapun]",
        accessableby: "Member"
    },
    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            return msg.channel.send("Tidak memiliki izin!");
        }

        if (!args.join(" ")) {
            return msg.channel.send("Masukan kata yang ingin di ucapkan");
        }

        msg.channel.startTyping();

        let saying = args.join(" ");

        msg.delete().catch();

        await msg.channel.send(saying);
        msg.channel.stopTyping(true);
    }
};
