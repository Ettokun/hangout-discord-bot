const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});
const imgTOKEN = process.env.imgTOKEN;

module.exports = {
    help: {
        name: "meme",
        description: "Bot Send randomly meme image",
        alias: ["memes"],
        category: "image",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const loading = await msg.channel.send(
            `:hourglass_flowing_sand: Loading...!`
        );
        fetch(`https://api.ksoft.si/images/random-meme`, {
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
                    .setTitle(`Image Now Showing? Click Here`)
                    .setURL(data.source)
                    .setDescription(`**${data.title}**`)
                    .setImage(data.image_url)
                    .setFooter(
                        `${bot.user.username} | Meme`,
                        bot.user.displayAvatarURL()
                    );
                loading.delete();
                msg.channel.send(embed);
            })
            .catch((err) => console.log(err));
    },
};
