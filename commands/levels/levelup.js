const { upTimer, customMessage, dateNow } = require("../../functions");
const guildSchema = require("../../model/guild");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "levelup",
        description: "See level up message look like",
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

                const member = msg.guild.members.cache.find(
                    (x) => x.id === msg.author.id
                );

                const { level_Up } = guild.configGuild.Custome_Message;

                const WelcomeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Welcome look like")
                    .setDescription(
                        `**Message:**\n${level_Up}\n\n**Result:**\n${customMessage(
                            "welcome",
                            member,
                            level_Up,
                            true,
                            Math.floor(Math.random() * 10) + 1
                        )}\n\nType ${prefix}config levelup To Set level up Message`
                    )
                    .setFooter(`${bot.user.username} | Levelup`);

                msg.channel.send(WelcomeEmbed);
            }
        );
    },
};
