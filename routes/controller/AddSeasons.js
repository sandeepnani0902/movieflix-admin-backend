const express = require("express");
const upload = require("../../middleware/multerConfig");
const { SeasonService, UpdateSeason, DeleteSeason } = require("../service/SeasonService");

const router = express.Router();

router.post(
  "/webseries/seasons/:id",
  (req, res, next) => {
    req.seriesId = req.params.id;  // <-- FIX
    next();
  },
  upload.any(),
  async(req, res, next) => {
    try {
      const data = await SeasonService(req)
      return res.json({
        success: true,
        message: "Seasons added successfully",
        data:data
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);
router.post("/webseries/:id/seasons/:season/updatetitle",async(req, res)=>{
  try{
    const id = req.params.id
    
   const seasonNumber = Number(req.params.season)
   const title = req.body.title
   console.log(id, seasonNumber, title)
   const data = await UpdateSeason({id, seasonNumber, title})
    res.json({
        success:true,
        message:"successfully season title updated"
    })
}
catch(err){
    res.status(500).json({
        success:false,
        err:err.message
    })
}
})
router.delete("/webseries/:id/seasons/:season", async(req, res)=>{
  try{
  const id = req.params.id
  const seasonNumber = Number(req.params.season)
  const data = await DeleteSeason({id, seasonNumber})
  res.json({
    success:data,
    message:"season successfully deleted"
  })
}
  catch(err){
    res.status(500).json({
      success:false,
      err:err.message
    })
  }
})

module.exports = router;
