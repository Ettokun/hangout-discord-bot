module.exports = {
    help: {
        name: "skip",
        discription: "Memutar music selanjutnya",
        alias: ["next", "ns"],
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

        serverQueue.connection.dispatcher.end();
        message.channel.send(":white_check_mark: | Music been skip");
    },
};
