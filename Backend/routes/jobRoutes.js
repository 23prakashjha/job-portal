const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// =====================================================
// PUBLIC ROUTES
// =====================================================

// GET ALL JOBS
// GET /api/jobs
router.get("/", getJobs);

// GET JOB BY ID
// GET /api/jobs/:id
router.get("/:id", getJobById);


// =====================================================
// RECRUITER PROTECTED ROUTES
// =====================================================

// CREATE NEW JOB (Recruiter Only)
// POST /api/jobs
router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);

// UPDATE JOB (Recruiter Only)
// PUT /api/jobs/:id
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);

// DELETE JOB (Recruiter Only)
// DELETE /api/jobs/:id
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  deleteJob
);

module.exports = router;
