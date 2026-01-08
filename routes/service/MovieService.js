const {MovieDb,GetMovieDb,DeleteMovieDb} = require("../DAO/MovieDb")
 async function AddMovieService(req){
    try{
       
    const {title, director, date, genre, language, description, videourl} = req.body
      const image = req.files?.image?.[0]?.path;
      const banner = req.files?.banner?.[0]?.path;
    const document = {
        title,
        director,
        date,
        genre,
        language,
        description,
        videourl,
        image,
        banner
    }
    console.log(document)
  const response = await MovieDb(document)
  return response
}
catch(err){
    return err
}
}
async function GetMovies(req){
 try{
  const response = await GetMovieDb(req)
  return response
 }
 catch(err){
  return err
 }
}

async function DeleteMovie(req){
  try{
  const id = req.params
  const response = await  DeleteMovieDb(id)
  return response
}
  catch(err){
    return err
  }
}
// updat series title



module.exports = {AddMovieService,GetMovies,DeleteMovie}