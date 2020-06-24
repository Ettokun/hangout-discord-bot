const discord = require("discord.js");
const ms = require("ms");
const DBLapi = require("dblapi.js");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

const dbl = new DBLapi(process.env.DBLTOKEN);

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
    dbl.postStats(bot.guilds.cache.size);

    setInterval(() => {
        dbl.postStats(bot.guilds.cache.size);
    }, ms("30m"));

    setInterval(() => {
        i++;
        const aktivitas = activity[i % activity.length];
        if (i === 5) i = 0;
        bot.user.setActivity(
            `${aktivitas} | ${bot.user.username} create by Kevin`,
            {
                type: "PLAYING",
            }
        );
    }, 10000);
};
