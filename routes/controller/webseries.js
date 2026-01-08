const express = require("express")
const upload = require("../../middleware/multerConfig")
const { AddWebSeries, GetWebseriesService, DeteleWebseries,UpdateWebseriesTitle } = require("../service/webseriesService")
// const loadWebseriesCount = require("../../middleware/loadWebseriesCount")
const generateSeriesId = require("../../middleware/generateSeriesId")
const router = express.Router()
const fs =  require("fs")
const path = require("path");

// Helper to delete folder recursively
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log("Deleted folder:", folderPath);
  }
}

// adding webseries document and files 
router.post("/webseries", generateSeriesId,
    upload.any(),
    async(req, res)=>{
   try{
         req.body._id = req.preGeneratedSeriesId;
        const insertedId = await AddWebSeries(req);
        res.status(200).json({
            success:true,
            message:"web-series uploaded successfully.",
            id:insertedId
        })
    }
catch(err){
        res.status(500).json({
            success:false,
            message:"something went wrong",
            error:err.message
        })
}  
})

//  getting response from  service  and send it to client
router.get("/webseries",async(req, res, next)=>{
   try{
        const data = await  GetWebseriesService(req)
        res.status(200).json({
            success:true,
            message:"successfully received data",
            data:data
        })
   }
   catch(err){
        res.status(500).json({
            success:false,
            message:"request failure....",
            error:err.message
        })
   }
})

// delete webseries with Id

router.delete("/webseries/:id",async(req, res)=>{
    try{
         const deleteRes = await DeteleWebseries(req);

    if (deleteRes.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Series not found",
        
      });
    }

        // Delete folder
      const folderPath = path.join(__dirname, "../../uploads/webseries/", req.params.id);
       deleteFolderRecursive(folderPath);
        res.status(200).json({
            success:true,
            message:"Successfully deleted series and files"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"something went wrong , series not deleted",
            error:err.message
        })
    }
})

router.post("/webseries/:id/updatetitle", async(req, res)=>{
    try{
    const  {id}= req.params
    const {title} = req.body
    console.log(id, title)
    const response = await UpdateWebseriesTitle({id, title})
    res.json({
        success:true,
        id, 
        title, 
        response
    })
    
}
catch(err){
    throw err
}
})


module.exports = router
