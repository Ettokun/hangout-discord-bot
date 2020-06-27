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
                        `**Leave Message** Has Been Update To : ${swtich}\n\nType ${prefix}config leave [custom Message], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Custome_Message.Leave = "";

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**Leave Message** Has Been Update To : ${swtich}\n\nType ${prefix}config leave none, to remove ${swtich} from config\n\n**NOTE:**\nYou Can User Custom Message\n@membertag = tag member\n@guild = Server name\n@membercount = All member in Server`
                );

            if (!swtich)
                return msg.channel.send(
                    `Value Can't Be Empty, Type ${prefix}config leave [Message],\n\n**NOTE:**\nYou Can User Custom Message\n@membertag = tag member\n@guild = Server name\n@membercount = All member in Server`
                );

            const newSwtich = swtich.replace("@user", "@membertag");

            guild.configGuild.Custome_Message.Leave = newSwtich;

            msg.channel.send(LevelNotif);

            guild.save().catch(console.error);
        }
    );
};
