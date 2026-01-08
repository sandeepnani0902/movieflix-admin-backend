const { ObjectId } = require("mongodb");
const getDb = require("../../common/getdb")

let db ;

AddDb()
async function AddDb(){
    try{
      db  = await getDb()
      return db;
    }
    catch(err){
        console.error("db error :", err.message)
    }
}


const AddWebseriesDb = async(document)=>{
    try{
        const response = await db.collection("WebSeries").insertOne(document)
        return response
    }
    catch(err){
        return err
    }
}
const GetWebseriesDb = async(req)=>{
    try{
        const response = await db.collection("WebSeries").find().toArray()
        // console.log(response)
        return response  
    }
    catch(err){
        return err
    }
}
//  delete series 
const DeleteWebseriesDb = async(id)=>{
    try{
        const response = await db.collection("WebSeries").deleteOne({_id : new ObjectId(id)})
        return response
    }
    catch(err){
        throw err
    }
}
const UpdateSerieDb = async({ id, title })=>{
  try {

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