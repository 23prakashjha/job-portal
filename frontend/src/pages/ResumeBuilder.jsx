import React, { useState } from "react";
import html2pdf from "html2pdf.js";

const ResumeBuilder = () => {

  const [data, setData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    summary: "",

    // Education
    school1: "",
    degree1: "",
    eduCity1: "",
    eduStart1: "",
    eduEnd1: "",
    school2: "",
    degree2: "",
    eduCity2: "",
    eduStart2: "",
    eduEnd2: "",

    // Experience 1
    company1: "",
    position1: "",
    expCity1: "",
    expStart1: "",
    expEnd1: "",
    expDesc1: "",

    // Experience 2
    company2: "",
    position2: "",
    expCity2: "",
    expStart2: "",
    expEnd2: "",
    expDesc2: "",

    // Skills
    skill1: "", skill2: "", skill3: "", skill4: "", skill5: "",
    softSkill1: "", softSkill2: "", softSkill3: "",

    // Projects
    project1: "",
    projectDesc1: "",
    project2: "",
    projectDesc2: "",

    // Certifications
    cert1: "",
    cert2: "",

    // Languages
    language1: "",
    language2: "",

    interests: "",
    references: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2pdf().from(element).save("Professional_Resume.pdf");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Advanced Resume Builder 🚀
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

        {/* FORM SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">

          <h2 className="text-2xl font-bold mb-6">Fill Your Details</h2>

          {/* PERSONAL INFO */}
          <SectionTitle title="Personal Information" />
          <Input name="firstName" placeholder="First Name" onChange={handleChange}/>
          <Input name="lastName" placeholder="Last Name" onChange={handleChange}/>
          <Input name="jobTitle" placeholder="Professional Title" onChange={handleChange}/>
          <Input name="email" placeholder="Email" onChange={handleChange}/>
          <Input name="phone" placeholder="Phone" onChange={handleChange}/>
          <Input name="website" placeholder="Website" onChange={handleChange}/>
          <Input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange}/>
          <Input name="github" placeholder="GitHub URL" onChange={handleChange}/>
          <Input name="address" placeholder="Address" onChange={handleChange}/>
          <Input name="city" placeholder="City" onChange={handleChange}/>
          <Input name="state" placeholder="State" onChange={handleChange}/>
          <Input name="country" placeholder="Country" onChange={handleChange}/>
          <Input name="postalCode" placeholder="Postal Code" onChange={handleChange}/>
          <Textarea name="summary" placeholder="Professional Summary" onChange={handleChange}/>

          {/* EDUCATION */}
          <SectionTitle title="Education" />
          <Input name="school1" placeholder="School / University" onChange={handleChange}/>
          <Input name="degree1" placeholder="Degree" onChange={handleChange}/>
          <Input name="eduCity1" placeholder="City" onChange={handleChange}/>
          <Input name="eduStart1" placeholder="Start Date" onChange={handleChange}/>
          <Input name="eduEnd1" placeholder="End Date" onChange={handleChange}/>

          <Input name="school2" placeholder="Second School" onChange={handleChange}/>
          <Input name="degree2" placeholder="Second Degree" onChange={handleChange}/>
          <Input name="eduCity2" placeholder="City" onChange={handleChange}/>
          <Input name="eduStart2" placeholder="Start Date" onChange={handleChange}/>
          <Input name="eduEnd2" placeholder="End Date" onChange={handleChange}/>

          {/* EXPERIENCE */}
          <SectionTitle title="Experience" />
          <Input name="company1" placeholder="Company Name" onChange={handleChange}/>
          <Input name="position1" placeholder="Position" onChange={handleChange}/>
          <Input name="expCity1" placeholder="City" onChange={handleChange}/>
          <Input name="expStart1" placeholder="Start Date" onChange={handleChange}/>
          <Input name="expEnd1" placeholder="End Date" onChange={handleChange}/>
          <Textarea name="expDesc1" placeholder="Job Description" onChange={handleChange}/>

          <Input name="company2" placeholder="Second Company" onChange={handleChange}/>
          <Input name="position2" placeholder="Position" onChange={handleChange}/>
          <Input name="expCity2" placeholder="City" onChange={handleChange}/>
          <Input name="expStart2" placeholder="Start Date" onChange={handleChange}/>
          <Input name="expEnd2" placeholder="End Date" onChange={handleChange}/>
          <Textarea name="expDesc2" placeholder="Job Description" onChange={handleChange}/>

          {/* SKILLS */}
          <SectionTitle title="Skills" />
          <Input name="skill1" placeholder="Skill 1" onChange={handleChange}/>
          <Input name="skill2" placeholder="Skill 2" onChange={handleChange}/>
          <Input name="skill3" placeholder="Skill 3" onChange={handleChange}/>
          <Input name="skill4" placeholder="Skill 4" onChange={handleChange}/>
          <Input name="skill5" placeholder="Skill 5" onChange={handleChange}/>
          <Input name="softSkill1" placeholder="Soft Skill 1" onChange={handleChange}/>
          <Input name="softSkill2" placeholder="Soft Skill 2" onChange={handleChange}/>
          <Input name="softSkill3" placeholder="Soft Skill 3" onChange={handleChange}/>

          {/* PROJECTS */}
          <SectionTitle title="Projects" />
          <Input name="project1" placeholder="Project Name" onChange={handleChange}/>
          <Textarea name="projectDesc1" placeholder="Project Description" onChange={handleChange}/>
          <Input name="project2" placeholder="Project Name" onChange={handleChange}/>
          <Textarea name="projectDesc2" placeholder="Project Description" onChange={handleChange}/>

          {/* CERTIFICATIONS */}
          <SectionTitle title="Certifications" />
          <Input name="cert1" placeholder="Certification 1" onChange={handleChange}/>
          <Input name="cert2" placeholder="Certification 2" onChange={handleChange}/>

          {/* LANGUAGES */}
          <SectionTitle title="Languages" />
          <Input name="language1" placeholder="Language 1" onChange={handleChange}/>
          <Input name="language2" placeholder="Language 2" onChange={handleChange}/>

          <Textarea name="interests" placeholder="Interests" onChange={handleChange}/>
          <Textarea name="references" placeholder="References" onChange={handleChange}/>

          <button
            onClick={downloadPDF}
            className="w-full mt-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Download Resume PDF
          </button>
        </div>

        {/* PREVIEW SECTION */}
        <div
          id="resume-preview"
          className="bg-white p-10 rounded-3xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-indigo-700">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-gray-600">{data.jobTitle}</p>

          <Section title="Summary" content={data.summary} />
          <Section title="Education" content={`${data.school1} - ${data.degree1}`} />
          <Section title="Experience" content={`${data.company1} - ${data.position1}`} />
          <Section title="Skills" content={[data.skill1, data.skill2, data.skill3].join(", ")} />
          <Section title="Projects" content={data.project1} />
          <Section title="Certifications" content={data.cert1} />
          <Section title="Languages" content={data.language1} />
          <Section title="Interests" content={data.interests} />
        </div>

      </div>
    </div>
  );
};

/* Reusable Components */

const Input = ({ name, placeholder, onChange }) => (
  <input
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
  />
);

const Textarea = ({ name, placeholder, onChange }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    rows={3}
    className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
  />
);

const SectionTitle = ({ title }) => (
  <h3 className="text-lg font-bold text-indigo-600 mt-6 mb-3">
    {title}
  </h3>
);

const Section = ({ title, content }) => (
  content ? (
    <div className="mt-4">
      <h3 className="font-bold text-indigo-600">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  ) : null
);

export default ResumeBuilder;

