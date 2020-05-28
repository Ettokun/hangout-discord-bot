const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    help: {
        name: "avatar",
        description: "Showing Your avatar Or another member",
        alias: ["profile"],
        category: "misc",
        usage: "(mention member)",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const member = getMember(msg, args.join(" "));

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(
                `${member.nickname || member.user.username}#${
                    member.user.discriminator
                }`,
                member.user.avatarURL()
            )
            .setDescription(`**${member.nickname || member.user.username}**`)
            .setImage(member.user.avatarURL());
        msg.channel.send(embed);
    },
};
