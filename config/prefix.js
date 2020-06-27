const prefixCommand = require("../commands/util/prefix");

module.exports = async (bot, msg, swtich, prefix) => {
    return prefixCommand.run(bot, msg, swtich, prefix);
};
