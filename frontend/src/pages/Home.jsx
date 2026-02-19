import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import {
  FaStar,
  FaBriefcase,
  FaUsers,
  FaAward,
  FaQuoteLeft,
  FaUserPlus,
  FaSearch, FaPaperPlane, FaCheckCircle,FaRocket, FaShieldAlt,  FaChartLine,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import google from '../assets/Google.png';
import airbnb from '../assets/airbnb.png';
import Amazon from '../assets/Amazon.png';
import apple from '../assets/apple.png';
import instagram from '../assets/instagram.png';
import microsoft from '../assets/microsoft.png';
import netflix from '../assets/netflix.png';
import spotify from '../assets/spotify.png';
import starbucks from '../assets/starbucks.png';
import telegram from '../assets/telegram.png';
import Tesla from '../assets/Tesla.png';
import twitter from '../assets/twitter.png';
import Uber from '../assets/Uber.png';
import youtube from '../assets/youtube.png';
import Adobe from '../assets/Adobe.png';
import meta from '../assets/meta.png';



const Home = () => {

  /* ================= SUCCESS STORIES (WITH IMAGES) ================= */
 const successStories = [
  {
    name: "Aarav Sharma",
    desc: "Landed a Frontend Developer role at Infosys in just 3 weeks!",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Priya Verma",
    desc: "Got hired as a UI/UX Designer at TCS within 1 month.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Rohan Mehta",
    desc: "Secured a Backend Developer position at Wipro.",
    img: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    name: "Sneha Reddy",
    desc: "Joined Capgemini as a Software Engineer.",
    img: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    name: "Aditya Kapoor",
    desc: "Got placed at Deloitte as a Data Analyst.",
    img: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Neha Patel",
    desc: "Started career at Cognizant as QA Engineer.",
    img: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    name: "Vikram Singh",
    desc: "Joined Accenture as Full Stack Developer.",
    img: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Anjali Gupta",
    desc: "Selected at IBM as Cloud Engineer.",
    img: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "Karan Malhotra",
    desc: "Got hired at HCL as DevOps Engineer.",
    img: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    name: "Pooja Nair",
    desc: "Placed at Tech Mahindra as React Developer.",
    img: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    name: "Rahul Das",
    desc: "Joined Paytm as Node.js Developer.",
    img: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Meera Iyer",
    desc: "Got placed at Flipkart as Product Designer.",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Arjun Rao",
    desc: "Started at Amazon as Software Engineer.",
    img: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    name: "Divya Sharma",
    desc: "Joined Google as Associate Developer.",
    img: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    name: "Siddharth Jain",
    desc: "Got hired at Microsoft as Backend Engineer.",
    img: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    name: "Kavya Mishra",
    desc: "Placed at Infosys as Business Analyst.",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Harsh Vardhan",
    desc: "Joined Oracle as Software Developer.",
    img: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    name: "Ishita Roy",
    desc: "Started career at Salesforce as QA Engineer.",
    img: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    name: "Manish Yadav",
    desc: "Got placed at Uber as Data Engineer.",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    name: "Tanvi Kulkarni",
    desc: "Joined Airbnb as Frontend Developer.",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];


  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}+</span>;
}


  /* ================= TESTIMONIALS ================= */
  const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Frontend Developer",
    img: "https://randomuser.me/api/portraits/men/30.jpg",
    review:
      "This platform completely transformed my career. The resume builder and job alerts helped me land interviews within weeks!",
  },
  {
    name: "Priya Verma",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/women/31.jpg",
    review:
      "The ATS resume checker improved my resume score instantly. I received multiple interview calls after applying here.",
  },
  {
    name: "Rohan Mehta",
    role: "Backend Engineer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The job recommendations are extremely accurate. I found my current company through this platform.",
  },
  {
    name: "Sneha Reddy",
    role: "Data Analyst",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    review:
      "I love how easy it is to apply for jobs. The dashboard keeps everything organized and professional.",
  },
  {
    name: "Aditya Kapoor",
    role: "Full Stack Developer",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
    review:
      "From resume building to interview preparation, this platform has everything a job seeker needs.",
  },
  {
    name: "Neha Patel",
    role: "QA Engineer",
    img: "https://randomuser.me/api/portraits/women/35.jpg",
    review:
      "The UI is clean and very user-friendly. I was able to apply to 10+ companies in just one day.",
  },
  {
    name: "Vikram Singh",
    role: "DevOps Engineer",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    review:
      "This is the best job portal I’ve ever used. The features are powerful yet simple to navigate.",
  },
  {
    name: "Anjali Gupta",
    role: "Cloud Engineer",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    review:
      "I secured my dream job in less than a month. The job alerts are extremely helpful.",
  },
  {
    name: "Karan Malhotra",
    role: "Mobile App Developer",
    img: "https://randomuser.me/api/portraits/men/38.jpg",
    review:
      "The platform is smooth, fast, and reliable. Highly recommended for job seekers.",
  },
  {
    name: "Pooja Nair",
    role: "Product Designer",
    img: "https://randomuser.me/api/portraits/women/39.jpg",
    review:
      "The resume tools gave my profile a professional look. Recruiters started reaching out quickly.",
  },
  {
    name: "Rahul Das",
    role: "Software Engineer",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
    review:
      "The application tracking feature helped me stay updated on all my job applications.",
  },
  {
    name: "Meera Iyer",
    role: "Business Analyst",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
    review:
      "The dashboard makes everything simple and efficient. A must-use platform for professionals.",
  },
  {
    name: "Arjun Rao",
    role: "Machine Learning Engineer",
    img: "https://randomuser.me/api/portraits/men/42.jpg",
    review:
      "I received interview calls from top tech companies within weeks of signing up.",
  },
  {
    name: "Divya Sharma",
    role: "React Developer",
    img: "https://randomuser.me/api/portraits/women/43.jpg",
    review:
      "The job filtering system is fantastic. I could easily find roles matching my skills.",
  },
  {
    name: "Siddharth Jain",
    role: "Cyber Security Analyst",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "This platform gave me confidence and the right tools to crack technical interviews.",
  },
  {
    name: "Kavya Mishra",
    role: "HR Executive",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    review:
      "As an HR professional, I also recommend this platform to candidates for its simplicity and efficiency.",
  },
  {
    name: "Harsh Vardhan",
    role: "Node.js Developer",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
    review:
      "The experience is smooth and professional. I highly recommend it to freshers and experienced candidates.",
  },
  {
    name: "Ishita Roy",
    role: "Digital Marketing Specialist",
    img: "https://randomuser.me/api/portraits/women/47.jpg",
    review:
      "The email notifications keep me updated with relevant job openings instantly.",
  },
  {
    name: "Manish Yadav",
    role: "System Engineer",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
    review:
      "The entire process from profile creation to application tracking is seamless.",
  },
  {
    name: "Tanvi Kulkarni",
    role: "Software Architect",
    img: "https://randomuser.me/api/portraits/women/49.jpg",
    review:
      "This platform truly accelerates career growth. I found my ideal company through it.",
  },
];


  /* ================= 50+ COMPANY LOGOS ================= */
  const companies = [
  { name: "Google", logo:google },
  { name: "Microsoft", logo: microsoft },
  { name: "Amazon", logo:Amazon},
  { name: "Meta", logo:meta },
  { name: "Apple", logo:apple },
  { name: "Netflix", logo:netflix },
  { name: "Adobe", logo:Adobe },
  { name: "Uber", logo: Uber },
  { name: "Airbnb", logo: airbnb },
  { name: "Tesla", logo:Tesla },
  { name: "insatgram", logo:instagram},
  { name: "starbucks", logo:starbucks },
  { name: "twitter", logo:twitter },
  { name: "youtube", logo:youtube },
  { name: "telegram", logo:telegram },
  { name: "spotify", logo:spotify },

  ];

  const features = [
    {
      icon: <FaRocket />,
      title: "Fast Hiring Process",
      desc: "Apply to thousands of jobs instantly with our smart matching system.",
    },
    {
      icon: <FaUsers />,
      title: "50,000+ Professionals",
      desc: "Connect with a growing community of skilled professionals.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Companies",
      desc: "We partner only with trusted and verified employers.",
    },
    {
      icon: <FaChartLine />,
      title: "Career Growth",
      desc: "Track your applications and grow your professional journey.",
    },
  ];
  
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Account",
      desc: "Sign up and complete your professional profile.",
    },
    {
      icon: <FaSearch />,
      title: "Search Jobs",
      desc: "Browse thousands of active jobs from top companies.",
    },
    {
      icon: <FaPaperPlane />,
      title: "Apply Easily",
      desc: "Submit your application in just one click.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Get Hired",
      desc: "Connect with employers and start your dream career.",
    },
  ];

  return (
    <div className="bg-gray-50 overflow-hidden">

      {/* ================= HERO ================= */}
     <section className="relative overflow-hidden py-32 px-6 text-center text-black">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 "></div>

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-400/30 blur-3xl rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          Find Your Dream Job <br className="hidden md:block" />
          Faster Than Ever 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-xl text-/90 mb-10 max-w-2xl mx-auto"
        >
          Build powerful resumes, connect with 50,000+ professionals,
          and get hired by top companies worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          {/* Primary Button */}
          <Link
            href="/jobs"
            className="relative px-10 py-4 rounded-full bg-black text-indigo-700 font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-white/40"
          >
            Browse Jobs
          </Link>

          {/* Secondary Button */}
          <Link
            href="/register"
            className="relative px-10 py-4 rounded-full border border-black text-black font-semibold text-lg backdrop-blur-md bg-white/10 transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:scale-110"
          >
            Create Account
          </Link>
        </motion.div>
      </div>

      {/* Animated Gradient Keyframes */}
      <style jsx>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </section>

      {/* ================= STATS ================= */}
      <section className="relative py-24 bg-linear-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">

        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-10 transition duration-500"
        >
          <FaBriefcase className="text-indigo-600 text-5xl mx-auto mb-5" />
          <h3 className="text-4xl font-extrabold text-gray-800">
            <Counter target={10000} />
          </h3>
          <p className="text-gray-500 mt-2 text-lg">Active Jobs</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-10 transition duration-500"
        >
          <FaUsers className="text-indigo-600 text-5xl mx-auto mb-5" />
          <h3 className="text-4xl font-extrabold text-gray-800">
            <Counter target={50000} />
          </h3>
          <p className="text-gray-500 mt-2 text-lg">Users</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-10 transition duration-500"
        >
          <FaAward className="text-indigo-600 text-5xl mx-auto mb-5" />
          <h3 className="text-4xl font-extrabold text-gray-800">
            <Counter target={5000} />
          </h3>
          <p className="text-gray-500 mt-2 text-lg">Successful Placements</p>
        </motion.div>

      </div>
    </section>

{/*=======================Why Choose us========================*/}

<section className="relative py-24 bg-linear-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-black/90">
          Why Choose Us
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          We help you get hired faster and smarter.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl text-center transition duration-500"
          >
            <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
</section>

      {/* ================= COMPANY LOGO CAROUSEL ================= */}
<section className="relative py-24 bg-linear-to-b from-gray-50 to-white overflow-hidden">

      {/* Left & Right Fade Effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Trusted By 50+ Leading Companies
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Empowering teams across industries worldwide
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={60}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          loop
          allowTouchMove={false}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {[...companies, ...companies].map((company, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center items-center group">
                <div className="bg-white shadow-md hover:shadow-xl transition duration-500 rounded-2xl px-8 py-6">
                  <img
                    src={company.logo}
                    alt={company.name}
                    loading="lazy"
                    className="h-10 md:h-12 object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-500"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
</section>


      {/* ================= SUCCESS STORIES ================= */}

<section className="relative py-28 bg-linear-to-br from-indigo-100 via-white to-purple-100 px-6 overflow-hidden">

  {/* Background Decorative Blobs */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl"></div>

  {/* Heading */}
  <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
    <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-black/90">
     Real Success Stories
    </h2>
    <p className="text-gray-600 mt-4 text-lg">
      See how our users are achieving incredible results
    </p>
  </div>

  {/* Swiper */}
  <Swiper
    modules={[Autoplay]}
    spaceBetween={30}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    loop={true}
    breakpoints={{
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    }}
    className="max-w-7xl mx-auto"
  >
    {successStories.map((user, i) => (
      <SwiperSlide key={i}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between group overflow-hidden"
        >
          
          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

          {/* Quote Icon */}
          <FaQuoteLeft className="text-indigo-400 text-3xl mx-auto mb-4 opacity-70" />

          {/* Profile Image */}
          <img
            src={user.img}
            alt={user.name}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-indigo-500 shadow-lg group-hover:scale-110 transition duration-500"
          />

          {/* Name */}
          <h4 className="font-semibold text-xl text-gray-800 mt-2">
            {user.name}
          </h4>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-4 leading-relaxed grow">
            {user.desc}
          </p>

          {/* Rating */}
          <div className="flex justify-center mt-6 space-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="text-yellow-400 group-hover:scale-125 transition duration-300"
              />
            ))}
          </div>

          {/* Bottom Glow */}
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-purple-400/30 blur-3xl rounded-full"></div>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

{/*=====How To Apply Section=================*/}

<section className="relative py-24 bg-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          How To Apply
        </h2>
        <p className="text-gray-500 mt-4 text-lg">
          Just 4 simple steps to land your dream job.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative bg-gray-50 hover:bg-indigo-50 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition duration-500"
          >
            <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>

            {/* Step Number */}
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
</section>

      {/* ================= TESTIMONIALS ================= */}
<section className="relative py-24 bg-linear-to-br from-gray-50 via-white to-indigo-50 px-6 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-black/90">
        What Professionals Say
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Trusted by industry experts worldwide
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="relative backdrop-blur-xl  border-white/40 rounded-3xl shadow-xl p-8 text-center h-full flex flex-col justify-between group overflow-hidden transition duration-500"
            >
              
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

              {/* Quote Icon */}
              <FaQuoteLeft className="text-indigo-400 text-3xl mx-auto mb-4 opacity-70 relative z-10" />

              {/* Profile Image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500 shadow-md group-hover:scale-110 transition duration-500 relative z-10"
              />

              {/* Review */}
              <p className="mb-6 italic text-gray-600 text-sm md:text-base leading-relaxed grow relative z-10">
                "{item.review}"
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-4 text-yellow-400 space-x-1 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="group-hover:scale-125 transition duration-300"
                  />
                ))}
              </div>

              {/* Name & Role */}
              <h4 className="font-semibold text-lg text-gray-800 relative z-10">
                {item.name}
              </h4>
              <span className="text-sm text-gray-500 relative z-10">
                {item.role}
              </span>

              {/* Bottom Glow */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-purple-400/30 blur-3xl rounded-full"></div>

            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
</section>

<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative max-w-6xl w-full px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-lg rounded-3xl p-10 md:p-20 text-center border border-white/20 shadow-xl"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-wide">
            🚀 Stay Ahead in Your Career
          </h2>

          <p className="text-gray-800 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Subscribe to get the latest job alerts, hiring updates, and career
            growth tips delivered directly to your inbox. Unlock your potential today!
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:flex-1 px-6 py-4 rounded-full border-none outline-none text-gray-800 placeholder-gray-500 focus:ring-4 focus:ring-indigo-300 transition-all"
            />

            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Subscribe Now
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Optional Extra Callouts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <div className="bg-white/50 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-lg text-gray-900 font-medium hover:scale-105 transition-transform">
            💼 500+ Jobs Posted Weekly
          </div>
          <div className="bg-white/50 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-lg text-gray-900 font-medium hover:scale-105 transition-transform">
            🎯 Career Tips & Guidance
          </div>
          <div className="bg-white/50 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-lg text-gray-900 font-medium hover:scale-105 transition-transform">
            📩 Weekly Newsletter
          </div>
        </motion.div>
      </div>
</section>

      {/* ================= FINAL CTA ================= */}
<section className="relative overflow-hidden py-24 px-6">
      
      {/* Animated Gradient Background */}
      <div className="absolute"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/30 blur-3xl rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-black">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight mb-6"
        >
          Ready to Accelerate Your Career?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-black/90 mb-10"
        >
          Join thousands of professionals transforming their future today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/register"
            className="relative inline-block px-10 py-4 text-lg font-semibold rounded-full bg-black text-indigo-700 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-white/40"
          >
            <span className="relative z-10">Get Started Now</span>

            {/* Button Glow */}
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-indigo-400 to-pink-400 opacity-0 hover:opacity-20 transition duration-300"></span>
          </Link>
        </motion.div>
      </div>

      {/* Optional Gradient Animation */}
      <style jsx>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

</section>
    </div>
  );
};

export default Home;
