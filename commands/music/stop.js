module.exports = {
    help: {
        name: "stop",
        discription: "Menngeluarkan bot dan Menghentikan music",
        alias: ["exit"],
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
            channel.leave();
            return message.channel.send("**No music currently Play**");
        }

        serverQueue.songs = [];
        serverQueue.reqBy = [];
        if (voice.selfDeaf) voice.setSelfDeaf(false);
        serverQueue.connection.dispatcher.end();

        serverQueue.textChannel.send("**Stop Playing Music**");
    },
};
