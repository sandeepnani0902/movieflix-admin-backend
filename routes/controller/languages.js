const express = require("express")
const {LanguageService, getLanguagesData, deleteLanguage} = require("../service/languageService")
const router = express.Router()

router.get("/languages", async(req, res)=>{
   try{

     
     const data = await getLanguagesData(req) 
     res.status(200).json({
      success:true,
      message:"are you getting successfully",
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

router.post("/language",async (req, res)=>{
   try{

       const data = await LanguageService(req.body)
   res.status(201).json({
      success:true,
      message:"successfully added new language",
      data :data,
      error:""
   })
   }
   catch(err){
      res.status(500).json({
         success:true,
         message:'something went wrong',
         error:err.message
      })
   }
  
   })

router.delete("/language/:id", async(req, res)=>{
   try{
   const data = await deleteLanguage(req.params)
   res.status(200).json({
      success:true,
      message:"successfully deleted language",
      data:data,
      error:""
   })
   }
   catch(err){
      res.status(500).json({ 
         success:true,
         message:"something went wrong",
         error:err.message
       });
   }
})

module.exports = router