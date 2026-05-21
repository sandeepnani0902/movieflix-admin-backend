const { ObjectId } = require("mongodb");
const getDb = require("../../common/getdb")

const AddWebseriesDb = async(document)=>{
    try{
        const db = await getDb()
        const response = await db.collection("WebSeries").insertOne(document)
        return response
    }
    catch(err){
        throw err
    }
}
const GetWebseriesDb = async(req)=>{
    try{
        const db = await getDb()
        const response = await db.collection("WebSeries").find().toArray()
        return response  
    }
    catch(err){
        throw err
    }
}
//  delete series 
const DeleteWebseriesDb = async(id)=>{
    try{
        const db = await getDb()
        const response = await db.collection("WebSeries").deleteOne({_id : new ObjectId(id)})
        return response
    }
    catch(err){
        throw err
    }
}
const UpdateSerieDb = async({ id, title })=>{
  try {
    const db = await getDb()
    const response = await db.collection("WebSeries").updateOne(
      { _id: new ObjectId(id) },   // ✅ filter
      { $set: { title: title } }   // ✅ update
    )
    return response
  } catch (err) {
    throw err
  }
}
module.exports = {AddWebseriesDb, GetWebseriesDb, DeleteWebseriesDb, UpdateSerieDb}