const genreDb = require("../DAO/genreDb")

function sendGenre(body){
    try{
   
    const result = genreDb(body)
    return  result
    }
    catch(err){
        return err
    }
    
}
module.exports = sendGenre