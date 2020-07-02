const { Client, MessageEmbed } = require("discord.js");
const { dateNow } = require("../../functions");
const client = new Client();

module.exports = {
    help: {
        name: "ping",
        description: "Testing bot Online or Offline ignore this",
        alias: "",
        category: "util",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        let firstTime = Date.now();
        msg.channel.send(`Pong!`).then((message) => {
            let endTime = Date.now();
            const pingEmbed = new MessageEmbed()
                .setTitle("Result")
                .setDescription(
                    `Pong! :ping_pong: \`${
                        endTime - firstTime
                    }ms\`\nHeartbeat! :heartbeat: \`${bot.ws.ping}ms\``
                )
                .setFooter(`${bot.user.username} | Ping`);
            message.edit(pingEmbed);
        });
    },
};
