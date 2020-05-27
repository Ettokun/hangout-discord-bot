const levelSchema = require("../../model/level.js");

module.exports = async (bot, oldMember, newMember) => {
    levelSchema.findOne(
        {
            userid: oldMember.id,
        },
        (err, level) => {
            if (err) console.log(err);

            level.username = newMember.username;
            level.oldUsername = oldMember.username;
            level.avatar = `https://cdn.discordapp.com/avatars/${newMember.id}/${newMember.avatar}`;

            level.save().catch((err) => console.log(err));
        }
    );
};
