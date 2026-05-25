const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["movie", "webseries"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    language: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

favoriteSchema.index({ clientId: 1, mediaId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema, "favorites");
module.exports = Favorite;
