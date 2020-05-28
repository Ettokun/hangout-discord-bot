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
        name: "neko",
        description: "Bot Will send neko Image/gif",
        alias: "",
        category: "nsfw",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        if (!msg.channel.nsfw)
            return msg.channel.send(`You must in NSFW Channel`);

        if (cooldown.has(msg.author.id)) {
            return msg.channel
                .send(`Wait 5 sec and try again`)
                .then((msg) => msg.delete({ timeout: 4000 }));
        } else {
            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, 5000);
        }

        fetch(`https://api.ksoft.si/images/random-image?tag=neko`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${imgTOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const embed = new MessageEmbed()
                    .setAuthor(
                        msg.author.username,
                        msg.author.displayAvatarURL()
                    )
                    .setTitle(`Image not Showing? Click Here`)
                    .setURL(data.url)
                    .setImage(data.url)
                    .setFooter(
                        `${bot.user.username} | ${data.tag}`,
                        bot.user.displayAvatarURL()
                    );

                msg.channel.send(embed);
            })
            .catch((err) => console.log(err));
    },
};
