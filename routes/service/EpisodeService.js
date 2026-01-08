const {EpisodeDb, DeleteEpisodeDb} = require("../DAO/EpisodeDb")
const fs = require("fs")
const path = require("path")
async function EpisodeService(req){
    try{
        const webseriesId = req.params.id
        const {season, episodenumber, episodetitle, videoURL} = req.body
        const episodebanner = req.files[0].path
        const document ={
            episodeNumber:episodenumber,
            title:episodetitle,
            banner:episodebanner,
            videourl:videoURL
        }
        const response =await EpisodeDb(webseriesId,document, season)
        return response
    }
    catch(err){
        return err
    }
}
const DeleteEpisodeService = async ({ id, season, episode }) => {
  try {
    const episodePath = path.join(
      process.cwd(),
      "uploads",
      "webseries",
      id,
      "seasons",
      season,
      "episodes",
      episode
    )

    await fs.promises.rm(episodePath, { recursive: true, force: true })

    const seasonNumber = Number(season.match(/\d+/)[0])
    const episodeNumber = Number(episode.match(/\d+/)[0])
    const response = await DeleteEpisodeDb({ id, seasonNumber, episodeNumber })
    return response
  } catch (err) {
    throw err
  }
}

module.exports = {EpisodeService, DeleteEpisodeService}