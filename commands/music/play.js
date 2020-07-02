const { Util, MessageEmbed } = require("discord.js");
require("dotenv").config();

const ytdl = require("ytdl-core");
const YTAPICORE = process.env.YTAPICORE;
const YTAPISEC = process.env.YTAPISEC;
const YoutubeAPI = require("simple-youtube-api");
let youtube = new YoutubeAPI(YTAPICORE);
const { play } = require("../../system/music");

module.exports = {
    help: {
        name: "play",
        discription: "Playing a Music",
        alias: ["p"],
        category: "music",
        usage: "[Title or the URL]",
        accessableby: "member",
    },
    run: async (bot, message, args, prefix) => {
        if (!args.length) {
            // if no url or title of song
            return message.channel.send(
                `Type ${prefix}play [Url or Title Song]`
            );
        }

        const { channel } = message.member.voice;
        const { voice } = message.guild.me;

        if (!channel) {
            // no member in Voice
            return message.channel.send("**You're Not In a Voice Channel!**");
        }

        const targetsong = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        const playlistPattern = /^.*(youtube\.com\/|list=)([^#\&\?]*).*/;
        const urlcheck = videoPattern.test(args[0]);

        if (playlistPattern.test(args[0])) {
            return message.channel.send("Can't Not Playing PLAYLIST!");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true,
            reqBy: [],
        };

        let songData = null;
        let song = null;
        let author = null;

        if (urlcheck) {
            // ketika memutar lagu tidak menggunakan link
            try {
                songData = await ytdl
                    .getInfo(args[0])
                    .catch((err) => console.log(err));

                song = {
                    title: songData.title,
                    url: songData.video_url,
                    duration: songData.length_seconds,
                    author: songData.author.name || songData.author.user,
                    likes: songData.likes,
                };

                author = {
                    userID: message.author.id,
                    UserName: message.author.username,
                };
            } catch (error) {
                if (error.message.include === "copyright") {
                    return message
                        .reply("COPYRIGHT CONTENT IN VIDEO")
                        .catch(console.error);
                } else {
                    console.error(error);
                }
            }
        } else {
            try {
                // if api 1 not get limit
                const result = await youtube
                    .searchVideos(targetsong, 1)
                    .catch((err) => console.log(err));

                songData = await ytdl
                    .getInfo(result[0].url)
                    .catch((err) => console.log(err));

                song = {
                    title: songData.title,
                    url: songData.video_url,
                    duration: songData.length_seconds,
                    author: songData.author.name || songData.author.user,
                    likes: songData.likes,
                };

                author = {
                    userID: message.author.id,
                    UserName: message.author.username,
                };
            } catch (error) {
                // if api 1 get limit
                console.error(error.message);

                youtube = new YoutubeAPI(YTAPISEC);

                try {
                    const result = await youtube
                        .search(targetsong)
                        .catch((err) => console.log(err));

                    songData = await ytdl
                        .getInfo(result[0].url)
                        .catch((err) => console.log(err));

                    song = {
                        title: songData.title,
                        url: songData.video_url,
                        duration: songData.length_seconds,
                        author: songData.author.name || songData.author.user,
                        likes: songData.likes,
                    };

                    author = {
                        userID: message.author.id,
                        UserName: message.author.username,
                    };
                } catch (error) {
                    console.error(error);
                }
            }
        }

        // adding queue
        if (serverQueue) {
            const queueEmbed = new MessageEmbed()
                .setColor([120, 0, 0])
                .setAuthor(`**Added to playlist:**`);

            queueEmbed
                .setTitle(`${song.title}`)
                .setURL(song.url)
                .setDescription(
                    `\n\n**Author:** ${song.author}\n**Likes:** ${song.likes}\n**ReqBy:** <@${message.author.id}>`
                )
                .setFooter(
                    `${bot.user.username || bot.user.tag}`,
                    bot.user.displayAvatarURL()
                );

            serverQueue.songs.push(song);
            serverQueue.reqBy.push(author);

            return serverQueue.textChannel
                .send(queueEmbed)
                .catch(console.error);
        } else {
            queueConstruct.songs.push(song);
            queueConstruct.reqBy.push(author);
        }

        if (!serverQueue)
            message.client.queue.set(message.guild.id, queueConstruct);

        if (!serverQueue) {
            try {
                queueConstruct.connection = await channel.join();
                if (!voice.selfDeaf) voice.setSelfDeaf(true);

                play(
                    queueConstruct.songs[0],
                    message,
                    bot,
                    queueConstruct.reqBy[0]
                );
            } catch (error) {
                console.error(`Can't Join voice channel: ${error}`);
                message.client.queue.delete(message.guild.id);

                await channel.leave();

                return message.channel
                    .send({
                        embed: {
                            description: `😭 | Can't Join voice channel: ${error}`,
                            color: "#ff2050",
                        },
                    })
                    .catch(console.error);
            }
        }
    },
};
