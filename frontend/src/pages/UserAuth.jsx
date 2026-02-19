import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const UserAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

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

    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: form.email,
            password: form.password,
          }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login Successful!");
        navigate("/");
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          form
        );

        toast.success("Registered Successfully! Please Login.");
        toggleMode();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-black/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md transition-all duration-300">
        
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
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-black"></div>
          <span className="px-3 text-black text-sm">OR</span>
          <div className="flex-1 h-px bg-black"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white py-3 rounded-lg shadow hover:bg-black-100 transition"
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
            className="ml-2 font-semibold underline hover:text-black-200"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserAuth;
