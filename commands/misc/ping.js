const { Client } = require("discord.js");
const client = new Client();

module.exports = {
    help: {
        name: "ping",
        description: "memastikan bot Online atau Offline",
        alias: "",
        category: "misc",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        let firstTime = Date.now();
        msg.channel.send(`Pong!`).then((msg) => {
            let endTime = Date.now();
            msg.edit(`Pong ${endTime - firstTime}ms`);
        });
    },
};
