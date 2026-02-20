const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getPool } = require("../config/db");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const pool = getPool();

  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hashedPassword, "user"]
    );

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const recruiterRegister = async (req, res) => {
  const { name, email, password, company_name } = req.body;
  const pool = getPool();

  try {
    // Check if email already exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name,email,password,role,company_name) VALUES (?,?,?,?,?)",
      [name, email, hashedPassword, "recruiter", company_name]
    );

    res.json({ message: "Recruiter registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const pool = getPool();

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (users.length === 0)
      return res.status(400).json({ message: "Invalid email" });

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  const pool = getPool();
  try {
    const [user] = await pool.query("SELECT * FROM users WHERE id=?", [req.user.id]);
    res.json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  recruiterRegister,
  login,
  getProfile,
};
