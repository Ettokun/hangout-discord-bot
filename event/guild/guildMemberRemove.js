const guild = require("../../model/guild.js");
const { customMessage } = require("../../functions");

module.exports = async (bot, member) => {
    guild.findOne(
        {
            guildID: member.guild.id,
        },
        (err, guild) => {
            if (err) console.log(err);

            const {
                Leave_Channel,
                Member_Count_Channel,
            } = guild.configGuild.Channel;
            const { Leave } = guild.configGuild.Custome_Message;

            const channel = member.guild.channels.cache.find(
                (channel) => channel.id === Leave_Channel
            );
            const memberCount = member.guild.channels.cache.find(
                (channel) => channel.id === Member_Count_Channel
            );

            if (channel) {
                channel.send(
                    customMessage(bot, member, Leave, false, member.user.tag)
                );
            }

            if (memberCount) {
                memberCount
                    .setName(`Member Count: ${member.guild.members.cache.size}`)
                    .catch(console.error);
            }
        }
    );
};
