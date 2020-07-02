const mongoose = require("mongoose");
const { config } = require("dotenv");

config({
    path: "D:\\discord\\hangout-discord-bot/.env",
});

const database = process.env.DATABASE;

module.exports = () => {
    const dbOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        poolSize: 5,
        connectTimeoutMS: 10000,
    };

    mongoose.connect(database, dbOption);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
        console.log(`\nMongoose Succes Connected`);
    });
    mongoose.connection.on("err", (err) => {
        console.log(`\nMongoose Connection Err: \n ${err.stack}`);
    });
    mongoose.connection.on("disconnected", () => {
        console.log(`\nMongoose Connection disconnected`);
    });
};
