const { MessageEmbed } = require("discord.js");
const guildSchema = require("../model/guild");
const ChannelWarn = require("../model/channel");

module.exports = async (bot, msg, swtich, prefix) => {
    guildSchema.findOne(
        {
            guildID: msg.guild.id,
        },
        async (err, guild) => {
            if (err) console.log(err);

            const findChannel = msg.guild.channels.cache.find(
                (channel) =>
                    channel.name.toLowerCase() === swtich.toLowerCase() ||
                    `<#${channel.id}>` === swtich
            );

            if (swtich.toLowerCase() === "none") {
                const LevelNotif = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(
                        `**Mod Log Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config modlogchannel [Channel Name], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Channel.Mod_log_Channel = "";

                ChannelWarn.findOne(
                    {
                        guildID: msg.guild.id,
                        ownerID: msg.guild.ownerID,
                    },
                    async (err, channels) => {
                        if (err) console.log(err);

                        if (!channels) {
                            const newChannels = new ChannelWarn({
                                guildID: msg.guild.id,
                                guildName: msg.guild.name,
                                ownerID: msg.guild.ownerID,
                                ownerName: msg.guild.owner.user.username,
                                channels: {
                                    warnChannel: "",
                                    warnChannelID: "",
                                },
                                warns: [],
                                maxWarn: 5,
                                ban: false,
                                kick: false,
                                mute: false,
                            });

                            await newChannels
                                .save()
                                .catch((err) => console.log(err));
                        } else {
                            channels.channels.warnChannel = "";
                            channels.channels.warnChannelID = "";

                            await channels
                                .save()
                                .catch((err) => console.log(err));
                        }
                    }
                );

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**Mod Log Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config modlogchannel none, to remove ${swtich} from config`
                );

            if (!findChannel)
                return msg.channel.send(
                    `Channel With Name ${swtich} Is Not Found!`
                );

            try {
                const executed = require("../commands/moderator/warnconfig");
                executed.run(
                    bot,
                    msg,
                    [`channelss`, `<#${findChannel.id}>`],
                    prefix
                );
                guild.configGuild.Channel.Mod_log_Channel = findChannel.id;
                msg.channel.send(LevelNotif);
            } catch (error) {
                console.log(err);
                guild.configGuild.Channel.Mod_log_Channel = "";
            }

            guild.save().catch(console.error);
        }
    );
};
