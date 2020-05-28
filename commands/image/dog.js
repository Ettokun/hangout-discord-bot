const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "dog",
        description: "Bot send dog Image",
        alias: ["dogge", "puppy"],
        category: "image",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        // api https://dog.ceo/api/breeds/image/random
        let message = await msg.channel.send("Loading...");

        fetch("https://dog.ceo/api/breeds/image/random")
            .then((data) => data.json())
            .then((res) => {
                if (!res) {
                    msg.channel();
                    msg.channel.send("try again!");
                    return;
                }
                if (res.status != "success") {
                    msg.delete();
                    msg.channel.send("Something Wrong!");
                    return;
                }

                const embed = new MessageEmbed()
                    .setAuthor(
                        `${bot.user.username}`,
                        bot.user.displayAvatarURL()
                    )
                    .setDescription(`This is it`)
                    .setImage(res.message)
                    .setFooter(
                        `${bot.user.username} | dog`,
                        bot.user.displayAvatarURL()
                    );

                message.delete();
                msg.channel.send(embed);
            });
    },
};
