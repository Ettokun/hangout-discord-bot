module.exports = {
    help: {
        name: "8ball",
        description: "Give Me question",
        alias: "",
        category: "fun",
        usage: "[pertanyaan]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args) => {
        const pertanyaan = args.join(" ");
        const jawaban = [
            "Maybe",
            "Yes",
            "No",
            "Maybe Yes",
            "Maybe No",
            "Not Both",
        ];

        if (!pertanyaan) return msg.channel.send(`Give me a Question`);

        msg.reply(`${jawaban[Math.floor(Math.random() * jawaban.length)]}`);
    },
};
