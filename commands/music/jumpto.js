const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "jumpto",
        discription: "Jump to next song",
        alias: ["skipto"],
        category: "music",
        usage: "[nomor lagu]",
        accessableby: "member",
    },
    run: async (bot, msg, args, prefix) => {
        const { channel } = msg.member.voice;
        if (!channel) {
            //IF AUTHOR IS NOT IN VOICE CHANNEL
            return msg.channel.send("**You're Not In a Voice Channel!**");
        }

        const serverQueue = msg.client.queue.get(msg.guild.id);

        if (!serverQueue) {
            return msg.channel.send("**No music currently Play**");
        }

        if (!args[0]) {
            return msg.channel.send(`Type ${prefix}queue To see list`);
        }

        if (isNaN(args[0]) || parseInt(args[0]) < 1)
            return mgg.channel.send(
                `Type ${prefix}jumpto 1 - ${serverQueue.songs.length}`
            );

        if (parseInt(args[0]) > serverQueue.songs.length) {
            return msg.channel.send(`:x: Song not found in list ${args[0]}`);
        }

        const queue = serverQueue.songs;
        const req = serverQueue.reqBy;

        queue.splice(0, parseInt(args[0]) - 1);
        req.splice(0, parseInt(args[0]) - 1);

        serverQueue.connection.dispatcher.end();

        msg.channel.send(`Jump to song ${queue}`);
    },
};
