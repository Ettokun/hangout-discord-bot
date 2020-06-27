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
                        `**Member Count Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config membercountchannel [Voice Channel Name], to add new Configuratuion`
                    );

                msg.channel.send(LevelNotif);
                guild.configGuild.Channel.Member_Count_Channel = "";

                return guild.save().catch(console.error);
            }

            const LevelNotif = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                    `**Member Count Channel** Has Been Update To : ${swtich}\n\nType ${prefix}config membercountchannel none, to remove ${swtich} from config`
                );

            const findChannel = msg.guild.channels.cache.find(
                (channel) => channel.name.toLowerCase() === swtich.toLowerCase()
            );
            const every = msg.guild.roles.cache.find(
                (role) => role.name === "@everyone"
            );

            if (findChannel.type.toLowerCase() !== "voice")
                return msg.channel.send(`${swtich} Is Not a Voice Channel`);

            if (!findChannel)
                return msg.channel.send(
                    `Channel With Name ${swtich} Is Not Found!`
                );

            guild.configGuild.Channel.Member_Count_Channel = findChannel.id;

            findChannel
                .setName(`Member Count: ${msg.guild.members.cache.size}`)
                .then(() => {
                    findChannel
                        .createOverwrite(every.id, {
                            CONNECT: false,
                            SPEAK: false,
                        })
                        .catch(console.error);
                })
                .catch(console.error);

            msg.channel.send(LevelNotif);

            guild.save().catch(console.error);
        }
    );
};
