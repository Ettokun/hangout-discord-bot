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
        name: "nsfw",
        description: "Bot mengirim Gambar/gif NSFW",
        alias: "",
        category: "nsfw",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        if (!msg.channel.nsfw)
            return msg.channel.send(`Kamu Harus Berada di NSFW Channel`);

        if (cooldown.has(msg.author.id)) {
            return msg.channel
                .send(`Tunggu selama 3 detik untuk menggunakan comment`)
                .then((msg) => msg.delete({ timeout: 2000 }));
        } else {
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, 3000);
        }
        const gifs = [true, false];

        fetch(
            `https://api.ksoft.si/images/random-nsfw?gifs=${
                gifs[Math.floor(Math.random() * gifs.length)]
            }`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${imgTOKEN}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                const embed = new MessageEmbed()
                    .setAuthor(
                        msg.author.username,
                        msg.author.displayAvatarURL()
                    )
                    .setTitle(`Jika Gambar tidak Muncul Click disini`)
                    .setURL(data.source)
                    .setImage(data.image_url)
                    .setFooter(
                        `${bot.user.username} | NSFW`,
                        bot.user.displayAvatarURL()
                    );

                msg.channel.send(embed);
            })
            .catch((err) => console.log(err));
    },
};
