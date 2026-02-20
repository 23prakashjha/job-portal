import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";

const RecruiterAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      company_name: "",
    });
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const res = await axios.post(
          "https://job-portal-wizd.onrender.com/api/auth/login",
          {
            email: form.email,
            password: form.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data.user.role !== "recruiter") {
          toast.error("Access denied! Not a recruiter.");
          setLoading(false);
          return;
        }

        // Save token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Recruiter Login Successful!");
        navigate("/recruiter/dashboard");
      } else {
        // Register
        await axios.post(
          "https://job-portal-wizd.onrender.com/api/auth/recruiter-register",
          form,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        toast.success("Recruiter Registered Successfully!");
        toggleMode();
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md transition-all duration-300">
        <div className="flex justify-center mb-4">
          <FaBuilding className="text-green-600 text-4xl" />
        </div>

        <h2 className="text-3xl font-bold text-black text-center mb-6">
          {isLogin ? "Recruiter Login" : "Recruiter Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              />

              <input
                type="text"
                name="company_name"
                value={form.company_name}
                placeholder="Company Name"
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-black mt-6">
          {isLogin ? "Don't have a recruiter account?" : "Already registered?"}
          <button
            onClick={toggleMode}
            className="ml-2 font-semibold underline hover:text-green-700"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecruiterAuth;


