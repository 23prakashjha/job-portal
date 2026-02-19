const { getPool } = require("../config/db");
const path = require("path");
const fs = require("fs").promises;

// ============================================
// Apply for Job
// ============================================
const applyJob = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { jobId, coverLetter } = req.body;
    const resumeFile = req.file;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!jobId) return res.status(400).json({ message: "Job ID required" });
    if (!resumeFile)
      return res.status(400).json({ message: "Resume file required" });

    const pool = getPool();

    // Check if already applied
    const [existing] = await pool.query(
      "SELECT id FROM applications WHERE user_id = ? AND job_id = ?",
      [userId, jobId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    // Create upload directory
    const uploadDir = path.join(__dirname, "..", "uploads", "resumes");
    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${resumeFile.originalname.replace(
      /\s+/g,
      "_"
    )}`;

    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, resumeFile.buffer);

    // Insert application
    await pool.query(
      `INSERT INTO applications 
      (user_id, job_id, cover_letter, resume, status, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        userId,
        jobId,
        coverLetter || "",
        `/uploads/resumes/${filename}`,
        "pending",
      ]
    );

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Apply Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Get My Applications
// ============================================
const getMyApplications = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const pool = getPool();

    const [rows] = await pool.query(
      `SELECT 
        a.id,
        a.status,
        a.cover_letter,
        a.resume,
        a.created_at,
        j.id AS jobId,
        j.title,
        j.company,
        j.location
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.user_id = ?
      ORDER BY a.id DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get My Applications Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Check Application
// ============================================
const checkApplication = async (req, res) => {
  try {
    const userId = req.user?.id;
    const jobId = req.params.jobId;

    const pool = getPool();

    const [rows] = await pool.query(
      "SELECT id FROM applications WHERE user_id = ? AND job_id = ?",
      [userId, jobId]
    );

    res.json({ applied: rows.length > 0 });
  } catch (error) {
    console.error("Check Application Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Get Application Status
// ============================================
const getApplicationStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    const jobId = req.params.jobId;

    const pool = getPool();

    const [rows] = await pool.query(
      "SELECT status FROM applications WHERE user_id = ? AND job_id = ?",
      [userId, jobId]
    );

    res.json({ status: rows.length ? rows[0].status : null });
  } catch (error) {
    console.error("Get Application Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Delete Application
// ============================================
const deleteApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user?.id;
    const pool = getPool();

    const [result] = await pool.query(
      "DELETE FROM applications WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Application not found" });

    res.json({ message: "Application withdrawn successfully" });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Get Applicants (Recruiter)
// ============================================
const getApplicantsByJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const pool = getPool();

    const [rows] = await pool.query(
      `SELECT 
        a.id,
        a.cover_letter,
        a.status,
        a.resume,
        a.created_at,
        u.id AS userId,
        u.name,
        u.email
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.job_id = ?
      ORDER BY a.id DESC`,
      [jobId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get Applicants Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Get Shortlisted Applicants
// ============================================
const getShortlistedApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const pool = getPool();

    const [rows] = await pool.query(
      `SELECT 
        a.id,
        a.cover_letter,
        a.status,
        a.resume,
        a.created_at,
        u.name,
        u.email
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.job_id = ? AND a.status = 'shortlisted'
      ORDER BY a.id DESC`,
      [jobId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Get Shortlisted Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Shortlist Applicant
// ============================================
const shortlistApplicant = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = getPool();

    const [result] = await pool.query(
      "UPDATE applications SET status = 'shortlisted' WHERE id = ?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Application not found" });

    res.json({ message: "Applicant shortlisted successfully" });
  } catch (error) {
    console.error("Shortlist Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================
// Reject Applicant
// ============================================
const rejectApplicant = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = getPool();

    const [result] = await pool.query(
      "UPDATE applications SET status = 'rejected' WHERE id = ?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Application not found" });

    res.json({ message: "Applicant rejected successfully" });
  } catch (error) {
    console.error("Reject Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  checkApplication,
  getApplicationStatus,
  deleteApplication,
  getApplicantsByJob,
  getShortlistedApplicants,
  shortlistApplicant,
  rejectApplicant,
};
