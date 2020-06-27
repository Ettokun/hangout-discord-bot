const prefix = require("../../model/guild.js");

module.exports = async (bot, guild) => {
    const member = guild.members.cache.size;

    prefix.findOne(
        {
            guildID: guild.id,
        },
        (err, pref) => {
            if (err) console.log(err);

            if (!pref) {
                const newPrefix = new prefix({
                    guildName: guild.name,
                    oldGuildName: guild.name,
                    guildID: guild.id,
                    member,
                    configGuild: {
                        Custome_Message: {
                            level_Up: "@user Level Up To @levelup",
                            Welcome:
                                "@user Joined!, Welcome To @guild Now We Have @membercount Member",
                            Leave:
                                "@user Leave!, Bye Bye Now We have @membercount Member",
                        },

                        Channel: {
                            level_Notification_Channel: "",
                            Member_Count_Channel: "",
                            Welcome_Channel: "",
                            Leave_Channel: "",
                            Mod_log_Channel: "",
                        },

                        General: {
                            prefix: "-",
                            leveling_System: true,
                        },

                        Roles: {
                            Administrator_Role: "",
                            Moderator_Role: "",
                            Auto_Assign_Role: "",
                        },
                    },
                });

                newPrefix.save().catch((err) => console.log(err));
            }
        }
    );
};
