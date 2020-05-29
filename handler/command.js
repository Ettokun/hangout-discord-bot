const { readdirSync } = require("fs");

module.exports = (bot) => {
    const load = (dirs) => {
        const commands = readdirSync(`./commands/${dirs}/`).filter((d) =>
            d.endsWith(".js")
        );
        for (let file of commands) {
            const pull = require(`../commands/${dirs}/${file}`);
            console.log(`${file} SUCCESS LOAD`);
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
        "misc",
        "moderator",
        "nsfw",
        "roles",
    ].forEach((x) => load(x));
};
