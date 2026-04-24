var mongodb  = require("mongodb")
require('dotenv').config()
var dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
async function getdb(){
    try{
    const MongoClient = mongodb.MongoClient
    const url = process.env.MONGOURI 
    // mongodb+srv://sandeep:<db_password>@cluster0.sbxvzd3.mongodb.net/
//    const url ="mongodb+srv://sandeep:D-3j_RWvJJkg58m@cluster0.sbxvzd3.mongodb.net"
    const server = await MongoClient.connect(url)
    const db = server.db("movieflix")
        return db;
    }
    catch(err){
        console.log("err", err)
    } 
}
module.exports = getdb
