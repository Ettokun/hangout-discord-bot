const { MessageEmbed } = require("discord.js");
const guildSchema = require("../../model/guild");
const { stripIndent } = require("common-tags");
const { dateNow } = require("../../functions");

module.exports = {
    help: {
        name: "config",
        description: "Configuration of bot",
        alias: [],
        category: "info",
        usage: "[Name config] [value]",
        accessableby: "Moderator/Admin",
    },
    run: async (bot, msg, args, prefix) => {
        if (!msg.member.hasPermission("MANAGE_GUILD", { checkOwner: false })) {
            if (msg.author.id !== "348651859646349316") {
                console.log("hai");
                return msg.channel.send("You No Have Permission");
            }
        }

        guildSchema.findOne(
            {
                guildID: msg.guild.id,
            },
            (err, guild) => {
                if (err) console.log(err);

                const {
                    Custome_Message,
                    Channel,
                    General,
                    Roles,
                } = guild.configGuild;

                // start no args statement
                if (!args[0]) {
                    return msg.channel.send(
                        noArgsEmbed(bot, msg, prefix, Channel, General, Roles)
                    );
                }
                // end no args statement

                if (args[0].toLowerCase() === "help") {
                    return console.log("helo");
                }

                try {
                    require(`../../config/${args[0].toLowerCase()}`)(
                        bot,
                        msg,
                        args.slice(1).join(" "),
                        prefix
                    );
                    console.log(
                        require(`../../config/${args[0].toLowerCase()}`)
                    );
                } catch (e) {
                    console.log(
                        require(`../../config/${args[0].toLowerCase()}`)
                    );
                    return msg.channel.send(
                        noArgsEmbed(bot, msg, prefix, Channel, General, Roles)
                    );
                }
            }
        );
    },
};

function noArgsEmbed(bot, msg, prefix, Channel, General, Roles) {
    const ConfigEmbed = new MessageEmbed()
        .setAuthor(`${bot.user.username} Server Configuration`)
        .setColor([77, 224, 235])
        .setDescription(
            stripIndent`
                        To Update Server Configuration,
                        Type ${prefix}config help, For More InFormation

                        **Custom Message**
                        levelUp: Type \`${prefix}levelup\`
                        Welcome: Type \`${prefix}welcome\`
                        Leave: Type \`${prefix}leave\`

                        **Channel**
                        level Notification Channel: ${
                            Channel.level_Notification_Channel.length === 0
                                ? `Everywhere`
                                : `<#${Channel.level_Notification_Channel}>`
                        }
                        Member Count Channel: ${
                            Channel.Member_Count_Channel.length === 0
                                ? `None`
                                : `<#${Channel.Member_Count_Channel}>`
                        }
                        Welcome Channel: ${
                            Channel.Welcome_Channel.length === 0
                                ? `None`
                                : `<#${Channel.Welcome_Channel}>`
                        }
                        Leave Channel: ${
                            Channel.Leave_Channel.length === 0
                                ? `None`
                                : `<#${Channel.Leave_Channel}>`
                        }
                        Mod log Channel: ${
                            Channel.Mod_log_Channel.length === 0
                                ? `None`
                                : `<#${Channel.Mod_log_Channel}>`
                        }

                        **General**
                        prefix: ${prefix}
                        level System: ${General.leveling_System ? "ON" : "OFF"}

                        **Roles**
                        Auto Assign Role: ${
                            Roles.Auto_Assign_Role.length === 0
                                ? `None`
                                : `<@&${Roles.Auto_Assign_Role}>`
                        }
                    `
        )
        .setFooter(`${bot.user.username} | Config | ${dateNow(msg, false)}`);

    return ConfigEmbed;
}
