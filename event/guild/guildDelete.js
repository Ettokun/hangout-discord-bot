const prefix = require("../../model/guild.js");

module.exports = async (bot, guild) => {
    const member = guild.members.cache.filter((m) => !m.user.bot).size;

    prefix.findOne(
        {
            guildID: guild.id,
        },
        (err, pref) => {
            if (err) console.log(err);

            prefix
                .deleteOne(
                    {
                        guildID: guild.id,
                    },
                    (error) => {
                        if (error) console.log(error);
                    }
                )
                .catch((err) => console.log(err));
        }
    );
};
