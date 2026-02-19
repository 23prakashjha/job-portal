const jwt = require("jsonwebtoken");

/**
 * Authentication middleware
 * Verifies JWT token and attaches user info to req.user
 */
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should contain { id, role } as set during login
    if (!decoded || !decoded.id || !decoded.role) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    // Attach user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authMiddleware;




