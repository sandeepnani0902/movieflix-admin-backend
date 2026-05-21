const {SeasonDb, UpdateSeasonDb, DeleteSeasonDb} = require("../DAO/SeasonDb")
const fs = require("fs")
const path  = require('path')
async function SeasonService(req) {
  try {
    const webseriesId = req.seriesId;

    const data = req.body;   // Example: { season1: "Title 1", season2: "Title 2" }
    const files = req.files; // Example: 2 uploaded images

    let Seasons = [];

    // Build seasons using keys like "season1", "season2"
    Object.entries(data).forEach(([key, title]) => {
      const match = key.match(/season(\d+)/);
      if (!match) return;  // ignore unknown fields

      const seasonNumber = Number(match[1]);

      Seasons.push({
        seasonNumber,
        title,
        image: null,
      });
    });

    // Sort seasons by number (important!)
    Seasons.sort((a, b) => a.seasonNumber - b.seasonNumber);

    // Attach images by field name matching (e.g. season1_image -> seasonNumber: 1)
    if (files && files.length > 0) {
      files.forEach((file) => {
        const match = file.fieldname.match(/season(\d+)_image/);
        if (match) {
          const seasonNumber = Number(match[1]);
          const season = Seasons.find(s => s.seasonNumber === seasonNumber);
          if (season) {
            season.image = file.path;
          }
        }
      });
    }

    // console.log("Final Seasons:", Seasons);

    const response = await SeasonDb(Seasons, webseriesId);
    return response;

  } catch (err) {
    throw err;
  }
}
const UpdateSeason = async({id, seasonNumber, title})=>{
  try{
    const response =await UpdateSeasonDb({id, seasonNumber, title})
    return response
  }
  catch(err){
    throw err
  }
}
const DeleteSeason = async ({ id, seasonNumber }) => {
  try {
    const response = await DeleteSeasonDb({ id, seasonNumber });

    if (response.modifiedCount === 0) {
      throw new Error("Season not found or already deleted");
    }

    try {
      const seasonfilepath = path.join(
        "uploads",
        "webseries",
        id,
        "seasons",
        `season${seasonNumber}`
      );
      if (fs.existsSync(seasonfilepath)) {
        await fs.promises.rm(seasonfilepath, {
          recursive: true,
          force: true
        });
      }
    } catch (e) {
      console.log("Local season folder deletion skipped or failed:", e.message);
    }

    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = {SeasonService, UpdateSeason, DeleteSeason}