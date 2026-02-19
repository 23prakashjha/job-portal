import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiSearch, FiDownload, FiUser } from "react-icons/fi";

const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/login");
      return;
    }
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/job/${jobId}/applicants`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants(res.data);
      setFiltered(res.data);
    } catch (error) {
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    const filteredData = applicants.filter(
      (app) =>
        app.name.toLowerCase().includes(value.toLowerCase()) ||
        app.email.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const handleAction = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/${actionType}/${actionId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Applicant ${actionType} successfully`);
      setActionId(null);
      fetchApplicants();
    } catch {
      toast.error("Action failed");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "shortlisted")
      return "bg-green-100 text-green-600";
    if (status === "rejected")
      return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-600";
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Applicants...
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Applicants
          </h2>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No applicants found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FiUser className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {app.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {app.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>

                {app.resume && (
                  <a
                    href={`http://localhost:5000${app.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 mt-4 text-indigo-600 hover:underline"
                  >
                    <FiDownload /> Download Resume
                  </a>
                )}

                {app.status === "pending" && (
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => {
                        setActionId(app.id);
                        setActionType("shortlist");
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() => {
                        setActionId(app.id);
                        setActionType("reject");
                      }}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {actionId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">
                Confirm {actionType}?
              </h3>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setActionId(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Applicants;
