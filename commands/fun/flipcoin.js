module.exports = {
    help: {
        name: "flip",
        description: "Flip a Coin Game",
        alias: "",
        category: "fun",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const coin = ["Heads", "tails"];
        const random = coin[Math.floor(Math.random() * coin.length)];

        msg.reply(`${random}`);
    },
};
