const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    guildid: String,
    username: String,
    oldUsername: String,
    userid: String,
    xp: Number,
    level: Number,
    nextLevel: Number,
    avatar: String,
});

module.exports = mongoose.model("level", LevelSchema);
