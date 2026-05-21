const {AddWebseriesDb, GetWebseriesDb, DeleteWebseriesDb,UpdateSerieDb} = require("../DAO/WebSeriesDb")
const  AddWebSeries = async(req) => {
    try{
    const {title, director, date, language, genre, description, seasons} = req.body
    const image = req.files?.find(f => f.fieldname === "webseriesImage")?.path
    const banner = req.files?.find(f => f.fieldname === "webseriesbanner")?.path
    const document ={
        _id: req.body._id,
        title,
        director,
        date,
        language,
        genre,
        description,
        image,
        banner,
        seasons:[],
       
    }
 const response = await  AddWebseriesDb(document)
 return response
}
catch(err){
    throw err
}
 //  getting data from db   
}

const  GetWebseriesService = async(req)=>{
   try{
    const response = await GetWebseriesDb(req)
    return response
   }
   catch(err){
    throw err
   }
}

// delete series from db 
const DeteleWebseries = async(req)=>{
    try{
        const id = req.params.id
        const response = await DeleteWebseriesDb(id)
        return response
    }
    catch(err){
        throw err
    }
}
 const  UpdateWebseriesTitle = async({id, title}) =>{
  try{
  const response = await  UpdateSerieDb({id, title})
  return response
  }
  catch(err){
    throw err
  }
}
module.exports = {AddWebSeries, GetWebseriesService, DeteleWebseries, UpdateWebseriesTitle}