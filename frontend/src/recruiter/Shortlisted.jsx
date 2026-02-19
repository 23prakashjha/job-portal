import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiDownload, FiUserCheck } from "react-icons/fi";

const Shortlisted = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/login");
      return;
    }
    fetchShortlisted();
  }, [jobId]);

  const fetchShortlisted = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-wizd.onrender.com/api/applications/job/${jobId}/shortlisted`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res.data);
    } catch {
      toast.error("Failed to load shortlisted candidates");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Shortlisted Candidates...
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Shortlisted Candidates
        </h2>

        {data.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No shortlisted candidates found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FiUserCheck className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.email}
                    </p>
                  </div>
                </div>

                {item.cover_letter && (
                  <p className="text-gray-600 italic text-sm mb-4">
                    "{item.cover_letter}"
                  </p>
                )}

                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  {item.status}
                </span>

                {item.resume && (
                  <a
                    href={`https://job-portal-wizd.onrender.com${item.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 mt-4 text-indigo-600 hover:underline"
                  >
                    <FiDownload /> Download Resume
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shortlisted;
