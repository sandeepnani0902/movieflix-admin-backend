const { ObjectId } = require("mongodb");

function generateSeriesId(req, res, next) {
  // Create an ID that we will use for folder creation
  const newId = new ObjectId();
  req.seriesId = newId.toString();
  req.preGeneratedSeriesId = newId; // needed later to insert into DB
  next();
}

module.exports = generateSeriesId;
