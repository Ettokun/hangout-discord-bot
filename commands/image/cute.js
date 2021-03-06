const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { config } = require("dotenv");

const cooldown = new Set();
config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});
const imgTOKEN = process.env.imgTOKEN;

module.exports = {
    help: {
        name: "cute",
        description: "Bot send cute Image/gif",
        alias: ["cutes"],
        category: "image",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        if (cooldown.has(msg.author.id)) {
            return msg.channel
                .send(`Tunggu selama 5 detik untuk menggunakan comment`)
                .then((msg) => msg.delete({ timeout: 4000 }));
        } else {
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, 5000);
        }

        fetch(`https://api.ksoft.si/images/random-aww`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${imgTOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const embed = new MessageEmbed()
                    .setAuthor(
                        msg.author.username,
                        msg.author.displayAvatarURL()
                    )
                    .setTitle(`Image Not Found? Click Here`)
                    .setURL(data.source)
                    .setDescription(`You Cute too :kissing_heart:`)
                    .setImage(data.image_url)
                    .setFooter(
                        `${bot.user.username} | Cute`,
                        bot.user.displayAvatarURL()
                    );

                msg.channel.send(embed);
            })
            .catch((err) => console.log(err));
    },
};
