const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  const secret = process.env.JWT_SECRET || process.env.MY_SECRET_KEY || "movieflix123";
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
