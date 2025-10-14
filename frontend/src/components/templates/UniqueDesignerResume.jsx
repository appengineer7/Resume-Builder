import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function UniqueDesignerResume({
  data,
  color = "#6D28D9", // Unique accent color
  font = "Poppins",
}) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    portfolioImages = [],
  } = data;

  // Inject print-safe CSS
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          margin: 0;
        }
        .print-container {
          display: grid !important;
          grid-template-columns: 1fr 2fr !important;
          gap: 16px !important;
          width: 732px !important;
        }
        aside, main {
          break-inside: avoid;
        }
        img {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .shadow-sm, .shadow-md, .shadow-lg {
          box-shadow: none !important;
        }
        .hover\\:shadow-md, .hover\\:-translate-y-0\\.5 {
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      className="max-w-5xl mx-auto bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl rounded-3xl overflow-hidden"
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: `${font}, sans-serif`,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <header className="p-4 text-white text-center relative bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="flex flex-col items-center relative z-10">
          <div className="rounded-full overflow-hidden border-4 border-white w-28 h-28 mb-2 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
            {personal.profileImage ? (
              <img
                src={personal.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-200 text-xs bg-gray-500">
                No Photo
              </div>
            )}
          </div>
          <h1 className="text-3xl font-extrabold drop-shadow-md">
            {personal.fullName || "Your Name"}
          </h1>
          <p className="text-sm opacity-90 mt-1">
            {personal.title || "Creative Designer"}
          </p>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </header>

      {/* MAIN CONTENT */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5 print-container">
        {/* LEFT COLUMN */}
        <aside className="space-y-6 md:col-span-1">
          {/* Contact */}
          <Section title="Contact" color={color}>
            {personal.phone && <Item icon={<Phone size={12} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={12} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={12} />} text={personal.location} />}
          </Section>

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills" color={color}>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  >
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Section title="Hobbies" color={color}>
              <div className="flex flex-wrap gap-1">
                {personal.hobbies.map((hobby, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  >
                    {hobby.name || hobby}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <p key={i} className="text-xs">
                  {cert.name} {cert.date && `(${cert.date})`}
                </p>
              ))}
            </Section>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className="md:col-span-2 space-y-5">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="Profile" color={color}>
              <p className="text-xs text-gray-700 leading-relaxed">{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" color={color}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="mb-2 p-2 border-l-4 border-purple-400 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex justify-between">
                    <h4 className="text-xs font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-[10px] text-gray-500">{exp.from} - {exp.to || "Present"}</span>
                  </div>
                  <p className="text-[11px] text-gray-700 font-medium mt-0.5">{exp.company}</p>
                  {exp.description && <p className="text-[11px] text-gray-600 mt-0.5">{exp.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="mb-2 p-2 border-l-4 border-purple-400 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-gray-900">{edu.degree}</span>
                    <span className="text-[10px] text-gray-500">{edu.from} - {edu.to}</span>
                  </div>
                  <p className="text-[11px] text-gray-700 mt-0.5">{edu.institution}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" color={color}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className="p-2 border rounded bg-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <p className="text-xs font-bold text-gray-900 mb-1">{proj.name}</p>
                    {proj.description && <p className="text-[11px] text-gray-700 mb-0.5">{proj.description}</p>}
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-[11px] underline">{proj.link}</a>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Portfolio */}
          {portfolioImages.length > 0 && (
            <Section title="Portfolio" color={color}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {portfolioImages.map((img, i) => (
                  <div key={i} className="border rounded overflow-hidden transform hover:scale-105 hover:shadow-lg transition-transform duration-300">
                    <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-32 object-cover" />
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ title, icon, children, color }) {
  return (
    <div>
      <h3 className="text-xs font-bold flex items-center gap-1.5 mb-1" style={{ color }}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function Item({ icon, text }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-gray-800">
      {icon} {text}
    </p>
  );
}
