const { MessageEmbed, MessageAttachment } = require("discord.js");
const imgur = require("imgur");

module.exports = {
    help: {
        name: "girl",
        description: "Bot mengirim Gambar/gif Cewe",
        alias: ["women", "girls"],
        category: "image",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const typeImg = ["time", "viral", "top"];
        const query = "girls";
        const option = {
            sort: typeImg[Math.floor(Math.random() * typeImg.length)],
            page: 2,
        };

        imgur
            .search(query, option)
            .then((res) => {
                let respon =
                    res.data[Math.floor(Math.random() * res.data.length)];

                const embed = new MessageEmbed()
                    .setAuthor(
                        msg.author.username,
                        msg.author.displayAvatarURL()
                    )
                    .setTitle(`Jika Gambar tidak Muncul Click disini`)
                    .setURL(respon.link)
                    .setDescription(`Mungkin Kmu Jomblo`)
                    .setImage(respon.link)
                    .setFooter(
                        `${bot.user.username} | hug`,
                        bot.user.displayAvatarURL()
                    );

                msg.channel.send(embed);
            })
            .catch((err) => console.log(err));
    },
};