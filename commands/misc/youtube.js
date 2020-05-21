const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\bot discord/.env"
});

const url = process.env.YOUTUBEAPI;

module.exports = {
    help: {
        name: "youtube",
        description: "",
        alias: ["yt"],
        category: "misc",
        usage: "[judul / link]",
        accessableby: "Member"
    },
    run: async (bot, msg, args) => {
        const search = args.join(" ");
        if (!search) return msg.channel.send("Masukan Judul Atau Link");
        msg.delete();

        let message = await msg.channel.send("Wait...");
        fetch(url + search)
            .then(res => res.json())
            .then(data => {
                const item = data.items[0];

                const embed = new MessageEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
                    .setColor("BLUE");

                embed
                    .setTitle(item.snippet.title)
                    .setURL(
                        `https://www.youtube.com/watch?v=${item.id.videoId}`
                    );
                embed.setDescription(
                    `**Description:** ${
                        item.snippet.description
                    }\n\n**Channel:** ${
                        item.snippet.channelTitle
                    }\n**Publish:** ${item.snippet.publishTime.split("T")[0]}`
                );
                embed.setImage(item.snippet.thumbnails.high.url).video;

                message.delete();
                msg.channel.send(embed);
            })
            .catch(err => {
                console.log(err);
                msg.channel
                    .send(err.message)
                    .then(m => m.delete({ timeout: 5000 }));
            });
    }
};
