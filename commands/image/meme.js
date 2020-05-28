const randomPuppy = require("random-puppy");
const snekFetch = require("snekfetch");

module.exports = {
    help: {
        name: "meme",
        description: "Bot Send randomly meme image",
        alias: ["memes"],
        category: "image",
        usage: "",
        accessableby: "Member",
    },
    run: async (bot, msg, args) => {
        let reddit = [
            "meme",
            "AnimeFunny",
            "animemes",
            "meiril",
            "me_irl",
            "MemeEconomy",
            "dankmeme",
            "dankmemes",
            "AdviceAnimals",
            "2meirl4meirl",
            "MemesOfAnime",
        ];

        let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        const message = await msg.channel.send(`Please wait...`);

        randomPuppy(subreddit)
            .then((url) => {
                snekFetch
                    .get(url)
                    .then(async (res) => {
                        await msg.channel
                            .send({
                                files: [
                                    {
                                        attachment: res.body,
                                        name: "meme.png",
                                    },
                                ],
                            })
                            .then(() => {
                                message.delete();
                            });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    },
};
