import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaFilter,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    experience: "",
    salary: "",
    remote: false,
    sort: "",
  });

  const categories = [
    "Software Development",
    "Web Development",
    "Data Science",
    "Cyber Security",
    "Digital Marketing",
    "Finance",
    "Healthcare",
    "Engineering",
    "Human Resources",
    "AI & ML",
    "Cloud Computing",
  ];

  // ================= FETCH JOBS =================
  useEffect(() => {
    axios
      .get("https://job-portal-wizd.onrender.com/api/jobs")
      .then((res) => {
        const data = res.data || [];
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  // ================= FILTER & SORT =================
  useEffect(() => {
    let temp = [...jobs];

    // SEARCH
    if (filters.search.trim()) {
      temp = temp.filter((job) =>
        job.title?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // CATEGORY
    if (filters.category) {
      temp = temp.filter((job) => job.category === filters.category);
    }

    // LOCATION
    if (filters.location.trim()) {
      temp = temp.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // EXPERIENCE
    if (filters.experience) {
      temp = temp.filter(
        (job) =>
          job.experience === filters.experience ||
          job.experience_level === filters.experience
      );
    }

    // SALARY FILTER (SAFE)
    if (filters.salary) {
      temp = temp.filter((job) => {
        const salary =
          job.salary ||
          job.salary_max ||
          job.salaryMax ||
          0;

        return Number(salary) >= Number(filters.salary);
      });
    }

    // REMOTE
    if (filters.remote) {
      temp = temp.filter((job) => job.remote === true);
    }

    // SORTING
    if (filters.sort === "newest") {
      temp.sort(
        (a, b) =>
          new Date(b.createdAt || b.created_at) -
          new Date(a.createdAt || a.created_at)
      );
    }

    if (filters.sort === "salary") {
      temp.sort((a, b) => {
        const salaryA =
          a.salary || a.salary_max || a.salaryMax || 0;
        const salaryB =
          b.salary || b.salary_max || b.salaryMax || 0;

        return Number(salaryB) - Number(salaryA);
      });
    }

    setFilteredJobs(temp);
    setCurrentPage(1);
  }, [filters, jobs]);

  // ================= PAGINATION =================
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">

      {/* HERO */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Discover Your Next Career Move 🚀
        </h1>
        <p className="text-lg text-indigo-100">
          Explore thousands of opportunities from top companies.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* TOP BAR */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md">
            <FaFilter className="text-indigo-600" />
            <span className="font-semibold text-gray-700">
              {filteredJobs.length} Jobs Available
            </span>
          </div>

          <select
            className="border rounded-lg p-2 shadow-sm"
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="salary">Highest Salary</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* FILTERS */}
          <div className="md:w-1/4 bg-white p-6 rounded-3xl shadow-lg h-fit">
            <h3 className="text-xl font-bold mb-6 text-indigo-700">
              Filter Jobs
            </h3>

            <input
              type="text"
              placeholder="Search job..."
              className="w-full mb-4 border rounded-lg p-2"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <select
              className="w-full mb-4 border rounded-lg p-2"
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Location"
              className="w-full mb-4 border rounded-lg p-2"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />

            <select
              className="w-full mb-4 border rounded-lg p-2"
              onChange={(e) =>
                setFilters({ ...filters, experience: e.target.value })
              }
            >
              <option value="">Experience</option>
              <option>Fresher</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>

            <input
              type="number"
              placeholder="Minimum Salary"
              className="w-full mb-4 border rounded-lg p-2"
              onChange={(e) =>
                setFilters({ ...filters, salary: e.target.value })
              }
            />

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFilters({ ...filters, remote: e.target.checked })
                }
              />
              <label>Remote Only</label>
            </div>

            <button
              onClick={() =>
                setFilters({
                  search: "",
                  category: "",
                  location: "",
                  experience: "",
                  salary: "",
                  remote: false,
                  sort: "",
                })
              }
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Reset Filters
            </button>
          </div>

          {/* JOB CARDS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {loading ? (
    <p>Loading jobs...</p>
  ) : currentJobs.length === 0 ? (
    <p>No jobs found.</p>
  ) : (
    currentJobs.map((job) => {

      const salaryText = (() => {
        if (job.salary) {
          return `₹ ${Number(job.salary).toLocaleString()}`;
        }
        if (job.salary_min && job.salary_max) {
          return `₹ ${Number(job.salary_min).toLocaleString()} - ₹ ${Number(job.salary_max).toLocaleString()}`;
        }
        if (job.salaryMin && job.salaryMax) {
          return `₹ ${Number(job.salaryMin).toLocaleString()} - ₹ ${Number(job.salaryMax).toLocaleString()}`;
        }
        return "Salary Not Disclosed";
      })();

      return (
        <div
          key={job._id || job.id}
          className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col"
        >
          {/* TOP CONTENT */}
          <div className="grow">
            <h3 className="text-xl font-bold text-indigo-700">
              {job.title}
            </h3>

            <div className="flex items-start text-gray-600 mt-3">
              <FaFileAlt className="mr-2 mt-1 text-indigo-500" />
              <p className="text-sm line-clamp-3">
                {job.description || "No description available"}
              </p>
            </div>

            <div className="flex items-center text-gray-600 mt-3">
              <FaMapMarkerAlt className="mr-2" />
              {job.location || "Location not specified"}
            </div>

            <div className="flex items-center text-gray-600 mt-1">
              <FaBriefcase className="mr-2" />
              {job.experience || job.experience_level || "Experience not specified"}
            </div>

            <div className="flex items-center text-green-600 mt-2 font-semibold text-lg">
              <FaMoneyBillWave className="mr-2" />
              {salaryText}
            </div>

            {job.remote && (
              <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Remote
              </span>
            )}
          </div>

          {/* BUTTON ALWAYS AT BOTTOM */}
          <Link
            to={`/jobs/${job._id || job.id}`}
            className="mt-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-center py-2 rounded-lg hover:opacity-90 transition"
          >
            View Details
          </Link>
        </div>
      );
    })
  )}

</div>

        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-12 gap-3 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg shadow ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white border hover:bg-indigo-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Jobs;
