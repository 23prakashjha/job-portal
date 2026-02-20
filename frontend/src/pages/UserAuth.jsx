import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const UserAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setForm({ name: "", email: "", password: "" });
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
          { headers: { "Content-Type": "application/json" } }
        );

        // Save token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login Successful!");
        navigate("/"); // Redirect after login
      } else {
        // Register
        await axios.post(
          "https://job-portal-wizd.onrender.com/api/auth/register",
          form,
          { headers: { "Content-Type": "application/json" } }
        );

        toast.success("Registered Successfully! Please Login.");
        toggleMode();
      }
    } catch (err) {
      console.error("Auth Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    // Redirect user to backend Google OAuth endpoint
    window.location.href = "https://job-portal-wizd.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-black text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span className="font-semibold text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-black mt-6">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="ml-2 font-semibold underline hover:text-indigo-600"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserAuth;

