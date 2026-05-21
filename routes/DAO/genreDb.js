const getdb = require("../../common/getdb")

async function genreDb(body){
  try{
  const db =  await getdb()
  const collection = db.collection("genre")
  const result = await collection.insertOne(body)
  // console.log(result)
  return result
  }
  catch(err){
    throw err
  }

}
module.exports = genreDb