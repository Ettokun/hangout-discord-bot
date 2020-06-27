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
                        `**Leave Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config leavechannel [Channel Name], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Channel.Leave_Channel = "";

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**Leave Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config leavechannel none, to remove ${swtich} from config`
                );

            const findChannel = msg.guild.channels.cache.find(
                (channel) =>
                    channel.name.toLowerCase() === swtich.toLowerCase() ||
                    `<#${channel.id}>` === swtich
            );

            if (!findChannel)
                return msg.channel.send(
                    `Channel With Name ${swtich} Is Not Found!`
                );

            guild.configGuild.Channel.Leave_Channel = findChannel.id;
            if (guild.configGuild.Channel.Welcome_Channel.length <= 0) {
                guild.configGuild.Channel.Welcome_Channel = findChannel.id;
            }

            msg.channel.send(LevelNotif);

            guild.save().catch(console.error);
        }
    );
};
