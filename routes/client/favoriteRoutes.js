const express = require("express");
const { toggleFavorite, getFavorites, checkFavoriteStatus } = require("../../controllers/client/favoriteController");
const verifyToken = require("../../middleware/clientAuth");
const asyncHandler = require("../../utils/asyncHandler");

const router = express.Router();

router.post("/favorites/toggle", verifyToken, asyncHandler(toggleFavorite));
router.get("/favorites", verifyToken, asyncHandler(getFavorites));
router.get("/favorites/check/:mediaId", verifyToken, asyncHandler(checkFavoriteStatus));

module.exports = router;
