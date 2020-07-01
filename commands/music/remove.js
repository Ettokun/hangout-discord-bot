const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "remove",
        discription: "Removed each song from playlist",
        alias: ["rm", "del", "delete"],
        category: "music",
        usage: "[nomor lagu]",
        accessableby: "member",
    },
    run: async (bot, msg, args) => {
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

        if (isNaN(args[0]))
            return mgg.channel.send(
                `Type ${prefix}jumpto 1 - ${serverQueue.songs.length}`
            );

        if (
            parseInt(args[0]) > serverQueue.songs.length ||
            parseInt(args[0]) < 0
        ) {
            return msg.channel.send(`:x: Song not found in list ${args[0]}`);
        }

        const queue = serverQueue.songs;
        const req = serverQueue.reqBy;

        queue.splice(parseInt(args[0]) - 1, 1);
        req.splice(parseInt(args[0]) - 1, 1);

        msg.channel.send(`Remove ${queue} From Playlist`);
    },
};
