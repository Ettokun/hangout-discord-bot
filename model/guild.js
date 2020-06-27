const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
    guildName: String,
    oldGuildName: String,
    guildID: String,
    prefix: String,
    member: Number,
    configGuild: {
        Custome_Message: {
            level_Up: String,
            Welcome: String,
            Leave: String,
        },

        Channel: {
            level_Notification_Channel: String,
            Member_Count_Channel: String,
            Welcome_Channel: String,
            Leave_Channel: String,
            Mod_log_Channel: String,
        },

        General: {
            prefix: String,
            leveling_System: Boolean,
        },

        Roles: {
            Auto_Assign_Role: String,
        },
    },
});
/**
 * {
                            name: "Custom Message",
                            setting: {
                                level_Up: String,
                                Welcome: String,
                            },
                        },
                        {
                            name: "Channel",
                            setting: {
                                level_Notification: String,
                                Member_Count: String,
                                Welcome: String,
                                Mod_log: String,
                            },
                        },
                        {
                            name: "General",
                            setting: {
                                prefix: "<",
                                leveling_System: true,
                            },
                        },
                        {
                            // role
                            name: "Roles",
                            setting: {
                                Administrator: String,
                                Moderator: String,
                                Auto_Assign: String,
                            },
                        },
 */

module.exports = mongoose.model("guildPrefix", PrefixSchema);
