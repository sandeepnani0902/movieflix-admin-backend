const { MongoClient } = require("mongodb");
require("dotenv").config();
const dns = require("node:dns") // dns.setServers(["4.4.4.4", "8.8.8.8"])
 dns.setServers(['8.8.8.8', '8.8.4.4']);

let client;
let db;

async function getdb() {
    try {
        if (db) return db; // reuse existing db

        if (!client) {
            client = new MongoClient(process.env.MONGOURI, {
                maxPoolSize: 10,
            });
            await client.connect();
        }

        db = client.db("movieflix");
        return db;

    } catch (err) {
        console.log("Mongo DB connection error:", err);
        throw err;
    }
}

module.exports = getdb;


// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const dns = require("node:dns")
// // dns.setServers(["4.4.4.4", "8.8.8.8"])
// dns.setServers(['8.8.8.8', '8.8.4.4']);
// async function getdb() {
//     try {
//         const client = new MongoClient(process.env.MONGOURI,{
//              maxPoolSize: 10,
//         });
//         await client.connect();

//         return client.db("movieflix");
//     } catch (err) {
//         console.log("err", err);
//     }
// }

// module.exports = getdb;
