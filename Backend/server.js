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

// Enable CORS
app.use(cors());

// Parse JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Job Portal API Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/applications", applicationRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server AFTER DB is ready
const startServer = async () => {
  try {
    await initializeDatabase(); // ✅ Await DB initialization
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server due to DB error:", err.message);
    process.exit(1); // Exit process if DB cannot connect
  }
};

startServer();
