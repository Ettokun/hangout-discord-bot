const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "reverse",
        description: "Reverse the word or name user",
        alias: "",
        category: "fun",
        usage: "[word / name user]",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const newArgs = args.join(" ");
        if (!newArgs)
            return msg.channel.send(`Type something to want reverse it`);

        const reversedArgs = newArgs.split("").reverse().join("");

        const findMember = msg.guild.members.cache.find(
            (user) => user.name === newArgs || `<@${user.id}>` === newArgs
        );
        const findRole = msg.guild.roles.cache.find(
            (role) => role.name === newArgs || `<@&${role.id}>` === newArgs
        );

        const reversedEmbed = new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setFooter(
                `${bot.user.username} | reversed`,
                bot.user.displayAvatarURL()
            );

        if (!newArgs.startsWith("<@")) {
            reversedEmbed.setDescription(
                `**Before Reverve:**\n\`${newArgs}\`\n\n**Reversed:**\n${reversedArgs}`
            );
            return msg.channel.send(reversedEmbed);
        } else {
            if (newArgs.startsWith("<@&")) {
                reversedEmbed.setDescription(
                    `**Role Name:**\n\`${
                        findRole.name
                    }\`\n\n**Reversed Role:**\n\`${findRole.name
                        .split("")
                        .reverse()
                        .join("")}\``
                );
                return msg.channel.send(reversedEmbed);
            } else {
                reversedEmbed.setDescription(
                    `**Member Name:**\n\`${
                        findMember.user.id
                    }\`\n\n**Reversed Member:**\n\`${findMember.user.username
                        .split("")
                        .reverse()
                        .join("")}\``
                );
                return msg.channel.send(reversedEmbed);
            }
        }
    },
};
