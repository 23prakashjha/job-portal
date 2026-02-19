import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaBuilding,
  FaCheckCircle,
  FaCalendarAlt,
  FaLaptopHouse,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [status, setStatus] = useState(null);
  const [saved, setSaved] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const axiosConfig = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/jobs/${id}`,
          axiosConfig
        );

        setJob(data);

        if (user && token) {
          const { data: applied } = await axios.get(
            `http://localhost:5000/api/applications/check/${id}`,
            axiosConfig
          );
          setAlreadyApplied(applied.applied);

          if (applied.applied) {
            const { data: statusRes } = await axios.get(
              `http://localhost:5000/api/applications/status/${id}`,
              axiosConfig
            );
            setStatus(statusRes.status);
          }
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!resume) return alert("Please upload your resume!");

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);
      formData.append("jobId", id);

      await axios.post(
        "http://localhost:5000/api/applications",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlreadyApplied(true);
      setStatus("pending");
      setShowApply(false);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }

    setSubmitting(false);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        Loading job details...
      </div>
    );

  if (!job)
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        Job not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* JOB HEADER CARD */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-indigo-700">
                  {job.title}
                </h1>

                <div className="flex flex-wrap gap-6 mt-4 text-gray-600">

                  {job.remote && (
                    <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      <FaLaptopHouse /> Remote
                    </span>
                  )}

                  {job.location && !job.remote && (
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt /> {job.location}
                    </span>
                  )}

                  <span className="flex items-center gap-2">
                    <FaBriefcase /> {job.experience_level}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaMoneyBillWave />
                    ₹{job.salary_min} - ₹{job.salary_max}
                  </span>

                  {job.deadline && (
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt />
                      Apply before {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>

            {alreadyApplied && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl text-green-700 font-semibold flex items-center gap-2">
                <FaCheckCircle />
                Application Status: {status}
              </div>
            )}
          </div>

          {/* RESPONSIBILITIES */}
          {job.responsibilities && (
            <Section title="Responsibilities">
              {job.responsibilities.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </Section>
          )}

          {/* QUALIFICATIONS */}
          {job.qualifications && (
            <Section title="Qualifications">
              {job.qualifications.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </Section>
          )}

          {/* SKILLS */}
          {job.skills && (
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.split(",").map((skill, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* BENEFITS */}
          {job.benefits && (
            <Section title="Benefits">
              {job.benefits.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </Section>
          )}
        </div>

        {/* APPLY CARD */}
        <div className="bg-white p-6 rounded-3xl shadow-xl sticky top-24 h-fit">
          <h3 className="text-xl font-semibold mb-6">Apply Now</h3>

          {alreadyApplied ? (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-xl"
            >
              Already Applied
            </button>
          ) : (
            <button
              onClick={() => setShowApply(true)}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition-all"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

      {/* APPLY MODAL */}
      {showApply && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-indigo-700">
              Apply for {job.title}
            </h3>

            <form onSubmit={handleApply} className="space-y-4">
              <input
                type="file"
                required
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg p-3"
              />

              <textarea
                rows="4"
                placeholder="Cover Letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:opacity-90"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>

            <button
              onClick={() => setShowApply(false)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white p-8 rounded-3xl shadow-xl">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <ul className="list-disc pl-6 text-gray-700 space-y-2">
      {children}
    </ul>
  </div>
);

export default JobDetails;
