const prefix = require("../../model/guild");

module.exports = async (bot, oldguild, newguild) => {
    const member = newguild.members.cache.filter((m) => !m.user.bot).size;

    prefix.findOne({ guildID: oldguild.id }, (err, pref) => {
        if (err) console.log(err);

        pref.guildName = newguild.name;
        pref.oldGuildName = oldguild.name;
        pref.member = member;

        pref.save().catch((err) => console.log(err));
    });
};
