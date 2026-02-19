import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 text-gray-300 mt-20 overflow-hidden">

      {/* Top Gradient Line */}
      <div className="h-1 w-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            🚀 HireNest
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your trusted platform for discovering dream jobs and helping
            companies hire top-tier talent across industries.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-linear-to-r from-indigo-600 to-pink-600 transition duration-300 cursor-pointer"
                >
                  <Icon className="text-gray-300 hover:text-white transition duration-300" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white transition">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Recruiter Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            For Recruiters
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/post-job" className="hover:text-white transition">
                Post a Job
              </Link>
            </li>
            <li>
              <Link to="/manage-jobs" className="hover:text-white transition">
                Manage Jobs
              </Link>
            </li>
            <li>
              <Link to="/applicants" className="hover:text-white transition">
                Applicants
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get the latest job updates and career tips.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-xl bg-gray-800 text-gray-300 focus:outline-none"
            />
            <button className="px-4 bg-linear-to-r from-indigo-600 to-pink-600 rounded-r-xl flex items-center justify-center hover:opacity-90 transition">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HireNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
