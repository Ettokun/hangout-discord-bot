const discord = require("discord.js");
const ms = require("ms");
const DBLapi = require("dblapi.js");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

const dbl = new DBLapi(process.env.DBLTOKEN);

module.exports = async (bot, event, id) => {
    console.log(`\nShard dengan id ${id} Disconnect`);
};
