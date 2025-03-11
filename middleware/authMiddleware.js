// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach user ID to request
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
