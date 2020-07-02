const discord = require("discord.js");
const ms = require("ms");
const DBLapi = require("dblapi.js");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

const dbl = new DBLapi(process.env.DBLTOKEN);

module.exports = async (bot, oldState, newState) => {
    // const serverQueue = bot.queue.get(newState.guild.id);
    // // if (newState.selfDeaf || newState.selfMute || newState.streaming) return;
    // // if (newState.serverDeaf || newState.serverMute) return;
    // if (serverQueue) {
    //     console.log(serverQueue.channel.id, newState.channelID);
    //     if (serverQueue.channel.id == newState.channelID) {
    //         if (newState.member.user.bot) return;
    //         console.log(newState.channel.members.size);
    //     } else {
    //     }
    // }
};
