const { ObjectId } = require("mongodb");
const getDb = require("../../common/getdb");
const { response } = require("express");

async function SeasonDb(seasons, webseriesId) {
  try {
    const db = await getDb();

    const response = await db.collection("WebSeries").updateOne(
      { _id: new ObjectId(webseriesId) },
      { $set: { seasons: seasons } },  // replace seasons
      { upsert: true }
    );

    return response;
  } catch (err) {
    console.error("SeasonDb Error:", err);
    throw err;
  }
}
const UpdateSeasonDb = async ({ id, seasonNumber, title }) => {
  const db = await getDb();
  
  const response = await db.collection("WebSeries").updateOne(
    {
      _id:new ObjectId(id),
      "seasons.seasonNumber": seasonNumber
    },
    {
      $set: {
        "seasons.$.title": title
      }
    }
  );

  console.log("Matched:", response.matchedCount);
  console.log("Modified:", response.modifiedCount);

  return response;
};
const DeleteSeasonDb =async({id, seasonNumber})=>{
  try{
    const db = await getDb();
    const response = await db.collection("WebSeries").updateOne(
      {_id :new ObjectId(id)},
      {
        $pull:{
          seasons:{
            seasonNumber: seasonNumber
          }
        }
      }
    )

    console.log("Matched:", response.matchedCount);
    console.log("Modified:", response.modifiedCount);
      return response
  }
  
  catch(err){
    throw err
  }
}

module.exports = { SeasonDb, UpdateSeasonDb, DeleteSeasonDb };
