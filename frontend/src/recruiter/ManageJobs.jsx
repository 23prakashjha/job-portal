import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2, FiUsers, FiSearch } from "react-icons/fi";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Job Deleted Successfully");
      setDeleteId(null);
      fetchJobs();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-600 via-purple-600  py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Manage Jobs
          </h2>

          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 p-3 rounded-xl border-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Job Count */}
        <div className="mb-6 text-white font-medium">
          Total Jobs: {filteredJobs.length}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-white text-xl">
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white/20 backdrop-blur-lg text-white text-center p-10 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-semibold">
              No Jobs Found
            </h3>
            <p className="mt-2 text-white/80">
              Start by posting a new job.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 transition transform hover:scale-105 hover:shadow-indigo-500/30"
              >
                <h3 className="text-xl font-bold text-white">
                  {job.title}
                </h3>

                <p className="text-white/80 mt-2">
                  📍 {job.location}
                </p>

                <p className="text-green-300 font-semibold mt-2">
                  💰 {job.salary || "Not Specified"}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <button
                    onClick={() => setDeleteId(job.id)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    <FiTrash2 /> Delete
                  </button>

                  <a
                    href={`/recruiter/applicants/${job.id}`}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    <FiUsers /> Applicants
                  </a>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl text-center">
            <h3 className="text-xl font-bold mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this job?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={deleteJob}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageJobs;

