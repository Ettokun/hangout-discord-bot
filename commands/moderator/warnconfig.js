const ChannelWarn = require("../../model/channel.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "warnconfig",
        description: "Setup Warn",
        alias: [],
        category: "moderator",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_CHANNELS") ||
            !msg.member.hasPermission("MANAGE_GUILD")
        )
            return msg.channel.send(`You Dont Have Permission`);

        const filter = (m) => m.author.id === msg.author.id;
        const configEmbed = new MessageEmbed()
            .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
            .setColor("RANDOM")
            .setFooter(
                `${bot.user.username} | warnconfig`,
                bot.user.displayAvatarURL()
            );

        if (!args[0]) {
            configEmbed.setDescription(
                `type ${prefix}warnconfig channel [#channelname] to set warn channel\n\ntype ${prefix}warnconfig maxwarn [number] to set MaxWarn\n\ntype ${prefix}warnconfig punish [ban | kick | mute] to set warn punishment\n`
            );
            msg.channel.send(configEmbed);
        } else {
            // set channel start
            if (args[0].toLowerCase() === "channel") {
                const findChannel = msg.guild.channels.cache.find(
                    (channel) => `<#${channel.id}>` === args.join(" ").slice(8)
                );

                if (!findChannel) {
                    return msg.channel.send(
                        `${args.join(" ").slice(7)} this channel is not found`
                    );
                } else {
                    ChannelWarn.findOne(
                        {
                            guildID: msg.guild.id,
                            guildName: msg.guild.name,
                            ownerID: msg.guild.ownerID,
                        },
                        (err, channels) => {
                            if (err) console.log(err);

                            if (!channels) {
                                const newChannels = new ChannelWarn({
                                    guildID: msg.guild.id,
                                    guildName: msg.guild.name,
                                    ownerID: msg.guild.ownerID,
                                    ownerName: msg.guild.owner.user.username,
                                    channels: {
                                        warnChannel: findChannel.name,
                                        warnChannelID: findChannel.id,
                                    },
                                    warns: [],
                                    maxWarn: 5,
                                    ban: false,
                                    kick: false,
                                    mute: false,
                                });

                                newChannels
                                    .save()
                                    .catch((err) => console.log(err));
                                return msg.channel.send(
                                    `Warn Channel set to ${findChannel.name}`
                                );
                            } else {
                                channels.channels.warnChannel =
                                    findChannel.name;
                                channels.channels.warnChannelID =
                                    findChannel.id;

                                channels
                                    .save()
                                    .catch((err) => console.log(err));
                                return msg.channel.send(
                                    `Warn Channel set to ${findChannel.name}`
                                );
                            }
                        }
                    );
                }
                // end set channel
            }
            // maxwarn set start
            if (args[0].toLowerCase() === "maxwarn") {
                ChannelWarn.findOne(
                    {
                        guildID: msg.guild.id,
                        guildName: msg.guild.name,
                        ownerID: msg.guild.ownerID,
                    },
                    (err, channels) => {
                        if (err) console.log(err);

                        if (!channels) {
                            const newChannels = new ChannelWarn({
                                guildID: msg.guild.id,
                                guildName: msg.guild.name,
                                ownerID: msg.guild.ownerID,
                                ownerName: msg.guild.owner.user.username,
                                channels: {
                                    warnChannel: findChannel.name,
                                    warnChannelID: findChannel.id,
                                },
                                warns: [],
                                maxWarn: parseInt(args.join(" ").slice(8)),
                                ban: false,
                                kick: false,
                                mute: false,
                            });

                            newChannels.save().catch((err) => console.log(err));
                            return msg.channel.send(
                                `Warn Channel set to ${findChannel.name}`
                            );
                        } else {
                            channels.maxWarn = parseInt(
                                args.join(" ").slice(8)
                            );

                            channels.save().catch((err) => console.log(err));
                            return msg.channel.send(
                                `MaxWarn set to ${args.join(" ").slice(8)}`
                            );
                        }
                    }
                );
            }
            // maxwarn set end

            // set punishment start
            if (args[0].toLowerCase() === "punish") {
                if (
                    !args.join(" ").slice(7) === "ban" ||
                    !args.join(" ").slice(7) === "kick" ||
                    !args.join(" ").slice(7) === "mute"
                )
                    return msg.channel.send(`Must Include mute, kick, or ban`);
                ChannelWarn.findOne(
                    {
                        guildID: msg.guild.id,
                        guildName: msg.guild.name,
                        ownerID: msg.guild.ownerID,
                    },
                    (err, channels) => {
                        if (err) console.log(err);

                        if (!channels) {
                            const newChannels = new ChannelWarn({
                                guildID: msg.guild.id,
                                guildName: msg.guild.name,
                                ownerID: msg.guild.ownerID,
                                ownerName: msg.guild.owner.user.username,
                                channels: {
                                    warnChannel: findChannel.name,
                                    warnChannelID: findChannel.id,
                                },
                                warns: [],
                                maxWarn: 5,
                                ban:
                                    args.join(" ").slice(7) === "ban"
                                        ? true
                                        : false,
                                kick:
                                    args.join(" ").slice(7) === "kick"
                                        ? true
                                        : false,
                                mute:
                                    args.join(" ").slice(7) === "mute"
                                        ? true
                                        : false,
                            });

                            newChannels.save().catch((err) => console.log(err));
                            return msg.channel.send(
                                `Warn Channel set to ${findChannel.name}`
                            );
                        } else {
                            if (args.join(" ").slice(7) === "ban") {
                                channels.ban = true;
                                channels.kick = false;
                                channels.mute = false;
                            } else if (args.join(" ").slice(7) === "kick") {
                                channels.ban = false;
                                channels.kick = true;
                                channels.mute = false;
                            } else if (args.join(" ").slice(7) === "mute") {
                                channels.ban = false;
                                channels.kick = false;
                                channels.mute = true;
                            }

                            channels.save().catch((err) => console.log(err));
                            return msg.channel.send(
                                `MaxWarn set to ${args.join(" ").slice(7)}`
                            );
                        }
                    }
                );
            }
            // set punishment end
        }
    },
};
