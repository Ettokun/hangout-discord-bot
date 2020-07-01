const { MessageEmbed } = require("discord.js");
const lyric = require("../miscellaneous/lyric");

module.exports = {
    help: {
        name: "lyric",
        discription: "Showing the lyrics",
        alias: ["lyrics", "lyr"],
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

        lyric.run(client, message, serverQueue.songs[0].title);
    },
};
