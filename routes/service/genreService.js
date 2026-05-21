const genreDb = require("../DAO/genreDb")

async function sendGenre(body){
    try{
     const result = await genreDb(body)
     return  result
    }
    catch(err){
        throw err
    }
}
module.exports = sendGenre