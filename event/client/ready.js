const discord = require("discord.js");

module.exports = async (bot) => {
    console.log(`\n${bot.user.username} siap digunakan ${bot.uptime}ms`);

    const activity = [
        `-help`,
        `<3 U`,
        `-invite`,
        `Hope You Enjoy`,
        `${bot.guilds.cache.size} server use this bot`,
        `Mention Me if forgot the prefix`,
    ];
    let i = 0;

    setInterval(() => {
        i++;
        const aktivitas = activity[i % activity.length];
        bot.user.setActivity(
            `${aktivitas} | ${bot.user.username} create by Kevin`,
            {
                type: "PLAYING",
            }
        );
    }, 10000);
};
