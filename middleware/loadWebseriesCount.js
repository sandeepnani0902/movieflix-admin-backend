const getDb = require("../common/getdb");

module.exports = async function loadWebseriesCount(req, res, next) {
  try {
    const db = await getDb();
    const data = await db.collection("WebSeries").find().toArray();
    req.webseriesCount = data.length; // store in request
    console.log(req.webseriesCount)
    next();
  } catch (err) {
    console.error("DB Error:", err.message);
    next();
  }
};

