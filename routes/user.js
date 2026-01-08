const express = require("express")
const router = express.Router()
const getdb = require("../common/getdb")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const upload = require("../middleware/multerConfig")
const { ObjectId } = require("mongodb")


router.post("/register",upload.any({name:"profile"}), async(req, res) => {
  try{
  const {firstname, lastname, email,  mobile, password} = req.body
  const profile = req.files?.[0].path
  
  console.log(profile)
  const db = await getdb();
  
  const existsuser =await db.collection("users").findOne({email})
  if(existsuser){
   return  res.json({message:"user already existed.."})
  }
  
  // encrypting password 
  const salt =await bcrypt.genSalt(10)
  const encryptpassword = bcrypt.hashSync(password, salt)
  const response = await db.collection("users").insertOne({firstname, lastname, email, password:encryptpassword, mobile,profile})
  res.json({response})
}
  catch(err){
   return  res.status(500).send({"error":err})
  }
  
});


router.post("/login",async(req, res)=>{
  try{
  const {email, password} = req.body
  if(!email || !password){
    return res.json({message:"email and password are required to login...!"})
  }
  let db = await getdb()
  const userobj =await db.collection("users").findOne({email})
  // console.log(userobj)
  if(!userobj){
    return res.status(404).json({message:"user not found"})
  }
  const isPasswordMatch =await bcrypt.compare(String(password), userobj.password)
  if(!isPasswordMatch){
    return res.json({message:"invalid password..!"})
  }

  const token = jwt.sign({userId:userobj._id, email:userobj.email, type:"admin"}, process.env.JWT_SECRET, {expiresIn:"2hr"} )
  if(token){
   res.send({
    success:true,
    token
    })
  }
}
catch(err){
  return res.status(500).json({message:"something went wrong"})
}
})

router.get("/dashboard", verifytoken, async(req, res)=>{
  
  const userId = req.user.userId

  const db =  await getdb()
  const data =await db.collection("users").findOne({_id:new ObjectId(userId)})
  res.status(200).json({
    data
  })
  


})

function verifytoken(req, res, next){
  const authheader = req.headers['authorization'];
  const token = authheader && authheader.split(' ')[1];
  if(!token){
    return res.status(403).json({message:"token required"})
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if(err){
      res.status(401).json({message:"invalid or expired token"})

    }
    req.user = decoded;
    next()
  })
}



module.exports = router