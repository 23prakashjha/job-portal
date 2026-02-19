import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

const ResumeATS = () => {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);

  const checkATS = () => {
    if (!resume || !jobDesc) return;

    const resumeWords = resume
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/);

    const jobWords = jobDesc
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/);

    const uniqueJobWords = [...new Set(jobWords)];

    const matched = uniqueJobWords.filter(word =>
      resumeWords.includes(word)
    );

    const missing = uniqueJobWords.filter(
      word => !resumeWords.includes(word)
    );

    const result = ((matched.length / uniqueJobWords.length) * 100).toFixed(1);

    setScore(result);
    setMatchedKeywords(matched.slice(0, 15));
    setMissingKeywords(missing.slice(0, 15));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">

      {/* 🔥 Hero Section */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          ATS Resume Checker 🚀
        </h1>
        <p className="text-indigo-100 text-lg">
          Optimize your resume and increase your chances of getting hired.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-700">
                Paste Resume
              </h3>
              <textarea
                placeholder="Paste your resume content here..."
                onChange={e => setResume(e.target.value)}
                rows={10}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-indigo-700">
                Paste Job Description
              </h3>
              <textarea
                placeholder="Paste job description here..."
                onChange={e => setJobDesc(e.target.value)}
                rows={10}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <div className="text-center mt-8">
            <button
              onClick={checkATS}
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              <FaSearch className="inline mr-2" />
              Analyze Resume
            </button>
          </div>

          {/* Score Section */}
          {score && (
            <div className="mt-12 text-center">

              <h3 className="text-2xl font-bold mb-6 text-gray-700">
                Your ATS Score
              </h3>

              {/* Circular Score */}
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full bg-linear-to-r from-indigo-600 to-purple-600"
                  style={{
                    clipPath: `inset(${100 - score}% 0 0 0)`
                  }}
                ></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-indigo-700">
                  {score}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="max-w-xl mx-auto">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-linear-to-r from-indigo-600 to-purple-600 h-4 rounded-full transition-all duration-700"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>

              {/* Keywords Analysis */}
              <div className="grid md:grid-cols-2 gap-8 mt-10 text-left">

                <div>
                  <h4 className="font-bold text-green-600 mb-3">
                    Matched Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((word, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <FaCheckCircle /> {word}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-red-600 mb-3">
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((word, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <FaTimesCircle /> {word}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResumeATS;

