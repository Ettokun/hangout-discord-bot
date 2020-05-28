const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { dataCountry, dataCountry2 } = require("../../country.json");

module.exports = {
    help: {
        name: "corona",
        description: "Menampilkan Status covid-19 diDunia atau diDaerah",
        alias: ["covid", "covid19"],
        category: "info",
        usage: "(Masukan negara) / (ketik country untuk melihat semua negara)",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        let message = await msg.channel.send("Please Wait..");

        if (args.join(" ") === "country") {
            const country = [dataCountry, dataCountry2];
            let page = 1;

            const embed = new MessageEmbed()
                .setColor([0, 50, 255])
                .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
                .setDescription(
                    `**Country:**\n\`${country[page - 1].join(", ")}\``
                )
                .setFooter(
                    `${bot.user.username} | Corona | page ${page} of ${country.length}`,
                    bot.user.displayAvatarURL()
                );

            // :arrow_left: :arrow_right:
            message.delete();
            msg.channel.send(embed).then((m) => {
                m.react("⬅️").then((r) => {
                    m.react("➡️");

                    const backwardsFilter = (react, user) =>
                        react.emoji.name === `⬅️` && user.id === msg.author.id;
                    const forwardsFilter = (react, user) =>
                        react.emoji.name === `➡️` && user.id === msg.author.id;

                    const backwards = m.createReactionCollector(
                        backwardsFilter,
                        { time: 60000 }
                    );
                    const forwards = m.createReactionCollector(forwardsFilter, {
                        time: 60000,
                    });

                    backwards.on("collect", (r) => {
                        if (page === 1) return;
                        page--;
                        embed
                            .setDescription(
                                `**Country:**\n\`${country[page - 1].join(
                                    ", "
                                )}\``
                            )
                            .setFooter(
                                `${bot.user.username} | Corona | page ${page} of ${country.length}`,
                                bot.user.displayAvatarURL()
                            );
                        m.edit(embed);
                    });
                    forwards.on("collect", (r) => {
                        if (page === country.length) return;
                        page++;
                        embed
                            .setDescription(
                                `**Country:**\n\`${country[page - 1].join(
                                    ", "
                                )}\``
                            )
                            .setFooter(
                                `${bot.user.username} | Corona | page ${page} of ${country.length}`,
                                bot.user.displayAvatarURL()
                            );
                        m.edit(embed);
                    });
                });
            });

            return;
        }

        if (!args.join(" ")) {
            // fetch global statistic
            fetch("https://disease.sh/v2/all?yesterday=true")
                .then((res) => res.json())
                .then((data) => {
                    const tahun = new Date(+data.updated);
                    const tanggal = tahun.toDateString();

                    const embed = new MessageEmbed()
                        .setColor([0, 50, 255])
                        .setAuthor(
                            bot.user.username,
                            bot.user.displayAvatarURL()
                        )
                        .setDescription(
                            `**#STAYATHOME**\nType ${prefix}corona [country name]`
                        )
                        .addField(":calendar_spiral:**Update:**", tanggal)
                        .addField(
                            ":bar_chart:**Cases:**",
                            `${data.cases} Cases`,
                            true
                        )
                        .addField(
                            ":head_bandage:**Recovered:**",
                            `${data.recovered} Recovered`,
                            true
                        )
                        .addField(
                            ":skull_crossbones:**Deaths:**",
                            `${data.deaths} Deaths`,
                            true
                        )
                        .addField(
                            ":newspaper:**today Cases:**",
                            `${data.todayCases} Cases`,
                            true
                        )
                        .addField(
                            ":mask:**Today Recovered:**",
                            `${data.active} Recovered`,
                            true
                        )
                        .addField(
                            ":skull:**Today Deaths:**",
                            `${data.todayDeaths} deaths`,
                            true
                        )
                        .setFooter(
                            `${bot.user.username} | Corona`,
                            bot.user.displayAvatarURL()
                        );

                    message.delete();
                    msg.channel.send(embed);
                })
                .catch((err) => {
                    msg.delete();
                    message.delete();
                    msg.channel.send("Request gagal! Mohon Cek Kembali");
                });
        } else {
            // fetch country statistic
            fetch(
                `https://disease.sh/v2/countries/${args.join(
                    " "
                )}?yesterday=true`
            )
                .then((res) => res.json())
                .then((data) => {
                    const tahun = new Date(+data.updated);
                    const tanggal = tahun.toDateString();

                    const embed = new MessageEmbed()
                        .setColor([0, 50, 255])
                        .setAuthor(
                            bot.user.username,
                            bot.user.displayAvatarURL()
                        )
                        .setDescription("**#STAYATHOME**")
                        .setThumbnail(data.countryInfo.flag)
                        .addField(":calendar_spiral:**Update:**", tanggal, true)
                        .addField(":map:**Country:**", `${data.country}`, true)
                        .addField(
                            ":earth_asia:**Continent:**",
                            `${data.continent}`,
                            true
                        )
                        .addField(
                            ":bar_chart:**Cases:**",
                            `${data.cases} Cases`,
                            true
                        )
                        .addField(
                            ":head_bandage:**Recovered:**",
                            `${data.recovered} Recovered`,
                            true
                        )
                        .addField(
                            ":skull_crossbones:**Deaths:**",
                            `${data.deaths} Deaths`,
                            true
                        )
                        .addField(
                            ":newspaper:**today Cases:**",
                            `${data.todayCases} Cases`,
                            true
                        )
                        .addField(
                            ":mask:**Today Recovered:**",
                            `${data.active} Recovered`,
                            true
                        )
                        .addField(
                            ":skull:**Today Deaths:**",
                            `${data.todayDeaths} deaths`,
                            true
                        )
                        .setFooter(
                            `${bot.user.username} | Corona`,
                            bot.user.displayAvatarURL()
                        );

                    message.delete();
                    msg.channel.send(embed);
                })
                .catch((err) => {
                    msg.delete();
                    message.delete();
                    msg.channel.send("Type >corona country To see country");
                });
        }
    },
};
