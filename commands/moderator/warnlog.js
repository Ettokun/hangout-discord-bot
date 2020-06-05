const ChannelWarn = require("../../model/channel.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "warnlog",
        description: "setting warn log channel",
        alias: [],
        category: "moderator",
        usage: "[#channel or name chanel]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_CHANNELS") ||
            !msg.member.hasPermission("MANAGE_GUILD")
        )
            return msg.channel.send(`You Dont Have Permission`);

        ChannelWarn.findOne(
            {
                guildID: msg.guild.id,
                guildName: msg.guild.name,
                ownerID: msg.guild.ownerID,
            },
            (err, channels) => {
                if (err) console.log(err);

                if (!channels) {
                    return msg.channel.send("No one get warn");
                } else {
                    if (channels.warns.length <= 0) {
                        return msg.channel.send(`No One get warn`);
                    } else {
                        const WarnEmbed = new MessageEmbed()
                            .setAuthor(
                                bot.user.username,
                                bot.user.displayAvatarURL()
                            )
                            .setDescription("Warn Info")
                            .addField(
                                `**Warn Member:**`,
                                `${channels.warns
                                    .map(
                                        (us, i) =>
                                            `${i + 1}, \`${us.warnName} [${
                                                us.count
                                            }]\``
                                    )
                                    .join(", ")}`
                            )
                            .setFooter(
                                `${bot.user.username} | Warnlog`,
                                bot.user.displayAvatarURL()
                            );

                        msg.channel
                            .send(WarnEmbed)
                            .catch((err) => console.log(err));
                    }
                }
            }
        );
    },
};
