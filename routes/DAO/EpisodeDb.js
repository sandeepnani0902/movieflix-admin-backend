const { ObjectId } = require("mongodb");
const getDb = require("../../common/getdb");

let db;

async function getDatabase() {
  if (!db) {
    db = await getDb();
  }
  return db;
}

async function EpisodeDb(webseriesId, episode, seasonNumber) {
  try {
    const database = await getDatabase();

    const response = await database.collection("WebSeries").updateOne(
      {
        _id: new ObjectId(webseriesId),
        seasons: {
          $elemMatch: {
            seasonNumber: Number(seasonNumber),
            "episodes.episodeNumber": { $ne: episode.episodeNumber }
          }
        }
      },
      {
        $push: {
          "seasons.$.episodes": episode
        }
      }
    );

    return response;
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
}

const DeleteEpisodeDb = async ({ id, seasonNumber, episodeNumber }) => {
  try {
    const database = await getDatabase()

    const response = await database.collection("WebSeries").updateOne(
      {
        _id: new ObjectId(id),
        "seasons.seasonNumber": Number(seasonNumber)
      },
      {
        $pull: {
          "seasons.$.episodes": {
            episodeNumber: String(episodeNumber)
          }
        }
      }
    )

    console.log("matched:", response.matchedCount)
    console.log("modified:", response.modifiedCount)

    if (response.modifiedCount === 0) {
      throw new Error("Episode not found in database")
    }

    return response
  } catch (err) {
    throw err
  }
}


module.exports = { EpisodeDb,DeleteEpisodeDb };
