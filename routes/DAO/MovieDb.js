const { ObjectId } = require("mongodb")
const getDb = require("../../common/getdb")
const fs = require("fs")
async function MovieDb(document){
    try{
    const db =await getDb()
    const response =await db.collection("movies").insertOne(document)
    return response
    }
    catch(err){
        throw err
    }
}

async function GetMovieDb(){
    try{
        const db = await getDb()
        const response = await db.collection("movies").find().toArray()
        return response
    }
    catch(err){
        throw err
    }
}
 async function DeleteMovieDb(id){
    try{
        const db = await getDb()
        const response = await db.collection("movies").deleteOne({_id :new ObjectId(id)})
        console.log(response)
        return response
    }
    catch(err){
        throw err
    }
 }
module.exports = {MovieDb, GetMovieDb,DeleteMovieDb}