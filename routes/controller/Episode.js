const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multerConfig");
const {EpisodeService, DeleteEpisodeService} = require("../service/EpisodeService")
router.post(
  "/webseries/season/addepisode/:id",
  upload.any(),
  async(req, res) => {
    try{
      const data = EpisodeService(req)
      res.status(200).json({
        success:true,
        data:data,
        message:'successfully saved episode'
      })
    }
    catch(err){
      res.status(500).json({
        success:false,
        message:"something went wrong, episode not saved."
      })
    }
    
  }
);

router.delete("/webseries/:id/seasons/:season/episodes/:episode", async(req, res, next)=>{
  try{
  const {id, season, episode} = req.params
  const response = await DeleteEpisodeService({id, season, episode})
  res.status(200).json({
    success:true,
    message:"episode successfully deleted",
    response
  })
  
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
})

module.exports = router;
