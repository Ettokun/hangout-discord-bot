const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

let stream;

module.exports = {
    async play(song, message, bot, user) {
        const queue = message.client.queue.get(message.guild.id);
        const { voice } = message.guild.me;

        if (!song) {
            if (voice.selfDeaf) voice.setSelfDeaf(false);

            queue.channel.leave();

            message.client.queue.delete(message.guild.id);
            return queue.textChannel.send("Music End!").catch(console.error);
        }

        try {
            stream = await ytdlDiscord(song.url, {
                highWaterMark: 1 << 25,
            });
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                queue.reqBy.shift();
                module.exports.play(queue.songs[0], message, bot, user);
            }

            if (error.message.includes === "copyright") {
                return message.channel.send("COPYRIGHT CONTENT");
            } else {
                console.error(error);
            }
        }

        const dispatcher = queue.connection
            .play(stream, { type: "opus" })
            .on("finish", () => {
                if (queue.loop) {
                    let lastsong = queue.songs.shift();
                    let lastReq = queue.reqBy.shift();
                    queue.songs.push(lastsong);
                    queue.reqBy.push(lastReq);
                    module.exports.play(queue.songs[0], message, bot, user);
                } else {
                    queue.songs.shift();
                    queue.reqBy.shift();
                    module.exports.play(queue.songs[0], message, bot, user);
                }
            })
            .on("error", console.error);
        dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME

        const musicEmbed = new MessageEmbed()
            .setColor([120, 0, 0])
            .setAuthor(`Playing Music:`);

        musicEmbed
            .setTitle(`${queue.songs[0].title}`)
            .setURL(queue.songs[0].url)
            .setDescription(
                `\n\n**Author:** ${queue.songs[0].author}\n**Likes:** ${
                    queue.songs[0].likes
                }\n**Duration:** ${ms(queue.songs[0].duration)}\n**ReqBy:** <@${
                    queue.reqBy[0].userID
                }>`
            )
            .setFooter(
                `${bot.user.username || bot.user.tag}`,
                bot.user.displayAvatarURL()
            );

        message.channel.send(musicEmbed);
    },
};
