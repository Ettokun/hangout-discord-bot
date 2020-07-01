const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "volume",
        discription: "Set volume music",
        alias: ["vol", "volum"],
        category: "music",
        usage: "[1-100]",
        accessableby: "member",
    },
    run: async (client, message, args, prefix) => {
        if (!args[0]) {
            return message.channel.send(`Type ${prefix}volume [1-100]`);
        }

        const { channel } = message.member.voice;
        if (!channel) {
            //IF AUTHOR IS NOT IN VOICE CHANNEL
            return message.channel.send("**You're Not In a Voice Channel!**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.channel.send(`**Not Play Anything**`);
        }

        if (isNaN(args[0]))
            return message.channel
                .send(`**Must Number**`)
                .then((m) => m.delete({ timeout: 10000 }).catch());

        if (args[0] > 100) {
            serverQueue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
            return message.channel
                .send(`**Max Volume Is 100**`)
                .then((m) => m.delete({ timeout: 10000 }).catch());
        }

        serverQueue.volume = parseInt(args[0]);
        serverQueue.connection.dispatcher.setVolumeLogarithmic(
            parseInt(args[0]) / 100
        );
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Volume set set to \`${args[0]}%\``);

        message.channel
            .send(embed)
            .then((m) => m.delete({ timeout: 10000 }).catch());
    },
};
