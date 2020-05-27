module.exports = {
    help: {
        name: "8ball",
        description: "Permainan Mirip Kerang ajaib di Spongebob :)",
        alias: "",
        category: "fun",
        usage: "[pertanyaan]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args) => {
        const pertanyaan = args.join(" ");
        const jawaban = [
            "Mungkin",
            "Iya",
            "Tidak",
            "Bisa jadi",
            "Mungkin Iya",
            "Mungkin Tidak",
            "Tidak Keduanya",
        ];

        if (!pertanyaan) return msg.channel.send(`Mohon Masukan pertanyaan`);

        msg.reply(
            `${jawaban[Math.floor(Math.random() * jawaban.length)]}`
        ).then((m) => {
            m.delete({ timeout: 30000 });
            msg.delete({ timeout: 30000 });
        });
    },
};
