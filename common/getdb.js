var mongodb  = require("mongodb")
require('dotenv').config()
var dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
async function getdb(){
    try{
    const MongoClient = mongodb.MongoClient
    const url = process.env.MONGOURI 
    const server = await MongoClient.connect(url)
    const db = server.db("movieflix")
        return db;
    }
    catch(err){
        console.log("err", err)
    } 
}
module.exports = getdb
