const { readdirSync } = require("fs");

module.exports = (bot) => {
    const load = (dirs) => {
        const commands = readdirSync(`./commands/${dirs}/`).filter((d) =>
            d.endsWith(".js")
        );

        console.log(`${commands} file SUCCESS LOAD`);

        for (let file of commands) {
            const pull = require(`../commands/${dirs}/${file}`);
            bot.commands.set(pull.help.name, pull);
            if (pull.help.alias)
                pull.help.alias.forEach((a) =>
                    bot.alias.set(a, pull.help.name)
                );
        }
    };
    [
        "fun",
        "image",
        "info",
        "levels",
        "miscellaneous",
        "moderator",
        "nsfw",
        "roles",
        "util",
    ].forEach((x) => load(x));
};
