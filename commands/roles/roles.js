const { MessageEmbed } = require("discord.js");
module.exports = {
    help: {
        name: "roles",
        description: "Showing all roles in guild",
        alias: [],
        category: "roles",
        usage: "",
        accessableby: "member",
    },
    run: async (bot, msg, args, prefix) => {
        const role = msg.guild.roles.cache
            .map((roles) => roles.name)
            .sort()
            .join(", ");
        const RoleEmbed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setDescription(`All Role in ${msg.guild.name}:\n\`${role}\``)
            .setFooter(
                `${bot.user.username} | roles`,
                bot.user.displayAvatarURL()
            );

        msg.channel.send(RoleEmbed);
    },
};
