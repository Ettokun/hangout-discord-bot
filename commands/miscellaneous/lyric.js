const solenno = require("solenolyrics");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "lyrics",
        description: "Bot will DM you and send The Lyrics of song",
        alias: ["lyric"],
        category: "miscellaneous",
        usage: "(Song Name)",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        let lyric;
        const serverQueue = msg.client.queue.get(msg.guild.id);

        if (serverQueue) {
            lyric = serverQueue.songs[0].title;
            if (args[0]) lyric = args.join(" ");
        } else {
            lyric = args.join(" ");
        }

        let message = await msg.channel.send("Wait...");

        if (!lyric) {
            return message.edit("**Incude Song Title!**");
        } else {
            let lyrics = await solenno
                .requestLyricsFor(lyric)
                .catch((err) => console.log(err));
            const author = await solenno
                .requestAuthorFor(lyric)
                .catch((err) => console.log(err));
            const icon = await solenno
                .requestIconFor(lyric)
                .catch((err) => console.log(err));
            const title = await solenno
                .requestTitleFor(lyric)
                .catch((err) => console.log(err));

            if (lyrics.length >= 2048) {
                const lyrics1 = lyrics.slice(0, 2000);
                const lyrics2 = lyrics.slice(2001);
                const pages = [lyrics1, lyrics2];
                let page = 1;

                const embed = new MessageEmbed()
                    .setColor("#51a0b8")
                    .setTitle(`**${author} - ${title}**`)
                    .setThumbnail(icon)
                    .setDescription(`Lyrics\n${pages[page - 1]}`);

                msg.channel.send(embed).then((m) => {
                    message.delete();
                    m.delete({ timeout: 60000 });
                    m.react("⬅️").then((r) => {
                        m.react("➡️");

                        const backwardsFilter = (react, user) =>
                            react.emoji.name === `⬅️` &&
                            user.id === msg.author.id;
                        const forwardsFilter = (react, user) =>
                            react.emoji.name === `➡️` &&
                            user.id === msg.author.id;

                        const backwards = m.createReactionCollector(
                            backwardsFilter,
                            { time: 60000 }
                        );
                        const forwards = m.createReactionCollector(
                            forwardsFilter,
                            {
                                time: 60000,
                            }
                        );

                        backwards.on("collect", (r) => {
                            if (page === 1) {
                                const user = r.users.cache
                                    .filter((u) => !u.bot)
                                    .map((u) => u.id)[0];

                                r.users.remove(user);
                                return;
                            }
                            if (r.count > 1) {
                                const user = r.users.cache
                                    .filter((u) => !u.bot)
                                    .map((u) => u.id)[0];

                                r.users.remove(user);
                            }
                            page--;
                            embed
                                .setDescription(`Lyrics\n${pages[page - 1]}`)
                                .setFooter(
                                    `${bot.user.username} | lyrics | page ${page} of ${pages.length}`,
                                    bot.user.displayAvatarURL()
                                );
                            m.edit(embed);
                        });
                        forwards.on("collect", (r) => {
                            if (page === pages.length) {
                                const user = r.users.cache
                                    .filter((u) => !u.bot)
                                    .map((u) => u.id)[0];

                                r.users.remove(user);
                                return;
                            }
                            if (r.count > 1) {
                                const user = r.users.cache
                                    .filter((u) => !u.bot)
                                    .map((u) => u.id)[0];

                                r.users.remove(user);
                            }
                            page++;
                            embed
                                .setDescription(`Lyrics\n${pages[page - 1]}`)
                                .setFooter(
                                    `${bot.user.username} | Corona | page ${page} of ${pages.length}`,
                                    bot.user.displayAvatarURL()
                                );
                            m.edit(embed);
                        });
                    });
                });
            }
            if (lyrics.length < 2048) {
                const embed = new MessageEmbed()
                    .setColor("#51a0b8")
                    .setTitle(`**${author} - ${title}**`)
                    .setImage(icon);
                const embed2 = new MessageEmbed().setColor("#51a0b8")
                    .setDescription(`**Lyrics**
                ${lyrics.trimLeft()}`);

                message
                    .edit(`<@${msg.author.id}>, See your Dm!`)
                    .then((message) => message.delete({ timeout: 10000 }));
                msg.author.send(embed);
                msg.author.send(embed2);
            }
        }
    },
};
