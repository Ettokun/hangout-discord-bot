const guild = require("../../model/prefix.js");

module.exports = async (bot, member) => {
    guild.findOne(
        {
            guildName: member.guild.name,
            guildID: member.guild.id,
        },
        (err, guild) => {
            if (err) console.log(err);

            if (guild.autoRole.auto) {
                const { rolesId, rolesName } = guild.autoRole;
                const ROLE = member.guild.roles.cache.find(
                    (role) =>
                        role.name.toLowerCase() === rolesName.toLowerCase() ||
                        `<@&${role.id}>` === rolesId
                );
                if (!ROLE) {
                    return;
                } else {
                    member.roles.add(ROLE.id).catch((err) => console.log(err));
                }
            }

            if (guild.autoNick.auto) {
                const nickName = guild.autoNick.nickname;
                member
                    .setNickname(`${nickName}`)
                    .catch((err) => console.log(err));
                return;
            }
        }
    );
};
