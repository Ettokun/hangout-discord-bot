const solenno = require("solenolyrics");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "lyric",
        description: "Bot akan mengirim lyric melalui DM",
        alias: ["lyrics"],
        category: "misc",
        usage: "[Nama lagunya]",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        const lyric = args.join(" ");

        let message = await msg.channel.send("Wait...");

        if (!lyric) {
            message.delete();
            msg.channel.send("**Masukan judul lagu!**");
            return;
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

                const embed = new MessageEmbed()
                    .setColor("#51a0b8")
                    .setTitle(`**${author} - ${title}**`)
                    .setImage(icon);
                const embed2 = new MessageEmbed().setColor("#51a0b8")
                    .setDescription(`**Lyrics**
                ${lyrics1.trimLeft()}`);
                const embed3 = new MessageEmbed().setColor("#51a0b8")
                    .setDescription(`**Lyrics**
                ${lyrics2.trimLeft()}`);

                message
                    .edit(`<@${msg.author.id}> Cek Dm kamu`)
                    .then((message) => message.delete({ timeout: 30000 }));

                msg.author.send(embed);
                msg.author.send(embed2);
                msg.author.send(embed3);
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
                    .edit(`<@${msg.author.id}> Cek Dm kamu`)
                    .then((message) => message.delete({ timeout: 10000 }));
                msg.author.send(embed);
                msg.author.send(embed2);
            }
        }
    },
};
