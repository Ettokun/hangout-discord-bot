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
                        `**Level Notification Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config levelnotificationchannel [Channel Name], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Channel.level_Notification_Channel = "";

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**Level Notification Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config levelnotificationchannel none, to remove ${swtich} from config`
                );

            const findChannel = msg.guild.channels.cache.find(
                (channel) =>
                    `<#${channel.id}>` === swtich ||
                    channel.name.toLowerCase() === swtich.toLowerCase()
            );

            if (!findChannel)
                return msg.channel.send(
                    `Channel With Name ${swtich} Is Not Found!`
                );

            guild.configGuild.Channel.level_Notification_Channel =
                findChannel.id;
            msg.channel.send(LevelNotif);
            guild.save().catch(console.error);
        }
    );
};
