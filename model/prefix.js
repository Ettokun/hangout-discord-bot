const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
    guildName: String,
    guildID: String,
    prefix: String,
    member: Number,
});

module.exports = mongoose.model("guildPrefix", PrefixSchema);
