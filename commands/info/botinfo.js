const { MessageEmbed } = require("discord.js");
const { dateNow, upTimer } = require("../../functions");
const { ownerId } = require("../../utility.json");

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
        const server = await bot.shard.fetchClientValues("guilds.cache.size");
        const member = await bot.shard.broadcastEval(
            "this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)"
        );
        const channel = await bot.shard.broadcastEval(
            "this.channels.cache.size"
        );

        const create = new Date(bot.user.createdAt);

        const date = create.toDateString();
        const time = create.toLocaleTimeString();

        const owner =
            msg.guild.ownerID === ownerId
                ? `${msg.guild.owner.user.tag}`
                : "HAVEFUN#8812";

        const embed = new MessageEmbed()
            .setAuthor(
                `${bot.user.username}#${bot.user.discriminator}`,
                bot.user.displayAvatarURL()
            )
            .setThumbnail(bot.user.displayAvatarURL())
            .addField(`**Creator**`, `${owner}`, true)
            .addField(`**CreatedAt**`, `${date} ${time}`, true)
            .addField(
                `**Server**`,
                server.reduce((a, b) => a + b, 0),
                true
            )
            .addField(
                `**Channel**`,
                channel.reduce((a, b) => a + b, 0),
                true
            )
            .addField(
                `**User**`,
                member.reduce((a, b) => a + b, 0),
                true
            )
            .addField(`**Uptime**`, `${upTimer(bot.uptime, false)}`, true)
            .addField(`**Library**`, "discord.js", true)
            .addField(`**Version**`, "2.0.0", true)
            .addField(
                `**Suport Bot**`,
                `[VOTE](https://top.gg/bot/703427669605351434/vote)`
            )
            .addField(
                `**Suport Server**`,
                `[SUPORT SERVER](https://discord.gg/DpKFqV4)`
            )
            .addField(`**Invite**`, `[INVITE](https://bit.ly/2zattmq)`)
            .setFooter(
                `${bot.user.username} | Bot Info`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(embed);
    },
};
