const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    help: {
        name: "pokemon",
        description: "Showing Pokemon stats",
        alias: "",
        category: "fun",
        usage: "[pokemon name]",
        accessableby: "Member",
    },
    run: async (bot, msg, args, prefix) => {
        const pokemonEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setFooter(`${bot.user.username} | Pokemon`);
        if (!args[0]) {
            return msg.channel.send(
                `Must include pokemon name\n**Exemple:**\n${prefix}pokemon pikachu`
            );
        } else {
            fetch(
                `https://pokeapi.co/api/v2/pokemon/${args
                    .join(" ")
                    .toLowerCase()}`
            )
                .then((res) => res.json())
                .then((data) => {
                    pokemonEmbed
                        .setAuthor(
                            data.forms[0].name,
                            bot.user.displayAvatarURL()
                        )
                        .setThumbnail(data.sprites.front_default)
                        .addField("**Height**", `${data.height * 10} CM`, true)
                        .addField("**Weight**", `${data.weight / 10} KG`, true)
                        .addField(
                            "**Type**",
                            data.types.map((type) => type.type.name).join(", "),
                            true
                        )
                        .addField(
                            `**Ability**[${data.abilities.length}]`,
                            data.abilities
                                .map((ab) => ab.ability.name)
                                .join(", "),
                            true
                        )
                        .addField(
                            `**Stats**[${data.stats.length}]`,
                            data.stats
                                .map(
                                    (stats) =>
                                        `${stats.stat.name} [${stats.base_stat}]`
                                )
                                .join(", "),
                            true
                        )
                        .addField(
                            `**Move**[${data.moves.length}]`,
                            data.moves
                                .slice(0, 8)
                                .map((move) => move.move.name)
                                .join(", "),
                            true
                        );

                    msg.channel.send(pokemonEmbed);
                })
                .catch((err) => {
                    console.log(err.message);
                    msg.channel.send(
                        `OOH NOO, pls type pokemon name Correctly`
                    );
                });
        }
    },
};
