const { upTimer, customMessage, dateNow } = require("../../functions");
const guildSchema = require("../../model/guild");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "welcome",
        description: "See Welcome look like",
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

                const { Welcome } = guild.configGuild.Custome_Message;

                const WelcomeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Welcome look like")
                    .setDescription(
                        `**Message:**\n${Welcome}\n\n**Result:**\n${customMessage(
                            "welcome",
                            msg,
                            Welcome,
                            false
                        )}\n\nType ${prefix}config welcome To Set Welcome Message`
                    )
                    .setFooter(
                        `${bot.user.username} | Welcome | Today At ${dateNow(
                            msg,
                            false
                        )}`
                    );

                msg.channel.send(WelcomeEmbed);
            }
        );
    },
};
