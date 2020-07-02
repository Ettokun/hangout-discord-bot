const level = require("./model/level");
const prettyms = require("pretty-ms");

module.exports = {
    getMember(msg, toFind = "") {
        toFind = toFind.toLowerCase();

        let target = msg.guild.members.cache.get(toFind);

        if (!target && msg.mentions.members) {
            target = msg.mentions.members.first();
        }
        if (!target && toFind) {
            target = msg.guild.members.cache.find((member) => {
                return (
                    member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
                );
            });
        }
        if (!target) target = msg.member;

        return target;
    },

    upTimer: (ms, sort = true) => {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

        if (sort) {
            return `${day.padStart(1, "0")} Days, ${hrs.padStart(
                2,
                "0"
            )} Hours, ${min.padStart(2, "0")} Minutes, ${sec.padStart(
                2,
                "0"
            )} Seconds`;
        } else {
            return `${day.padStart(1, "0")}d ${hrs.padStart(
                2,
                "0"
            )}h ${min.padStart(2, "0")}m ${sec.padStart(2, "0")}s`;
        }
    },

    customMessage: (bot, msg, custom, lvlgui, levels) => {
        if (typeof lvlgui != "boolean") throw `Data Harus boolean`;

        const customMsg = {
            user: "@user",
            membertag: "@membertag",
            levelup: "@levelup",
            guild: "@guild",
            membercount: "@membercount",
            guildowner: "@guildowner",
        };
        let message;
        let {
            user,
            levelup,
            guild,
            membercount,
            guildowner,
            membertag,
        } = customMsg;

        /**
         * if true = level
         * if false = guild
         */

        if (lvlgui) {
            message = custom
                .replace(user, `<@${msg.user.id}>`)
                .replace(levelup, `${levels}`);
        } else {
            if (bot === "welcome") {
                message = custom
                    .replace(user, `<@${msg.author.id}>`)
                    .replace(guild, `**${msg.guild.name}**`)
                    .replace(membertag, `**${msg.author.tag}**`)
                    .replace(membercount, `${msg.guild.members.cache.size}`)
                    .replace(guildowner, `**${msg.guild.owner.user.tag}**`);
            } else {
                message = custom
                    .replace(user, `<@${msg.id}>`)
                    .replace(guild, `**${msg.guild.name}**`)
                    .replace(membercount, `${msg.guild.members.cache.size}`)
                    .replace(membertag, `**${levels}**`)
                    .replace(guildowner, `**${msg.guild.owner.user.tag}**`);
            }
        }

        return message;
    },
};
