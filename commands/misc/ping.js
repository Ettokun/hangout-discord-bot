const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

module.exports = {
    help: {
        name: "ping",
        description: "Testing bot Online or Offline ignore this",
        alias: "",
        category: "misc",
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
                .setFooter(
                    `${bot.user.username} | Ping | Today at ${new Date(
                        msg.createdAt
                    )
                        .toTimeString()
                        .slice(0, 8)}`
                );
            message.edit(pingEmbed);
        });
    },
};
