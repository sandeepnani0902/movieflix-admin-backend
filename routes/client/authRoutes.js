const express = require("express");
const { registerUser, loginUser } = require("../../controllers/client/authController");
const upload = require("../../middleware/clientUpload");
const asyncHandler = require("../../utils/asyncHandler");

const router = express.Router();

router.post("/register", upload.single("profile"), asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));

module.exports = router;
