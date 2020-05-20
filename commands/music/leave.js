module.exports = {
    help: {
        description: "keluar dari voice channel",
        name: "leave",
        alias: ["exit"],
        category: "music",
        usage: "",
        accessableby: "member"
    },
    run: (bot, msg, args) => {
        msg.member.voice.channel.leave();
        msg.channel.send("Bot telah keluar");
    }
};
