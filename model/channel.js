const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ownerID: String,
    ownerName: String,
    channels: {
        warnChannel: String,
        warnChannelID: String,
    },
    warns: [
        {
            warnId: String,
            warnName: String,
            warnDescriminator: String,
            reason: String,
            count: Number,
        },
    ],
    maxWarn: Number,
    ban: false,
    kick: false,
    mute: false,
});

module.exports = mongoose.model("Warns", ChannelSchema);
