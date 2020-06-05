const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema({
    guildName: String,
    oldGuildName: String,
    guildID: String,
    prefix: String,
    member: Number,
    autoRole: {
        auto: false,
        rolesId: String,
        rolesName: String,
    },
    autoNick: {
        auto: false,
        nickname: String,
    },
});

module.exports = mongoose.model("guildPrefix", PrefixSchema);
