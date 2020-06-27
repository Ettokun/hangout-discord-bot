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
                        `**level_Up Message** Has Been Update To : ${swtich}\n\nType ${prefix}config levelUp [custom Message], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Custome_Message.level_Up = "";

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**level Up Message** Has Been Update To : ${swtich}\n\nType ${prefix}config levelUp none, to remove ${swtich} from config\n\n**NOTE:**\nYou Can User Custom Message\n@user = username\n@levelup = level after level up`
                );

            if (!swtich)
                return msg.channel.send(
                    `Value Can't Be Empty, Type ${prefix}config levelUp [Message],\n\n**NOTE:**\nYou Can User Custom Message\n@user = username\n@levelup = level after level up`
                );

            guild.configGuild.Custome_Message.level_Up = swtich;

            msg.channel.send(LevelNotif);

            guild.save().catch(console.error);
        }
    );
};
