const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const {
  applyJob,
  getMyApplications,
  checkApplication,
  getApplicationStatus,
  deleteApplication,
  getApplicantsByJob,
  getShortlistedApplicants,
  shortlistApplicant,
  rejectApplicant,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ===============================
// USER ROUTES
// ===============================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("user"),
  upload.single("resume"),
  applyJob
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("user"),
  getMyApplications
);

router.get(
  "/check/:jobId",
  authMiddleware,
  roleMiddleware("user"),
  checkApplication
);

router.get(
  "/status/:jobId",
  authMiddleware,
  roleMiddleware("user"),
  getApplicationStatus
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("user"),
  deleteApplication
);

// ===============================
// RECRUITER ROUTES
// ===============================

router.get(
  "/job/:jobId/applicants",
  authMiddleware,
  roleMiddleware("recruiter"),
  getApplicantsByJob
);

router.get(
  "/job/:jobId/shortlisted",
  authMiddleware,
  roleMiddleware("recruiter"),
  getShortlistedApplicants
);

router.put(
  "/shortlist/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  shortlistApplicant
);

router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  rejectApplicant
);

module.exports = router;





