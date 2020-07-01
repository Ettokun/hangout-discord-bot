const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "nowplaying",
        discription: "Melihat music yang sedang di putar",
        alias: ["np", "nowp"],
        category: "music",
        usage: "",
        accessableby: "member",
    },
    run: async (bot, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) {
            //IF AUTHOR IS NOT IN VOICE CHANNEL
            return message.channel.send("**You're Not In a Voice Channel!**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.channel.send("**No music currently Play**");
        }

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${serverQueue.songs[0].title}`)
            .setURL(serverQueue.songs[0].url)
            .setFooter(bot.user.username, bot.user.displayAvatarURL());

        message.channel.send(embed);
    },
};
