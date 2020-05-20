module.exports = {
    help: {
        name: "clear",
        description: "Membersikan chat",
        alias: ["clean", "cr"],
        category: "moderator",
        usage: "[masukan angka 1-99]",
        accessableby: "Moderator/Admin"
    },

    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_MESSAGES"))
            return msg.channel.send("Tidak memiliki izin!");

        if (!args[0])
            return msg.channel.send("Masukan kata yang ingin di ucapkan");
        if (parseInt(args[0]) >= 100)
            return msg.channel.send("Jumlah terlalu banyak").then(m =>
                setTimeout(() => {
                    msg.delete();
                    m.delete();
                }, 5000)
            );

        msg.channel
            .bulkDelete(parseInt(args[0]))
            .then(() => {
                msg.channel
                    .send(`Telah Menghapus ${args[0]} pesan.`)
                    .then(m => setTimeout(() => m.delete(), 5000));
            })
            .catch(err =>
                msg.channel
                    .send(err.message)
                    .then(m => setTimeout(() => m.delete(), 5000))
            );
    }
};
