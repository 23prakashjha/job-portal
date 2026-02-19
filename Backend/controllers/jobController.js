const { getPool } = require("../config/db");

// =============================
// GET ALL JOBS
// =============================
const getJobs = async (req, res) => {
  try {
    const pool = getPool();

    const [jobs] = await pool.query(`
      SELECT j.*, u.company_name
      FROM jobs j
      JOIN users u ON j.recruiter_id = u.id
      ORDER BY j.created_at DESC
    `);

    res.status(200).json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// GET JOB BY ID
// =============================
const getJobById = async (req, res) => {
  try {
    const pool = getPool();
    const jobId = req.params.id;

    const [rows] = await pool.query(
      `SELECT j.*, u.company_name
       FROM jobs j
       JOIN users u ON j.recruiter_id = u.id
       WHERE j.id = ?`,
      [jobId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// CREATE JOB
// =============================
const createJob = async (req, res) => {
  try {
    const pool = getPool();

    if (!req.user || req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can create jobs" });
    }

    let {
      title,
      company,
      description,
      responsibilities,
      qualifications,
      skills,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      location,
      remote,
      category,
      vacancies,
      deadline,
      benefits
    } = req.body;

    // Convert salary to numbers safely
    salary_min = Number(salary_min);
    salary_max = Number(salary_max);

    // STRONG validation
    if (
      !title?.trim() ||
      !description?.trim() ||
      isNaN(salary_min) ||
      isNaN(salary_max) ||
      !job_type?.trim() ||
      !experience_level?.trim()
    ) {
      return res.status(400).json({
        message: "All required fields must be properly filled"
      });
    }

    if (salary_min < 0 || salary_max < salary_min) {
      return res.status(400).json({
        message: "Invalid salary range"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO jobs (
        recruiter_id,
        title,
        company,
        description,
        responsibilities,
        qualifications,
        skills,
        salary_min,
        salary_max,
        job_type,
        experience_level,
        location,
        remote,
        category,
        vacancies,
        deadline,
        benefits
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        title.trim(),
        company || null,
        description.trim(),
        responsibilities || null,
        qualifications || null,
        skills || null,
        salary_min,
        salary_max,
        job_type.trim(),
        experience_level.trim(),
        location || null,
        remote ? 1 : 0,
        category || null,
        vacancies || 1,
        deadline || null,
        benefits || null
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      jobId: result.insertId
    });

  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// UPDATE JOB
// =============================
const updateJob = async (req, res) => {
  try {
    const pool = getPool();
    const jobId = req.params.id;

    if (!req.user || req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can update jobs" });
    }

    let {
      title,
      company,
      description,
      responsibilities,
      qualifications,
      skills,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      location,
      remote,
      category,
      vacancies,
      deadline,
      benefits
    } = req.body;

    salary_min = Number(salary_min);
    salary_max = Number(salary_max);

    if (
      !title?.trim() ||
      !description?.trim() ||
      isNaN(salary_min) ||
      isNaN(salary_max) ||
      !job_type?.trim() ||
      !experience_level?.trim()
    ) {
      return res.status(400).json({
        message: "All required fields must be properly filled"
      });
    }

    if (salary_min < 0 || salary_max < salary_min) {
      return res.status(400).json({
        message: "Invalid salary range"
      });
    }

    const [result] = await pool.query(
      `UPDATE jobs SET
        title = ?,
        company = ?,
        description = ?,
        responsibilities = ?,
        qualifications = ?,
        skills = ?,
        salary_min = ?,
        salary_max = ?,
        job_type = ?,
        experience_level = ?,
        location = ?,
        remote = ?,
        category = ?,
        vacancies = ?,
        deadline = ?,
        benefits = ?
      WHERE id = ? AND recruiter_id = ?`,
      [
        title.trim(),
        company || null,
        description.trim(),
        responsibilities || null,
        qualifications || null,
        skills || null,
        salary_min,
        salary_max,
        job_type.trim(),
        experience_level.trim(),
        location || null,
        remote ? 1 : 0,
        category || null,
        vacancies || 1,
        deadline || null,
        benefits || null,
        jobId,
        req.user.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found or unauthorized"
      });
    }

    res.status(200).json({ message: "Job updated successfully" });

  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============================
// DELETE JOB
// =============================
const deleteJob = async (req, res) => {
  try {
    const pool = getPool();
    const jobId = req.params.id;

    if (!req.user || req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can delete jobs" });
    }

    const [result] = await pool.query(
      "DELETE FROM jobs WHERE id = ? AND recruiter_id = ?",
      [jobId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Job not found or unauthorized"
      });
    }

    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};

