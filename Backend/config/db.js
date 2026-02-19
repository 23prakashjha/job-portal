const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

const initializeDatabase = async () => {
  try {
    // Step 1: Create connection without DB
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    // Step 2: Create database
    await connection.query(`CREATE DATABASE IF NOT EXISTS job_portal`);
    console.log("✅ Database checked/created");

    await connection.end();

    // Step 3: Create pool
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: "job_portal",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("✅ Connected to MySQL Database");

    await createTables();

  } catch (error) {
    console.error("❌ Database Initialization Failed:", error);
    process.exit(1);
  }
};

const createTables = async () => {
  try {

    // ================= USERS TABLE =================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user','recruiter') DEFAULT 'user',
        company_name VARCHAR(150),
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table ready");


    // ================= JOBS TABLE =================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        recruiter_id INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        company VARCHAR(150),
        description TEXT NOT NULL,
        responsibilities TEXT,
        qualifications TEXT,
        skills TEXT,
        salary_min DECIMAL(12,2) NOT NULL,
        salary_max DECIMAL(12,2) NOT NULL,
        job_type VARCHAR(100) NOT NULL,
        experience_level VARCHAR(100) NOT NULL,
        location VARCHAR(150),
        remote TINYINT(1) DEFAULT 0,
        category VARCHAR(100),
        vacancies INT DEFAULT 1,
        deadline DATE,
        benefits TEXT,
        status ENUM('open','closed') DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        INDEX idx_recruiter (recruiter_id),
        INDEX idx_category (category),
        INDEX idx_job_type (job_type),

        FOREIGN KEY (recruiter_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
      )
    `);
    console.log("✅ Jobs table ready");


    // ================= APPLICATIONS TABLE =================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        job_id INT NOT NULL,
        user_id INT NOT NULL,
        cover_letter TEXT,
        resume VARCHAR(255),
        status ENUM('applied','shortlisted','rejected') DEFAULT 'applied',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_job (job_id),
        INDEX idx_user (user_id),

        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Applications table ready");


    // ================= RESUMES TABLE =================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        full_name VARCHAR(150),
        education TEXT,
        experience TEXT,
        skills TEXT,
        projects TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_resume_user (user_id),

        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ Resumes table ready");


    // ================= ATS SCORES TABLE =================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ats_scores (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        job_id INT NOT NULL,
        score INT,
        matched_keywords TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_ats_user (user_id),
        INDEX idx_ats_job (job_id),

        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
      )
    `);
    console.log("✅ ATS Scores table ready");

  } catch (error) {
    console.error("❌ Error Creating Tables:", error);
  }
};

module.exports = {
  initializeDatabase,
  getPool: () => pool,
};

