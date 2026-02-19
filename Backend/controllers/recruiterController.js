const { getPool } = require("../config/db");

const getDashboardStats = async (req, res) => {
  const pool = getPool();

  const [jobs] = await pool.query(
    "SELECT COUNT(*) as totalJobs FROM jobs WHERE recruiter_id=?",
    [req.user.id]
  );

  const [apps] = await pool.query(
    `SELECT COUNT(*) as totalApplicants 
     FROM applications 
     JOIN jobs ON applications.job_id = jobs.id 
     WHERE jobs.recruiter_id=?`,
    [req.user.id]
  );

  res.json({
    totalJobs: jobs[0].totalJobs,
    totalApplicants: apps[0].totalApplicants,
  });
};

module.exports = { getDashboardStats };
