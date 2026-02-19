import React from "react";
import { FaBullseye, FaEye, FaUsers, FaBriefcase, FaAward } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* 1️⃣ Hero Section */}
      <section className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-28 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          About HireNest 🚀
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
          Empowering professionals and recruiters with smart hiring solutions.
        </p>
      </section>

      {/* 2️⃣ About Introduction */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            HireNest is a modern recruitment platform connecting talented job
            seekers with top companies worldwide. We aim to simplify the hiring
            process and create meaningful career opportunities.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From resume building to ATS checking and smart job matching,
            we provide powerful tools to help professionals grow faster.
          </p>
        </div>
      </section>

      {/* 3️⃣ Mission & Vision */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
            <FaBullseye className="text-indigo-600 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To simplify hiring by connecting skilled professionals with
              verified companies and providing tools that boost career growth.
            </p>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
            <FaEye className="text-indigo-600 text-4xl mb-4" />
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted global platform for hiring and career
              development by leveraging innovation and technology.
            </p>
          </div>

        </div>
      </section>

      {/* 4️⃣ Why Choose Us */}
      <section className="py-20 px-6 bg-linear-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose HireNest?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition">
            <FaUsers className="text-indigo-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">50,000+ Users</h3>
            <p className="text-gray-600 text-sm">
              A strong network of professionals and recruiters.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition">
            <FaBriefcase className="text-indigo-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">10,000+ Jobs</h3>
            <p className="text-gray-600 text-sm">
              Thousands of active job opportunities across industries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition">
            <FaAward className="text-indigo-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Trusted Platform</h3>
            <p className="text-gray-600 text-sm">
              Secure, reliable and trusted by top companies.
            </p>
          </div>

        </div>
      </section>

      {/* 5️⃣ Call To Action */}
      <section className="py-24 bg-linear-to-r from-indigo-600 to-pink-600 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Take the Next Step in Your Career?
        </h2>
        <p className="mb-8 text-gray-200">
          Join thousands of professionals building their future with HireNest.
        </p>
        <a
          href="/register"
          className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Started Now
        </a>
      </section>

    </div>
  );
};

export default About;

