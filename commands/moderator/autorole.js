const guildSchema = require("../../model/guild.js");

module.exports = {
    help: {
        name: "autorole",
        description: "Muted member in Guild",
        alias: [],
        category: "moderator",
        usage: " (on/off) = default is **ON** [role name/mention it]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_ROLES") ||
            !msg.member.hasPermission("MANAGE_SERVER")
        )
            return msg.channel.send(`You Dont Have Permission`);

        const { cache } = msg.guild.roles;
        const role = cache.find(
            (rm) =>
                rm.name.toLowerCase() ===
                    args.slice(1).join(" ").toLowerCase() ||
                `<@&${rm.id}>` === args.slice(1).join(" ")
        );

        if (args[0]) {
            if (args[0].toLowerCase() === "on") {
                if (!role) return msg.channel.send("Roles Not found Broo");

                guildSchema.findOne(
                    {
                        guildName: msg.guild.name,
                        guildID: msg.guild.id,
                    },
                    (err, guild) => {
                        if (err) console.log(err);

                        guild.autoRole.auto = true;
                        guild.autoRole.rolesId = role.id;
                        guild.autoRole.rolesName = role.name;

                        guild.save().catch((err) => console.log(err));
                        msg.channel.send(
                            `AutoRole Status: on\nAutorole Setup Too <@&${role.id}>`
                        );
                    }
                );
            } else if (args[0].toLowerCase() === "off") {
                guildSchema.findOne(
                    {
                        guildName: msg.guild.name,
                        guildID: msg.guild.id,
                    },
                    (err, guild) => {
                        if (err) console.log(err);

                        guild.autoRole.auto = false;

                        guild.save().catch((err) => console.log(err));
                        msg.channel.send(
                            `AutoRole Status: off\nNo more AutoRole`
                        );
                    }
                );
            } else {
                return msg.channel.send(
                    `Type ${prefix}autonick on/off [role name/mention role]`
                );
            }
        }
    },
};
