import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinkStyle = (path) =>
    `transition duration-300 hover:text-yellow-300 ${
      location.pathname === path ? "text-yellow-300 font-semibold" : ""
    }`;

  return (
    <nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:scale-110 transition duration-300"
        >
          🚀 HireNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">

          <Link to="/" className={navLinkStyle("/")}>Home</Link>
          <Link to="/jobs" className={navLinkStyle("/jobs")}>Jobs</Link>
          <Link to="/about" className={navLinkStyle("/about")}>About</Link>
          <Link to="/resume-builder" className={navLinkStyle("/resume-builder")}>Resume</Link>
          <Link to="/resume-ats" className={navLinkStyle("/resume-ats")}>ATS Check</Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border border-white hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                User Login
              </Link>

              <Link
                to="/recruiter-auth"
                className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
              >
                Recruiter Login
              </Link>
            </>
          ) : (
            <div className="relative">

              {/* User Button */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center justify-center bg-white/20 w-10 h-10 rounded-full backdrop-blur-md hover:bg-white/30 transition duration-300"
              >
                <FaUserCircle size={22} />
              </button>

              {/* Dropdown */}
              {dropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-2xl shadow-2xl py-3 animate-slideDown">

                  {user.role === "recruiter" && (
                    <Link
                      to="/recruiter/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => setDropdown(false)}
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setDropdown(false)}
                  >
                    <FaUser /> Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setDropdown(false)}
                  >
                    <FaCog /> Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white text-gray-800 px-6 pb-6 pt-4 rounded-b-3xl shadow-2xl space-y-4 animate-slideDown">

          <Link to="/" className="block hover:text-indigo-600">Home</Link>
          <Link to="/jobs" className="block hover:text-indigo-600">Jobs</Link>
          <Link to="/about" className="block hover:text-indigo-600">About</Link>
          <Link to="/resume-builder" className="block hover:text-indigo-600">Resume</Link>
          <Link to="/resume-ats" className="block hover:text-indigo-600">ATS Check</Link>

          {!user ? (
            <>
              <Link to="/login" className="block">User Login</Link>
              <Link to="/recruiter-auth" className="block">Recruiter Login</Link>
            </>
          ) : (
            <>
              {user.role === "recruiter" && (
                <Link to="/recruiter/dashboard" className="block">
                  Dashboard
                </Link>
              )}
              <Link to="/profile" className="block">Profile</Link>
              <Link to="/settings" className="block">Settings</Link>
              <button
                onClick={handleLogout}
                className="block text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Animation Styles */}
      <style>
        {`
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
