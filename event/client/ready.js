const discord = require("discord.js");

module.exports = async (bot) => {
    console.log(`\n${bot.user.username} siap digunakan ${bot.uptime}ms`);

    const activity = [
        `>help`,
        `<3 U`,
        `>invite`,
        `Hope You Enjoy`,
        `${bot.guilds.cache.size} server use this bot`,
    ];

    setInterval(() => {
        const aktivitas = activity[Math.floor(Math.random() * activity.length)];
        bot.user.setActivity(
            `${aktivitas} | ${bot.user.username} create by Kevin`,
            {
                type: "PLAYING",
            }
        );
    }, 10000);
};
