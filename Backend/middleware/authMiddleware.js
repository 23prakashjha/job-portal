// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Authentication middleware
 * Verifies JWT token and attaches user info to req.user
 */
const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Validate decoded payload
    if (!decoded || !decoded.id || !decoded.role) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    // 4️⃣ Attach user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name, // optional, include if you want
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
