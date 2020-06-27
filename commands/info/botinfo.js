const { MessageEmbed } = require("discord.js");
const { dateNow, upTimer } = require("../../functions");

module.exports = {
    help: {
        name: "botinfo",
        description: "Give Bot Information",
        alias: ["binfo", "stats"],
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        const create = new Date(bot.user.createdAt);

        const date = create.toDateString();
        const time = create.toLocaleTimeString();

        const owner =
            msg.guild.ownerID === "348651859646349316"
                ? `${msg.guild.owner.user.tag}`
                : "HAVEFUN#8812";

        const embed = new MessageEmbed()
            .setAuthor(
                `${bot.user.username}#${bot.user.discriminator}`,
                bot.user.displayAvatarURL()
            )
            .setThumbnail(bot.user.displayAvatarURL())
            .addField(`**Creator**`, `${owner}`, true)
            .addField(`**CreateAt**`, `${date} ${time}`, true)
            .addField(`**Server**`, bot.guilds.cache.size, true)
            .addField(`**User**`, bot.users.cache.size, true)
            .addField(`**Uptime**`, `${upTimer(bot.uptime, false)}`, true)
            .addField(`**Library**`, "discord.js", true)
            .addField(`**Version**`, "2.0.0", true)
            .addField(
                `**Suport Bot**`,
                `[VOTE](https://top.gg/bot/703427669605351434/vote)\n[DONATE](https://donatebot.io/checkout/581790531097722880)`,
                true
            )
            .addField(
                `**Suport Server**`,
                `[SUPORT SERVER](https://discord.gg/DpKFqV4)`,
                true
            )
            .addField(`**Invite**`, `[INVITE](https://bit.ly/2zattmq)`, true)
            .setFooter(
                `${bot.user.username} | Bot Info | Today At ${dateNow(
                    msg,
                    false
                )}`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(embed);
    },
};
