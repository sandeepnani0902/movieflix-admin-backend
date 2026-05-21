
const {InsertLanguageDb, getLanguagesDb, deleteLaguagefromDb} = require("../DAO/languageDb")
 async function LanguageService(body){
   
    try{
    const language= body.language  
   const result = await InsertLanguageDb(language)
   return result
    }
    catch(err){
        throw err
    }
}
 async function getLanguagesData(req) {
    try{
       const result = await  getLanguagesDb(req)
       return result
    } 
    catch(err){
        throw err
    } 
}

async function deleteLanguage(params) {
    try{
    const id  = params.id
    const result = await deleteLaguagefromDb(id)
    return result   
}
catch(err){
    throw err
}
}

module.exports = {LanguageService, getLanguagesData, deleteLanguage}