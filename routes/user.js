const express = require("express")
const router = express.Router()
const getdb = require("../common/getdb")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const upload = require("../middleware/multerConfig")
const { ObjectId } = require("mongodb")
const nodemailer = require("nodemailer")


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

router.post("/forgot-password", async (req, res) => {
  try {

    const { email } = req.body;

    console.log("email:", email);

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const db = await getdb();

    const user = await db
      .collection("users")
      .findOne({ email });

    console.log("user:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink =
      `http://localhost:5173/reset-password/${token}`;

    console.log("token:", token);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>

        <a href="${resetLink}">
          Click Here To Reset Password
        </a>
      `,
    };

    transporter.sendMail(
      mailOptions,
      (err, info) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error sending email"
          });
        }

        console.log(info);

        res.json({
          success: true,
          message:
            "Password reset link sent successfully"
        });
      }
    );

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});
// router.post("/forgot-password", async(req, res)=>{
//   const {email} = req.body
//   console.log("email", email)
//   if(!email){
//     return res.status(400).json({message:"email is required"})
//   }
//   const db = await getdb()
//   const user = await db.collection("users").findOne({email})
//   console.log("user", user)
//   if(!user){
//     return res.status(404).json({message:"user not found"})
//   }
//   const token = jwt.sign({userId:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:"15m"})
//   const resetLink =  `http://localhost:5173/reset-password/${token}`;
//   // send email to user with reset link
//   console.log("token",token)
//   const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//       user:process.env.EMAIL_USER,
//       pass:process.env.EMAIL_PASS
//     }
//   })
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject:"Password Reset Request",
//     // text:`You requested a password reset. Click the link to reset your password: ${resetLink}`
//      html: `
//       <h3>Password Reset</h3>
//       <a href="${resetLink}">
//         Click Here To Reset Password
//       </a>
//     `,
//   }
//   console.log("mailopttoions",mailOptions)
//   transporter.sendMail(mailOptions, (err, info)=>{
//     if(err){
//       console.error("Error sending email:", err)
//       return res.status(500).json({message:"error sending email"})
//     }
//     res.json({message:"password reset link sent to your email"})
//   })


// })

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

 


module.exports = router;