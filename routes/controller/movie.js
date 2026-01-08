const express = require("express")
const router = express.Router()
const upload = require("../../middleware/multerConfig")
const {AddMovieService, GetMovies,DeleteMovie} = require("../service/MovieService")

router.get('/movies', async(req, res)=>{
    try{
    const data=await GetMovies(req)
    res.status(200).json({
        success:true,
        message:'successfully get movies data..',
        data:data,
        error:""
    })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"server error...",
            error:err.message
        })
    }
})
router.post("/addmovie",upload.fields([
    { name:"image", maxCount:1},
     { name:"banner", maxCount:1 }
    ])
     ,async(req, res)=>{
    try{
    const response = await AddMovieService(req)
    res.status(201).json({
        success:true,
        data:response,
        message:"successfully new movie added..",
        error:""
    })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"something went wrong..",
            error:err.message
        })
    }

})
router.delete("/movies/deletemovie/:id", async(req, res)=>{
  try{
   const response =await DeleteMovie(req)
  res.status(200).json({
    success:true,
    message:"successfully movie deleted from db",
    error:""
  })
  }
  catch(err){
    res.status(500).json({
        success:false,
        message:"movie not deleted.",
        error:err.message
    })
  }
})

module.exports = router;