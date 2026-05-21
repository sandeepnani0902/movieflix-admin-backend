// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// function ensureFolder(folderPath) {
//   fs.mkdirSync(folderPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = "uploads/others";

//     // PROFILE
//     if (file.fieldname === "profile") {
//       uploadPath = "uploads/profile";
//     }

//     // MOVIES
//     else if (file.fieldname === "image") {
//       uploadPath = "uploads/movies/image";
//     }
//     else if (file.fieldname === "banner") {
//       uploadPath = "uploads/movies/banner";
//     // }

//     // WEBSERIES MAIN
//     else if (file.fieldname === "webseriesImage") {
//       if (!req.seriesId) return cb(new Error("seriesId missing"), null);
//       uploadPath = path.join("uploads/webseries", req.seriesId, "image");
//     }

//     else if (file.fieldname === "webseriesbanner") {
//       if (!req.seriesId) return cb(new Error("seriesId missing"), null);
//       uploadPath = path.join("uploads/webseries", req.seriesId, "banner");
//     }

//     // SEASON IMAGE
//     else {
//       const seasonMatch = file.fieldname.match(/season(\d+)_image/);

//       if (seasonMatch) {
//         if (!req.seriesId) return cb(new Error("seriesId missing"), null);

//         uploadPath = path.join(
//           "uploads/webseries",
//           req.seriesId,
//           "seasons",
//           `season${seasonMatch[1]}`
//         );
//       }

//       // EPISODE BANNER
//       if (file.fieldname === "episodebanner") {
//         // const { webseriesId, seasonNumber, episodeNumber } = req;
//          const webseriesId = req.params.id;        // ✅ always available
//         const seasonNumber = req.body.season;     // ✅ parsed by Multer
//         const episodeNumber = req.body.episodenumber;
        
//         if (!webseriesId || !seasonNumber || !episodeNumber) {
//           return cb(new Error("Episode data missing"), null);
//         }

//         uploadPath = path.join(
//           "uploads/webseries",
//           webseriesId,
//           "seasons",
//           `season${seasonNumber}`,
//           "episodes",
//           `episode${episodeNumber}`
//         );
//       }
//     }

//     ensureFolder(uploadPath);
//     cb(null, uploadPath);
//   },

//   filename: (req, file, cb) => {
//     const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${unique}-${file.originalname}`);
//   }
// });

// module.exports = multer({ storage });
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "movieflix/others";

    // PROFILE
    if (file.fieldname === "profile") {
      folder = "movieflix/profile";
    }

    // MOVIES
    else if (file.fieldname === "image") {
      folder = "movieflix/movies/image";
    } 
    else if (file.fieldname === "banner") {
      folder = "movieflix/movies/banner";
    }

    // WEBSERIES MAIN
    else if (file.fieldname === "webseriesImage") {
      if (!req.seriesId) throw new Error("seriesId missing");

      folder = `movieflix/webseries/${req.seriesId}/image`;
    } 
    else if (file.fieldname === "webseriesbanner") {
      if (!req.seriesId) throw new Error("seriesId missing");

      folder = `movieflix/webseries/${req.seriesId}/banner`;
    }

    // SEASON IMAGE
    else {
      const seasonMatch = file.fieldname.match(/season(\d+)_image/);

      if (seasonMatch) {
        if (!req.seriesId) throw new Error("seriesId missing");

        folder = `movieflix/webseries/${req.seriesId}/seasons/season${seasonMatch[1]}`;
      }

      // EPISODE BANNER
      if (file.fieldname === "episodebanner") {
        const webseriesId = req.params.id;
        const seasonNumber = req.body.season;
        const episodeNumber = req.body.episodenumber;

        if (!webseriesId || !seasonNumber || !episodeNumber) {
          throw new Error("Episode data missing");
        }

        folder = `movieflix/webseries/${webseriesId}/seasons/season${seasonNumber}/episodes/episode${episodeNumber}`;
      }
    }

    return {
      folder,
      resource_type: "image",
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

module.exports = multer({ storage });

