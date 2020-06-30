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
            "As I see it, yes",
            "Yes",
            "No",
            "Ask Again Later",
            "Better Not tell You Now",
            "Cannot Predict Now",
            "Concentrate And Ask Again",
            "Don't Count On It",
            "It Is Certarin",
            "It Is Decidedly So",
            "Most Likely",
            "My replay is no",
            "My source say no",
            "Outlook not so good",
            "Outlook good",
            "Reply hazy, Try again",
            "Signs point to yes",
            "Very doubtful",
            "Without a doubt",
            "Yes - definitely",
            "You may rely on it",
        ];

        if (!pertanyaan) return msg.channel.send(`Give me a Question`);

        msg.reply(`${jawaban[Math.floor(Math.random() * jawaban.length)]}`);
    },
};
