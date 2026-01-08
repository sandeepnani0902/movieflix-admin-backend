const express = require("express")
const router = express.Router()
const sendGenre = require("../service/genreService")
const getdb = require("../../common/getdb")
const mongodb = require("mongodb")


router.get("/genre", async(req, res)=>{
  try{
    const db =await getdb()
    const data =await db.collection("genre").find().toArray()
    res.status(200).json({
      success:true,
      message:"fetching data sucessfully",
      data:data,
      error:''
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:'something went wrong',
      error:err.message
    })
  }
    
})

router.post("/genre", async(req, res)=>{

    try{ 
      const data = await  sendGenre(req.body)
      res.status(200).json({
        success:true,
        message:"successfully genre added",
        data:data,
        error:""
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
router.delete("/genre/:id", async(req, res)=>{
  try{
    const id = req.params
    const db= await getdb()
    const collection = db.collection("genre")
    const data = await collection.deleteOne({_id :new mongodb.ObjectId(id)})
    res.status(200).json({
      success:true,
      message:"successfully genre deleted",
      data:data,
      error:""
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
module.exports = router