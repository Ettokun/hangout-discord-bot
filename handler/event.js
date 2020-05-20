const fs = require("fs");

module.exports = bot => {
    const load = dirs => {
        const events = fs
            .readdirSync(`./event/${dirs}/`)
            .filter(d => d.endsWith(".js"));
        for (let file of events) {
            const evnt = require(`../event/${dirs}/${file}`);
            let eName = file.split(".")[0];
            bot.on(eName, evnt.bind(null, bot));
        }
    };
    ["client", "guild"].forEach(x => load(x));
};
