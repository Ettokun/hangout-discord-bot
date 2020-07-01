const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "songlist",
        discription: "Showing song list",
        alias: ["queue"],
        category: "music",
        usage: "",
        accessableby: "member",
    },
    run: async (client, msg, args) => {
        const { channel } = msg.member.voice;
        if (!channel) {
            //IF AUTHOR IS NOT IN VOICE CHANNEL
            return msg.channel.send("**You're Not In a Voice Channel!**");
        }

        const serverQueue = msg.client.queue.get(msg.guild.id);

        if (!serverQueue) {
            return msg.channel.send("**No music currently Play**");
        }

        const embed = new MessageEmbed()
            .setColor([100, 0, 0])
            .setAuthor(`Music Queue:`, client.user.displayAvatarURL())
            .setDescription(
                `:musical_note: Playing:\n${
                    serverQueue.songs[0].title
                }\n\n**Next song:**\n${serverQueue.songs
                    .slice(1)
                    .map(
                        (song, index) =>
                            `:diamond_shape_with_a_dot_inside: ${index + 1}. ${
                                song.title
                            }`
                    )
                    .join("\n")}`
            )
            .setFooter(
                `${client.user.username} | ${msg.guild.id}`,
                client.user.displayAvatarURL()
            );

        msg.channel.send(embed);
    },
};
