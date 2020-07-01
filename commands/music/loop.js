module.exports = {
    help: {
        name: "loop",
        discription: "Looping song",
        alias: ["loop", "repeat"],
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

        //OOOOF
        serverQueue.loop = !serverQueue.loop;

        message.channel.send(
            `Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`
        );
    },
};
