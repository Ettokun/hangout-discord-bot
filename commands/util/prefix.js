const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const prefix = require("../../model/guild.js");

module.exports = {
    help: {
        name: "prefix",
        description: "Change Bot Prefix",
        alias: "",
        category: "util",
        usage: "[New prefix]",
        accessableby: "Moderator/Admin",
    },

    run: async (bot, msg, args) => {
        const member = msg.guild.members.cache.size;
        let newPrefix;

        if (
            !msg.member.hasPermission("MANAGE_GUILD", {
                checkAdmin: false,
                checkOwner: false,
            })
        )
            return msg.channel
                .send("You Don't Have Permission")
                .then((m) => m.delete({ timeout: 10000 }));

        prefix.findOne(
            {
                guildID: msg.guild.id,
            },
            (err, pref) => {
                if (err) console.log(err);

                newPrefix = pref.configGuild.General.prefix;
                if (!args[0]) {
                    return msg.channel.send(
                        `Bot Prefix: ${newPrefix}\nType \`${newPrefix}prefix [NewPrefix]\``
                    );
                }

                if (args[0] === newPrefix) {
                    return msg.channel.send(`My Prefix Already ${newPrefix}`);
                }

                const embed = new MessageEmbed()
                    .setAuthor(pref.guildName, bot.user.displayAvatarURL())
                    .setThumbnail(msg.guild.iconURL());

                pref.configGuild.General.prefix = args[0];
                pref.member = member;

                embed.setDescription(
                    `Prefix Bot Update To \`${args[0]}\`\n\n**If you Forget, You can mention the bot to see Your guild Prefix**`
                );
                msg.channel.send(embed);

                pref.save().catch((err) => console.log(err));
            }
        );
    },
};
