const guild = require("../../model/guild.js");
const { customMessage } = require("../../functions");

module.exports = async (bot, member) => {
    guild.findOne(
        {
            guildID: member.guild.id,
        },
        (err, guild) => {
            if (err) console.log(err);

            const { Auto_Assign_Role } = guild.configGuild.Roles;
            const {
                Welcome_Channel,
                Member_Count_Channel,
            } = guild.configGuild.Channel;
            const { Welcome } = guild.configGuild.Custome_Message;

            const role = member.guild.roles.cache.find(
                (role) => role.id === Auto_Assign_Role
            );
            const channel = member.guild.channels.cache.find(
                (channel) => channel.id === Welcome_Channel
            );
            const memberCount = member.guild.channels.cache.find(
                (channel) => channel.id === Member_Count_Channel
            );

            if (role) {
                member.roles.add(role.id);
            }

            if (channel) {
                channel.send(customMessage(bot, member, Welcome, false));
            }

            if (memberCount) {
                memberCount
                    .setName(`Member Count: ${member.guild.members.cache.size}`)
                    .catch(console.error);
            }
        }
    );
};
