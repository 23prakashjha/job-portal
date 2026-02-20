// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeDatabase } = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// ------------------- CORS -------------------
app.use(cors({
  origin: "https://job-portal-wheat-one.vercel.app/", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // allow cookies if needed
}));

// ------------------- Middleware -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------- Health Check -------------------
app.get("/", (req, res) => {
  res.send("🚀 Job Portal API Running");
});

// ------------------- Routes -------------------
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/applications", applicationRoutes);

// ------------------- Global Error Handler -------------------
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// ------------------- Start Server -------------------
const startServer = async () => {
  try {
    await initializeDatabase(); // make sure DB connects first
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server due to DB error:", err.message);
    process.exit(1);
  }
};

startServer();
