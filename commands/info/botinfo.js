const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "botinfo",
        description: "Give Bot Information",
        alias: ["binfo"],
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        const date = new Date(bot.user.createdAt).toDateString();
        const time = new Date(bot.user.createdAt).toTimeString().slice(0, 8);

        const embed = new MessageEmbed()
            .setAuthor(
                `${bot.user.username}#${bot.user.discriminator}`,
                bot.user.displayAvatarURL()
            )
            .setThumbnail(bot.user.displayAvatarURL())
            .addField(`**Creator**`, "HAVEFUN#8812", true)
            .addField(`**CreateAt**`, `${date} ${time}`, true)
            .addField(`**Server**`, bot.guilds.cache.size, true)
            .addField(`**User**`, bot.users.cache.size, true)
            .addField(`**Libary**`, "discord.js", true)
            .addField(`**Version**`, "1.0.0", true)
            .addField(`**Suport Bot**`, "https://bit.ly/36iwux4", true)
            .addField(`**Suport Server**`, "https://discord.gg/DpKFqV4", true)
            .addField(`**Invite**`, "https://bit.ly/36iwux4", true)
            .setFooter(
                `${bot.user.username} | Bot Info`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(embed);
    },
};
