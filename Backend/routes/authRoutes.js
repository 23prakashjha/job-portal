// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// ------------------- Auth Routes -------------------

// Register a regular user
router.post("/register", async (req, res, next) => {
  try {
    await authController.register(req, res);
  } catch (err) {
    next(err);
  }
});

// Register a recruiter
router.post("/recruiter-register", async (req, res, next) => {
  try {
    await authController.recruiterRegister(req, res);
  } catch (err) {
    next(err);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (err) {
    next(err);
  }
});

// Get user profile (protected route)
router.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    await authController.getProfile(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

