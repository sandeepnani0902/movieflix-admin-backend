const mongodb  = require("mongodb")
require('dotenv').config()
async function getdb(){
    try{
    const MongoClient = mongodb.MongoClient
    const url = process.env.MONGOURI
    // console.log(url)
    const server =await MongoClient.connect(url)
    const db = server.db("movieflix")
        return db;
    }
    catch(er){
        console.error(err)
    }
}
module.exports = getdb
