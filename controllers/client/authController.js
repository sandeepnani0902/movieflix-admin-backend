const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../../models/User");
const { sendSuccess, sendError } = require("../../utils/apiResponse");

// Register a new user
const registerUser = async (req, res) => {
  const { firstname, lastname, email, mobile, password, confirmpassword } = req.body;

  // Basic validation
  if (!firstname || !lastname || !email || !mobile || !password || !confirmpassword) {
    return sendError(res, "All fields are required", 400);
  }

  if (password !== confirmpassword) {
    return sendError(res, "Password and Confirm Password do not match", 400);
  }

  // Check if email already registered
  const existingEmail = await Client.findOne({ email });
  if (existingEmail) {
    return sendError(res, "Email is already registered", 400);
  }

  // Check if mobile already in use
  const existingMobile = await Client.findOne({ mobile });
  if (existingMobile) {
    return sendError(res, "Mobile number already in use", 400);
  }

  const hashedpassword = await bcrypt.hash(password, 12);

  const newUser = new Client({
    firstname,
    lastname,
    email,
    mobile,
    password: hashedpassword,
    profile: req.file ? req.file.filename : "",
  });

  await newUser.save();
  return sendSuccess(res, "User registered successfully", null, 201);
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login user", { email, password })
  if (!email || !password) {
    return sendError(res, "Email and password required", 400);
  }

  const user = await Client.findOne({ email });
  if (!user) {
    return sendError(res, "User not found", 400);
  }

  const ismatched = await bcrypt.compare(password, user.password);
  if (!ismatched) {
    return sendError(res, "Incorrect password", 401);
  }

  const secret = process.env.JWT_SECRET || process.env.MY_SECRET_KEY || "movieflix123";
  const token = jwt.sign(
    { id: user._id, name: `${user.firstname} ${user.lastname}` },
    secret,
    { expiresIn: "2h" }
  );

  if (!token) {
    return sendError(res, "Token generation failed", 500);
  }

  return sendSuccess(
    res,
    "Login successful",
    {
      user: {
        id: user._id,
        fullname: `${user.firstname} ${user.lastname}`,
        email: user.email,
        mobile: user.mobile,
        profile: user.profile ? `http://localhost:2025/uploads/${user.profile}` : null,
      },
      token,
    },
    200
  );
};

module.exports = {
  registerUser,
  loginUser,
};
