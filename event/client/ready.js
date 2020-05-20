const discord = require("discord.js");
const { config } = require("dotenv");
config({
    path: "D:\\discord\\bot discord/.env"
});
const prefix = process.env.PREFIX;

module.exports = async bot => {
    console.log(`\n${bot.user.username} siap digunakan`);

    const activity = [
        `${prefix}help`,
        `<3 U`,
        `${prefix}invite`,
        `Hope You Enjoy`
    ];

    setInterval(() => {
        const aktivitas = activity[Math.floor(Math.random() * activity.length)];
        bot.user.setActivity(
            `${aktivitas} | ${bot.user.username} create by Kevin`,
            {
                type: "LISTENING"
            }
        );
    }, 10000);
};
