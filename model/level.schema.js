const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    username: String,
    userid: String,
    xp: Number,
    level: Number,
    time: String,
});

module.exports = mongoose.model("level", LevelSchema);
