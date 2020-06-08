const prefix = require("../../model/prefix");

module.exports = async (bot, guild) => {
    const member = guild.members.cache.filter((m) => !m.user.bot).size;

    prefix.findOne(
        {
            guildID: guild.id,
        },
        (err, pref) => {
            if (err) console.log(err);

            if (!pref) {
                const newPrefix = new prefix({
                    guildName: guild.name,
                    guildID: guild.id,
                    prefix: "-",
                    member,
                });

                newPrefix.save().catch((err) => console.log(err));
            }
        }
    );
};
