const { upTimer, customMessage, dateNow } = require("../../functions");
const guildSchema = require("../../model/guild");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "leave",
        description: "See Leave message look like",
        alias: [],
        category: "info",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        guildSchema.findOne(
            {
                guildID: msg.guild.id,
            },
            (err, guild) => {
                if (err) console.log(err);

                const { Leave } = guild.configGuild.Custome_Message;

                const WelcomeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Welcome look like")
                    .setDescription(
                        `**Message:**\n${Leave}\n\n**Result:**\n${customMessage(
                            "welcome",
                            msg,
                            Leave,
                            false
                        )}\n\nType ${prefix}config leave To Set Welcome Message`
                    )
                    .setFooter(`${bot.user.username} | Leave`);

                msg.channel.send(WelcomeEmbed);
            }
        );
    },
};
