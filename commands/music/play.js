const ytdl = require("ytdl-core");
const opus = require("opusscript");
let servers = {};

module.exports = {
    help: {
        name: "play",
        description: "Playing Music",
        alias: ["p", "music"],
        category: "music",
        usage: "[Masukan Link]",
        accessableby: "member"
    },
    run: async (bot, msg, args) => {
        const play = (connection, msg) => {
            let server = servers[msg.guild.id];
            server.dispatcher = connection.play(
                ytdl(server.queue[0], { filter: "audioonly" })
            );

            server.queue.shift();
            server.dispatcher.on("end", () => {
                if (server.queue[0]) {
                    play(connection, msg);
                } else {
                    connection.disconnect();
                }
            });
        };

        if (!args[0]) return msg.channel.send("Masukan link valid");

        if (!msg.member.voice.channel)
            return msg.channel.send(
                "Kamu Perlu Masuk Voice Channel Sebelum Memulai Music"
            );

        if (!servers[msg.guild.id])
            servers[msg.guild.id] = {
                queue: []
            };

        let server = servers[msg.guild.id];
        server.queue.push(args[0]);

        if (!msg.guild.voiceConnection)
            msg.member.voice.channel.join().then(connection => {
                play(connection, msg);
            });

        // checking jika member di voice channel
        // if (msg.member.voice.channel) {
        //     if (args[0]) {
        //         msg.member.voice.channel.join().then(connection => {
        //             const dispatcher = connection.play(ytdl(`${args[0]}`, {filter: 'audioonly'}));
        //             console.log(dispatcher);
        //         });
        //         msg.channel.send("berhasil memutar " + args.join(' '));
        //     } else {
        //         msg.channel.send("masukan link");
        //     }
        // } else {
        //     msg.channel.send("Kamu Perlu Memasuki Voice Channel");
        // }
    }
};
