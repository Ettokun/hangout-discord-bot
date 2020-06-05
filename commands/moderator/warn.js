const ChannelWarn = require("../../model/channel.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    help: {
        name: "warn",
        description: "warn a member",
        alias: [],
        category: "moderator",
        usage: "[User] (Reason)",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        if (
            !msg.member.hasPermission("MANAGE_CHANNELS") ||
            !msg.member.hasPermission("MANAGE_GUILD")
        )
            return msg.channel.send(`You Dont Have Permission`);

        if (!msg.guild.me.hasPermission("ADMINISTRATOR"))
            return msg.channel.send(
                `I can't warn Anyone Without Administrator Permission`
            );

        if (args[0].startsWith("<@&"))
            return msg.channel.send(`You Can't Warn The Roles`);

        // const mute = fs.readFileSync('./commands/moderator/').s.filter(f => f === 'tempmute.js')

        const member =
            msg.guild.member(msg.mentions.users.first()) ||
            msg.guild.members.cache.find((u) => u.id === args[0]);

        const reason = args.join(" ").slice(22);

        if (!member) return msg.channel.send(`You Must Mention the member`);
        if (`<@${msg.author.id}>` === `<@${member.user.id}>`)
            return msg.channel.send(`You can't warn Yourself`);

        ChannelWarn.findOne(
            {
                guildID: msg.guild.id,
                guildName: msg.guild.name,
                ownerID: msg.guild.ownerID,
            },
            async (err, channels) => {
                if (err) console.log(err);

                if (!channels) {
                    // if guild dosn't have in database
                    const userWarn = {
                        warnId: member.user.id,
                        warnName: member.user.username,
                        warnDescriminator: member.user.discriminator,
                        reason,
                        count: 1,
                    };
                    const newChannels = new ChannelWarn({
                        guildID: msg.guild.id,
                        guildName: msg.guild.name,
                        ownerID: msg.guild.ownerID,
                        ownerName: msg.guild.owner.user.username,
                        channels: {
                            warnChannel: undefined,
                            warnChannelID: undefined,
                        },
                        warns: [],
                        maxWarn: 5,
                    });
                    newChannels.warns.push(userWarn);

                    newChannels
                        .save()
                        .then(() => {
                            const warnEmbed = new MessageEmbed()
                                .setAuthor(
                                    `[WARN!] **${member.user.username}#${member.user.discriminator}**`
                                )
                                .setColor([0, 255, 255])
                                .setFooter(
                                    `${bot.user.username} | Warn`,
                                    bot.user.displayAvatarURL()
                                );
                            warnEmbed
                                .addField(
                                    "**User**",
                                    `**${member.user.username}#${member.user.discriminator}**`
                                )
                                .addField(
                                    `**Moderator**`,
                                    `<@${msg.author.id}>`
                                )
                                .addField(
                                    `**Reason**`,
                                    reason ? reason : "No reason"
                                );

                            msg.channel.send(warnEmbed);
                        })
                        .catch((err) => console.log(err));
                } else {
                    // makking more warn
                    channels.warns.forEach(async (members) => {
                        if (member.user.id == members.warnId) {
                            let user = members.warnId;

                            const userFind = msg.guild.members.cache.find(
                                (us) => us.id === user
                            );

                            members.count += 1;
                            members.reason = reason;

                            const warnEmbed = new MessageEmbed()
                                .setAuthor(
                                    `[WARN!] ${members.warnName}#${member.user.discriminator}`
                                )
                                .setColor("RED")
                                .setFooter(
                                    `${bot.user.username} | Warn`,
                                    bot.user.displayAvatarURL()
                                );

                            if (
                                channels.channels.warnChannel == "undefined" ||
                                !channels.channels.warnChannel ||
                                !channels.channels.warnChannelID
                            ) {
                                warnEmbed
                                    .addField(
                                        "**User**",
                                        `${members.warnName}#${member.user.discriminator}`
                                    )
                                    .addField(
                                        `**Moderator**`,
                                        `<@${msg.author.id}>`
                                    )
                                    .addField(
                                        `**Reason**`,
                                        reason ? reason : "No Reason"
                                    );
                                msg.channel.send(warnEmbed);
                            } else {
                                const channel = msg.guild.channels.cache.find(
                                    (chanel) =>
                                        chanel.id ===
                                            channels.channels.warnChannelID ||
                                        chanel.name ===
                                            channels.channels.warnChannel
                                );

                                warnEmbed
                                    .addField(
                                        "**User**",
                                        `${members.warnName}#${member.user.discriminator}`
                                    )
                                    .addField(
                                        `**Moderator**`,
                                        `<@${msg.author.id}>`
                                    )
                                    .addField(
                                        `**Reason**`,
                                        reason ? reason : "No Reason"
                                    );
                                channel.send(warnEmbed);
                            }

                            if (members.count >= channels.maxWarn) {
                                msg.channel.send(
                                    `<@${member.user.id}> This Member Get warn ${channels.maxWarn} times`
                                );
                                const findOut = channels.warns.find(
                                    (members) => members.warnId === user
                                );

                                // checkinng if user warn already in database
                                if (!findOut) return;

                                members.count = 0;

                                setTimeout(() => {
                                    channels.save();
                                    return;
                                }, 2000);

                                if (channels.ban) {
                                    msg.guild
                                        .member(userFind)
                                        .ban({ day: 1, reason: "max warn" })
                                        .then(() =>
                                            msg.channel
                                                .send(
                                                    `<@${userFind.user.id}> Succesful Banned!`
                                                )
                                                .then((m) =>
                                                    m.delete({ timeout: 10000 })
                                                )
                                        )
                                        .catch((err) => console.log(err));
                                } else if (channels.kick) {
                                    msg.guild
                                        .member(userFind)
                                        .kick("max warn")
                                        .then(() =>
                                            msg.channel
                                                .send(
                                                    `<@${userFind.user.id}> Succesful Kicked!`
                                                )
                                                .then((m) =>
                                                    m.delete({ timeout: 10000 })
                                                )
                                        )
                                        .catch((err) => console.log(err));
                                } else if (channels.mute) {
                                    // mute member
                                    const muted = "Muted";

                                    const { cache } = msg.guild.roles;
                                    const role = cache.find(
                                        (rm) =>
                                            rm.name.toLowerCase() ===
                                            muted.toLowerCase()
                                    );

                                    if (!role) {
                                        // jika rolenya tidak ada
                                        await msg.guild.roles
                                            .create({
                                                data: {
                                                    name: "Muted",
                                                    color: "#424954",
                                                    mentionable: false,
                                                    permissions: "VIEW_CHANNEL",
                                                    position: 1,
                                                },
                                            })
                                            .then((role) => {
                                                msg.guild.channels.cache
                                                    .map(
                                                        (channel, id) => channel
                                                    )
                                                    .forEach((channel) => {
                                                        channel
                                                            .createOverwrite(
                                                                role.id,
                                                                {
                                                                    SEND_MESSAGES: false,
                                                                    ADD_REACTIONS: false,
                                                                    SPEAK: false,
                                                                    CONNECT: false,
                                                                    ATTACH_FILES: false,
                                                                }
                                                            )
                                                            .catch((err) =>
                                                                console.log(err)
                                                            );
                                                    });

                                                userFind.roles
                                                    .add(role.id)
                                                    .then(() => {
                                                        msg.channel.send(
                                                            `${
                                                                userFind.user
                                                                    .username
                                                            } has been Muted! ${ms(
                                                                ms("30m"),
                                                                { long: true }
                                                            )}`
                                                        );
                                                        setTimeout(() => {
                                                            if (
                                                                !userFind.roles.cache.has(
                                                                    role.id
                                                                )
                                                            ) {
                                                                return;
                                                            }
                                                            userFind.roles
                                                                .remove(role.id)
                                                                .then(() =>
                                                                    msg.channel.send(
                                                                        `<@${userFind.user.id}> has been UnMuted!`
                                                                    )
                                                                );
                                                        }, ms("30m"));
                                                    });
                                            });
                                    } else {
                                        // jika rolenya ada
                                        if (userFind.roles.cache.has(role.id)) {
                                            return msg.channel.send(
                                                `This member already Muted`
                                            );
                                        } else {
                                            msg.guild.channels.cache
                                                .map((channel, id) => channel)
                                                .forEach((channel) => {
                                                    channel
                                                        .createOverwrite(
                                                            role.id,
                                                            {
                                                                SEND_MESSAGES: false,
                                                                ADD_REACTIONS: false,
                                                                SPEAK: false,
                                                                CONNECT: false,
                                                                ATTACH_FILES: false,
                                                            }
                                                        )
                                                        .catch((err) =>
                                                            console.log(err)
                                                        );
                                                });

                                            userFind.roles
                                                .add(role.id)
                                                .then(() => {
                                                    msg.channel.send(
                                                        `${
                                                            userFind.user
                                                                .username
                                                        } has been Muted! ${ms(
                                                            ms("30m"),
                                                            {
                                                                long: true,
                                                            }
                                                        )}`
                                                    );

                                                    setTimeout(() => {
                                                        if (
                                                            !userFind.roles.cache.has(
                                                                role.id
                                                            )
                                                        ) {
                                                            return;
                                                        }
                                                        userFind.roles
                                                            .remove(role.id)
                                                            .then(() =>
                                                                msg.channel.send(
                                                                    `<@${userFind.user.id}> has been UnMuted!`
                                                                )
                                                            );
                                                    }, ms("30m"));
                                                });
                                        }
                                    }
                                }
                            }
                            channels.save().catch((err) => console.log(err));

                            return;
                        }
                    });

                    const userWarn = {
                        warnId: member.user.id,
                        warnName: member.user.username,
                        reason: reason,
                        count: 1,
                    };

                    // gettin member form database
                    const findOut = channels.warns.find(
                        (members) => members.warnId === member.user.id
                    );

                    // checkinng if user warn already in database
                    if (findOut) return; //return if member already in database

                    // push array to database
                    channels.warns.push(userWarn);

                    const warnEmbed = new MessageEmbed()
                        .setAuthor(
                            `[WARN!] ${member.user.username}#${member.user.discriminator}`
                        )
                        .setColor("RED")
                        .setFooter(
                            `${bot.user.username} | Warn`,
                            bot.user.displayAvatarURL()
                        );

                    if (
                        channels.channels.warnChannel == "undefined" ||
                        !channels.channels.warnChannel
                    ) {
                        warnEmbed
                            .addField(
                                "**User**",
                                `${member.user.username}#${member.user.discriminator}`
                            )
                            .addField(`**Moderator**`, `<@${msg.author.id}>`)
                            .addField(
                                `**Reason**`,
                                reason ? reason : "No Reason"
                            );
                        msg.channel.send(warnEmbed);
                    } else {
                        const channel = msg.guild.channels.cache.find(
                            (chanel) =>
                                chanel.id === channels.channels.warnChannelID ||
                                chanel.name === channels.channels.warnChannel
                        );

                        if (!channel) {
                            warnEmbed
                                .addField(
                                    "**User**",
                                    `${member.user.username}#${member.user.discriminator}`
                                )
                                .addField(
                                    `**Moderator**`,
                                    `<@${msg.author.id}>`
                                )
                                .addField(
                                    `**Reason**`,
                                    reason ? reason : "No Reason"
                                );
                            msg.channel.send(warnEmbed);
                        }

                        warnEmbed
                            .addField(
                                "**User**",
                                `${member.user.username}#${member.user.discriminator}`
                            )
                            .addField(`**Moderator**`, `<@${msg.author.id}>`)
                            .addField(
                                `**Reason**`,
                                reason ? reason : "No Reason"
                            );
                        channel.send(warnEmbed);
                    }

                    channels.save().catch((err) => console.log(err));
                }
            }
        );
    },
};
