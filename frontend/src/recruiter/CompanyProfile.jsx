import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaMapMarkerAlt,
  FaIndustry,
  FaUpload,
} from "react-icons/fa";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    company_size: "",
    website: "",
    location: "",
    about: "",
    logo: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://job-portal-wizd.onrender.com/api/recruiter/company-profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setForm(res.data);
        setPreview(res.data.logo);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      await axios.put(
        "https://job-portal-wizd.onrender.com/api/recruiter/company-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Company Profile Updated Successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-8 text-gray-700 flex items-center gap-3">
          <FaBuilding className="text-green-600" />
          Company Profile
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* Company Name */}
          <div>
            <label className="font-semibold text-gray-600">
              Company Name
            </label>
            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaBuilding className="text-gray-400" />
              <input
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="font-semibold text-gray-600">
              Industry
            </label>
            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaIndustry className="text-gray-400" />
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label className="font-semibold text-gray-600">
              Company Size
            </label>
            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaUsers className="text-gray-400" />
              <input
                type="text"
                name="company_size"
                value={form.company_size}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="font-semibold text-gray-600">
              Website
            </label>
            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaGlobe className="text-gray-400" />
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold text-gray-600">
              Location
            </label>
            <div className="flex items-center border rounded-lg mt-2 px-3">
              <FaMapMarkerAlt className="text-gray-400" />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <label className="font-semibold text-gray-600">
              Company Logo
            </label>

            <div className="mt-2 flex items-center gap-4">
              {preview && (
                <img
                  src={preview}
                  alt="logo"
                  className="w-20 h-20 rounded-xl object-cover border"
                />
              )}

              <label className="flex items-center gap-2 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                <FaUpload />
                Upload
                <input
                  type="file"
                  hidden
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          {/* About Company */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-600">
              About Company
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-4 mt-2 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
