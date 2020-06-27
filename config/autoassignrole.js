const { MessageEmbed } = require("discord.js");
const guildSchema = require("../model/guild");

module.exports = async (bot, msg, swtich, prefix) => {
    guildSchema.findOne(
        {
            guildID: msg.guild.id,
        },
        (err, guild) => {
            if (err) console.log(err);

            if (swtich.toLowerCase() === "none") {
                const LevelNotif = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(
                        `**Auto Assign Role** Has Been Update To : ${swtich}\n\nType ${prefix}config autoassignrole [Role Name], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Roles.Auto_Assign_Role = "";

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**Auto Assign Role** Has Been Update To : ${swtich}\n\nType ${prefix}config autoassignrole none, to remove ${swtich} from config`
                );

            const findRole = msg.guild.roles.cache.find(
                (role) =>
                    role.name.toLowerCase() === swtich.toLowerCase() ||
                    `<@&${role.id}>` === swtich
            );

            if (!findRole)
                return msg.channel.send(
                    `Role With Name ${swtich} Is Not Found!`
                );

            guild.configGuild.Roles.Auto_Assign_Role = findChannel.id;

            msg.channel.send(LevelNotif);

            guild.save().catch(console.error);
        }
    );
};
