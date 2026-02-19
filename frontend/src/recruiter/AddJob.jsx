import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiBriefcase, FiMapPin } from "react-icons/fi";

const AddJob = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    responsibilities: "",
    qualifications: "",
    skills: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "",
    experienceLevel: "",
    location: "",
    remote: false,
    category: "",
    vacancies: "",
    deadline: "",
    benefits: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (
      !form.title ||
      !form.company ||
      !form.description ||
      !form.salaryMin ||
      !form.salaryMax ||
      !form.jobType ||
      !form.experienceLevel
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(form.salaryMax) < Number(form.salaryMin)) {
      toast.error("Salary max must be greater than salary min");
      return;
    }

    setLoading(true);

    try {
      const jobData = {
        title: form.title.trim(),
        company: form.company.trim(),
        description: form.description.trim(),
        responsibilities: form.responsibilities.trim(),
        qualifications: form.qualifications.trim(),
        skills: form.skills.trim(),
        salary_min: Number(form.salaryMin),
        salary_max: Number(form.salaryMax),
        job_type: form.jobType,
        experience_level: form.experienceLevel,
        location: form.remote ? "Remote" : form.location,
        remote: form.remote,
        category: form.category,
        vacancies: form.vacancies ? Number(form.vacancies) : 1,
        deadline: form.deadline || null,
        benefits: form.benefits.trim(),
      };

      await axios.post("https://job-portal-wizd.onrender.com/api/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🎉 Job Posted Successfully!");

      setForm({
        title: "",
        company: "",
        description: "",
        responsibilities: "",
        qualifications: "",
        skills: "",
        salaryMin: "",
        salaryMax: "",
        jobType: "",
        experienceLevel: "",
        location: "",
        remote: false,
        category: "",
        vacancies: "",
        deadline: "",
        benefits: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-800 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12">

        <h2 className="text-4xl font-bold text-white text-center mb-10">
          🚀 Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* GRID SECTION */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Job Title */}
            <div>
              <label className="text-white font-medium">Job Title *</label>
              <div className="relative mt-2">
                <FiBriefcase className="absolute left-3 top-3 text-white/70" />
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Frontend Developer"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="text-white font-medium">Company *</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-white font-medium">Location</label>
              <div className="relative mt-2">
                <FiMapPin className="absolute left-3 top-3 text-white/70" />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  disabled={form.remote}
                  className="w-full pl-10 p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-400 outline-none disabled:opacity-50"
                  placeholder="New York"
                />
              </div>
            </div>

            {/* Remote Toggle */}
            <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl p-4 mt-6 md:mt-0">
              <span className="text-white font-medium">Remote Job?</span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="remote"
                  checked={form.remote}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-2px after:left-2px after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            {/* Job Type */}
            <div>
              <label className="text-white font-medium">Job Type *</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-indigo-400"
              >
                <option value="" className="text-black">Select Type</option>
                <option value="Full-Time" className="text-black">Full-Time</option>
                <option value="Part-Time" className="text-black">Part-Time</option>
                <option value="Internship" className="text-black">Internship</option>
                <option value="Contract" className="text-black">Contract</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="text-white font-medium">Experience Level *</label>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 bg-white/10 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-indigo-400"
              >
                <option value="" className="text-black">Select Level</option>
                <option value="Entry" className="text-black">Entry</option>
                <option value="Mid" className="text-black">Mid</option>
                <option value="Senior" className="text-black">Senior</option>
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="text-white font-medium">Salary Range *</label>
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  name="salaryMin"
                  value={form.salaryMin}
                  onChange={handleChange}
                  required
                  placeholder="Min"
                  className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white"
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={form.salaryMax}
                  onChange={handleChange}
                  required
                  placeholder="Max"
                  className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white"
                />
              </div>
            </div>

          </div>

          {/* TEXTAREAS */}
          {["description","responsibilities","qualifications","skills","benefits"].map((field) => (
            <textarea
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          ))}

          {/* Deadline */}
          <div>
            <label className="text-white font-medium">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-white/10 border border-white/30 rounded-xl text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-500 to-purple-600 py-4 rounded-xl font-bold text-lg text-white hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {loading ? "Posting..." : "✨ Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddJob;




