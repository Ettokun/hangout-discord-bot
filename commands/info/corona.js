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
    run: async (bot, msg, args) => {
        let message = await msg.channel.send("Tunggu Sebentar..");

        if (args.join(" ") === "country" || args.join(" ") === "country 2") {
            if (!args[1]) {
                const embed = new MessageEmbed()
                    .setColor([0, 50, 255])
                    .setAuthor(
                        "**Ketik** (>corona country 2) Untuk membuka page 2"
                    )
                    .setDescription(
                        `**Berhasil Menadapatkan Nama Wilayah**\n\n**wilayah:**\n\`${dataCountry.join(
                            ", "
                        )}\``
                    )
                    .setFooter(
                        `${bot.user.username} | Corona`,
                        bot.user.displayAvatarURL()
                    );

                message.delete();
                msg.channel.send(embed);
            }
            if (args[1]) {
                const embed = new MessageEmbed()
                    .setColor([0, 50, 255])
                    .setAuthor("(>corona country 2) Untuk membuka page 2")
                    .setDescription(
                        `**Berhasil Menadapatkan Nama Wilayah**\n\n**wilayah:**\n\`${dataCountry2.join(
                            ", "
                        )}\``
                    )
                    .setFooter(
                        `${bot.user.username} | Corona`,
                        bot.user.displayAvatarURL()
                    );

                message.delete();
                msg.channel.send(embed);
            }
            return;
        }

        if (!args.join(" ")) {
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
                        .setDescription("**Hasil Data**")
                        .addField("**Update:**", tanggal)
                        .addField("**kasus:**", `${data.cases} Kasus`, true)
                        .addField(
                            "**Penanganan:**",
                            `${data.recovered} Penanganan`,
                            true
                        )
                        .addField(
                            "**Kematian:**",
                            `${data.deaths} Kematian`,
                            true
                        )
                        .addField(
                            "**Kasus Hari Ini:**",
                            `${data.todayCases} Kasus`,
                            true
                        )
                        .addField(
                            "**Kematian Hari Ini:**",
                            `${data.todayDeaths} Kematian`,
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
                        .setDescription("**Hasil Data Kemaren**")
                        .setThumbnail(data.countryInfo.flag)
                        .addField("**Update:**", tanggal, true)
                        .addField("**Negara:**", `${data.country}`, true)
                        .addField("**Benua:**", `${data.continent}`, true)
                        .addField("**kasus:**", `${data.cases} Kasus`, true)
                        .addField(
                            "**Penanganan:**",
                            `${data.recovered} Penanganan`,
                            true
                        )
                        .addField(
                            "**Kematian:**",
                            `${data.deaths} Kematian`,
                            true
                        )
                        .addField(
                            "**Kasus Hari Ini:**",
                            `${data.todayCases} Kasus`,
                            true
                        )
                        .addField(
                            "**Kematian Hari Ini:**",
                            `${data.todayDeaths} Kematian`,
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
                    msg.channel.send(
                        "ketik (>corona country) Untuk meliat nama daerah"
                    );
                });
        }
    },
};
