const mongodb  = require("mongodb");
const getdb = require("../../common/getdb")
require("dotenv").config();



async function InsertLanguageDb(language) {
    try {
        const db = await getdb(); // ensure connected
        const collection = db.collection("languages");
        const result = await collection.insertOne({ language });
        return result;
    } catch (err) {
        console.log("Insert error:", err);
        throw err;
    }
}

async function getLanguagesDb() {
    try {
        const db = await getdb(); // ensure connected
        const result = await db.collection("languages").find().toArray();
        return result;
    } catch (err) {
        return err
    }
}

async function deleteLaguagefromDb(id) {
    try{
        const db = await getdb()     
        const result = await db.collection("languages").deleteOne({_id:new mongodb.ObjectId(id)})
        return result
    }
    catch(err){
        return err
    }
}
module.exports = { InsertLanguageDb, getLanguagesDb, deleteLaguagefromDb };
