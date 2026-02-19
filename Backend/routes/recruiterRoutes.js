const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/dashboard", authMiddleware, roleMiddleware("recruiter"), recruiterController.getDashboardStats);

module.exports = router;
