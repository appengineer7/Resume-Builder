// src/components/templates/ModernVisualResume.jsx
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ModernVisualResume({
  data,
  color = "#FF6B6B", // Modern accent color
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

  return (
    <div
      className="mx-auto shadow-lg rounded-lg overflow-visible"
      style={{
        width: "210mm",
        minHeight: "297mm", // ✅ allows dynamic height
        display: "flex",
        flexDirection: "column",
        fontFamily: `${font}, sans-serif`,
        background: "#FFFFFF",
      }}
    >
      {/* HEADER */}
      <header
        className="p-6 text-white text-center"
        style={{
          background: `linear-gradient(to right, ${color}, #FFA500)`,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="rounded-full overflow-hidden border-4 border-white w-24 h-24 mb-3"
            style={{ backgroundColor: "#f3f3f3" }}
          >
            {personal.profileImage ? (
              <img
                src={personal.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 text-xs">
                No Photo
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">
            {personal.fullName || "Your Name"}
          </h1>
          <p className="text-sm opacity-90">
            {personal.title || "Creative Professional"}
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {/* LEFT COLUMN */}
        <aside className="col-span-1 space-y-4">
          {/* Contact */}
          <Section title="Contact" color={color}>
            {personal.phone && <Item icon={<Phone size={12} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={12} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={12} />} text={personal.location} />}
          </Section>

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills" color={color}>
              <ul className="list-disc list-inside space-y-0.5">
                {skills.map((skill, i) => (
                  <li key={i} className="text-xs font-medium">
                    {skill.name || skill}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Section title="Hobbies" color={color}>
              <ul className="list-disc list-inside space-y-0.5">
                {personal.hobbies.map((hobby, i) => (
                  <li key={i} className="text-xs font-medium">
                    {hobby.name || hobby}
                  </li>
                ))}
              </ul>
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
        <main className="col-span-2 space-y-4 overflow-visible">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="Profile" color={color}>
              <p className="text-xs text-gray-700 leading-relaxed">
                {personal.summary}
              </p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" color={color}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="mb-2 p-2 border-l-4 rounded"
                  style={{ borderColor: color, backgroundColor: "#FFF5F5" }}
                >
                  <div className="flex justify-between">
                    <h4 className="text-xs font-semibold text-gray-900">
                      {exp.title}
                    </h4>
                    <span className="text-[10px] text-gray-500">
                      {exp.from} - {exp.to || "Present"}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700 font-medium">
                    {exp.company}
                  </p>
                  {exp.description && (
                    <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: exp.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />
                  )}
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
                  className="mb-2 p-2 border-l-4 rounded"
                  style={{ borderColor: color, backgroundColor: "#FFF5F5" }}
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-gray-900">
                      {edu.degree}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {edu.from} - {edu.to}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700">{edu.institution}</p>
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
                    className="p-2 border rounded bg-gray-50"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <p className="text-xs font-semibold text-gray-900 mb-0.5">
                      {proj.name}
                    </p>
                    {proj.description && (
                      <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-[11px]"
                      >
                        {proj.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Portfolio Visuals */}
          {portfolioImages.length > 0 && (
            <Section title="Portfolio" color={color}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {portfolioImages.map((img, i) => (
                  <div
                    key={i}
                    className="border rounded overflow-hidden hover:shadow-md transition-shadow duration-200"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${i + 1}`}
                      className="w-full h-28 object-cover"
                    />
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

/* --- REUSABLE COMPONENTS --- */

function Section({ title, icon, children, color }) {
  return (
    <div className="mb-3">
      <h3
        className="text-xs font-bold flex items-center gap-1.5 mb-1 border-b border-gray-300 pb-0.5"
        style={{ color }}
      >
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

/* --- PRINT-SAFE CSS --- */
const style = document.createElement("style");
style.innerHTML = `
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0;
  }
  img {
    break-inside: avoid;
  }
  .page-break {
    page-break-before: always;
  }
}
`;
document.head.appendChild(style);
