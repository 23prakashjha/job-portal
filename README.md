Job Portal Web Application

Project Overview

The Job Portal Web Application is a comprehensive recruitment platform that connects job seekers with recruiters efficiently. Job seekers can explore thousands of jobs across multiple categories, apply online, track application status, and get feedback on their resumes. Recruiters can post jobs, manage applicants, shortlist candidates, and showcase their company profiles. The platform provides a seamless, responsive, and intuitive interface suitable for desktop and mobile devices.

Project Objective

The main objectives of the Job Portal project are:

Efficient Recruitment: Reduce the time and effort required for both job seekers and recruiters to find the perfect match.

Enhanced User Experience: Provide interactive and responsive UI components with features like search filters, apply modals, and sticky cards.

Comprehensive Job Management: Allow recruiters to manage postings, track applications, and shortlist candidates.

Resume Optimization: Integrate ATS scoring for job seekers to improve their chances of selection.

Secure Authentication: Implement JWT-based authentication and role-based access control to protect user and recruiter data.

Key Features
For Job Seekers

Search jobs by keywords, categories, location, experience, salary, and remote options.

Apply for jobs with resume and cover letter uploads.

Track application status in real-time.

View ATS Resume Score for better matching.

Save jobs and share job links.

Explore similar jobs recommended based on category and location.

For Recruiters

Post, update, and manage job listings.

Access a dashboard showing total jobs, total applicants, and shortlisted candidates.

View and shortlist applicants for each job.

Showcase company profile, logo, and description.

Real-time application tracking with status updates.

Additional Features

Animated apply modal for interactive UX.

Loading skeletons for better performance perception.

Sticky apply cards for easy access.

Responsive design for desktop and mobile.

System Architecture

The application follows a client-server architecture:
Frontend: Handles UI/UX, dashboards, job listings, search filters, modals, and forms.

Backend: Provides RESTful APIs for jobs, applications, users, and authentication.

Database: Stores job postings, users, recruiters, and applications.

Authentication: JWT-based authentication with role-based access control.

Technology Stack
Layer	Technology
Frontend	React.js, Tailwind CSS, React Router, React Icons
Backend	Node.js, Express.js
Database	MySQL
Authentication	JWT, Role-based access control
API	RESTful APIs for Jobs, Users, and Applications
Setup & Installation
Backend

Navigate to the backend folder:

cd backend
npm run dev

Navigate to the frontend folder :
cd frontend
npm run dev
