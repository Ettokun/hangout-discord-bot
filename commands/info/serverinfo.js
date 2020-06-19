const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "serverinfo",
        description: "give Information of Server",
        alias: ["si", "sinfo", "serverin"],
        category: "info",
        usage: "",
        accessableby: "Member",
    },

    run: async (bot, msg, args) => {
        // channel count
        const textCount = msg.guild.channels.cache.filter(
                (channel) => channel.type === "text"
            ).size,
            voiceCount = msg.guild.channels.cache.filter(
                (channel) => channel.type === "voice"
            ).size;

        // member count
        const memberCount = msg.guild.members.cache.filter((m) => !m.user.bot)
            .size;

        // menjumblahkan idle dan online member
        const idleMember = msg.guild.members.cache.filter(
                (m) => m.presence.status === "idle"
            ).size,
            onlineMember = msg.guild.members.cache.filter(
                (m) => m.presence.status === "online"
            ).size,
            onlineCount = parseInt(idleMember) + parseInt(onlineMember);

        // bot count
        const botCount = msg.guild.members.cache.filter((m) => m.user.bot).size;

        // membuat embed
        const embed = new MessageEmbed()
            .setColor([0, 150, 230])
            .setThumbnail(msg.guild.iconURL())
            .setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
            .addField("**Owner**", msg.guild.owner.user.tag, true)
            .addField("**Region**", msg.guild.region, true)
            .addField("**Roles**", msg.guild.roles.cache.size, true)
            .addField("**Emojis**", msg.guild.emojis.cache.size, true)
            .addField("**Text Channel**", textCount, true)
            .addField("**Voice Channel**", voiceCount, true)
            .addField("**Member**", memberCount, true)
            .addField("**Online Member**", onlineCount, true)
            .addField("**Bot**", botCount, true)
            .setFooter(`Server ID: ${msg.guild.id}`, msg.guild.iconURL());

        // mengirim pesan embed
        msg.channel.send({ embed });
    },
};
