module.exports = {
    help: {
        name: "resume",
        discription: "Resume music",
        alias: ["res"],
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

        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();

            return message.channel.send("✅ | Music Resume");
        }

        message.channel.send("Music Already resume");
    },
};
