module.exports = {
    help: {
        name: "pause",
        discription: "Pause music",
        alias: [],
        category: "music",
        usage: "",
        accessableby: "member",
    },
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) {
            //IF AUTHOR IS NOT IN VOICE CHANNEL
            return message.channel.send("**You're Not In a Voice Channel!**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.channel.send("**No music currently Play**");
        }

        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true);

            return message.channel.send("✅ | music paused");
        }

        message.channel.send("✅ | music already paused");
    },
};
