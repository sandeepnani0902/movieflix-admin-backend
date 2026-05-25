const Favorite = require("../../models/Favorite");
const { sendSuccess, sendError } = require("../../utils/apiResponse");

// Toggle favorite status
const toggleFavorite = async (req, res) => {
  const { mediaId, mediaType, title, image, genre, language } = req.body;

  if (!mediaId || !mediaType || !title || !image) {
    return sendError(res, "Missing required fields", 400);
  }

  const existing = await Favorite.findOne({ clientId: req.userId, mediaId });

  if (existing) {
    await Favorite.deleteOne({ _id: existing._id });
    return sendSuccess(res, "Removed from favorites", { favorited: false }, 200);
  }

  const favorite = new Favorite({
    clientId: req.userId,
    mediaId,
    mediaType,
    title,
    image,
    genre,
    language,
  });

  await favorite.save();
  return sendSuccess(res, "Added to favorites", { favorited: true, favorite }, 201);
};

// Get all favorites for the logged-in user
const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ clientId: req.userId }).sort({ createdAt: -1 });
  return sendSuccess(res, "Favorites retrieved successfully", { favorites }, 200);
};

// Check if a media item is favorited
const checkFavoriteStatus = async (req, res) => {
  const { mediaId } = req.params;
  const favorite = await Favorite.findOne({ clientId: req.userId, mediaId });
  return sendSuccess(res, "Favorite check completed", { favorited: !!favorite }, 200);
};

module.exports = {
  toggleFavorite,
  getFavorites,
  checkFavoriteStatus,
};
