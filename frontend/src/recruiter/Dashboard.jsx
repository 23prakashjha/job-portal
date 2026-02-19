import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaPlusCircle,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://job-portal-wizd.onrender.com/api/recruiter/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/recruiter-auth");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-screen w-72 bg-linear-to-b from-green-600 to-teal-600 text-white p-6 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-10">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:scale-105 transition"
          >
            🚀 HireNest
          </Link>
          <FaTimes
            className="md:hidden cursor-pointer text-xl"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <nav className="space-y-3">
          <NavLink
            to="/recruiter/add-job"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                ? "bg-white text-green-600 font-semibold"
                : "hover:bg-white/20"
              }`
            }
          >
            <FaPlusCircle /> Add Job
          </NavLink>

          <NavLink
            to="/recruiter/manage-jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${isActive
                ? "bg-white text-green-600 font-semibold"
                : "hover:bg-white/20"
              }`
            }
          >
            <FaBriefcase /> Manage Jobs
          </NavLink>

          
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <FaBars
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />

          <h1 className="text-xl md:text-2xl font-bold text-gray-700">
            Recruiter Dashboard
          </h1>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              <FaUserCircle size={22} />
              <span className="hidden md:block font-medium">
                {user?.name || "Recruiter"}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg py-2 text-gray-800">
                <NavLink
                  to="/recruiter/company-profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <FaBuilding /> Company Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Stats Section */}
        <main className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border-l-4 border-indigo-600">
              <h2 className="text-lg font-semibold text-gray-600 mb-3">
                Total Jobs Posted
              </h2>
              <p className="text-4xl font-bold text-indigo-600">
                {stats.totalJobs}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border-l-4 border-green-600">
              <h2 className="text-lg font-semibold text-gray-600 mb-3">
                Total Applicants
              </h2>
              <p className="text-4xl font-bold text-green-600">
                {stats.totalApplicants}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
