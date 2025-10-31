// src/components/templates/ModernSidebarTemplate.jsx
import React from "react";


export default function ModernSidebarTemplate({ data, color = "#2563eb", font = "Inter" }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data;

  return (
    <div
      className="grid grid-cols-3 bg-white rounded-lg shadow-lg overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: `${font}, Arial, sans-serif`,
        fontSize: "14px",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div className="col-span-1 bg-gray-50 p-6 flex flex-col items-center text-center">
        {/* Profile */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
          {personal.profileImage ? (
            <img
              src={personal.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              Photo
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold">{personal.fullName || "Full Name"}</h1>
        <p className="text-gray-600 italic">{personal.title || "Job Title"}</p>

        {/* Contact Info */}
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          {personal.email && <p>{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.location && <p>{personal.location}</p>}
        </div>

        {/* Sidebar Skills */}
        {skills.length > 0 && (
          <div className="mt-6 w-full text-left">
            <h3 className="text-lg font-semibold mb-2" style={{ color }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-xs px-3 py-1 rounded-full"
                  style={{ color: "#333" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sidebar Certifications */}
        {certifications.length > 0 && (
          <div className="mt-6 w-full text-left">
            <h3 className="text-lg font-semibold mb-2" style={{ color }}>
              Certifications
            </h3>
            <ul className="text-xs space-y-1">
              {certifications.map((cert, i) => (
                <li key={i} className="pl-2 border-l-2" style={{ borderColor: color }}>
                  <p className="font-semibold">{cert.name}</p>
                  {cert.issuer && <p>{cert.issuer}</p>}
                  {cert.date && <p className="italic">{cert.date}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hobbies */}
        {personal.hobbies?.length > 0 && (
          <div className="mt-6 w-full text-left">
            <h3 className="text-lg font-semibold mb-2" style={{ color }}>
              Hobbies
            </h3>
            <div className="flex flex-wrap gap-2">
              {personal.hobbies.map((hobby, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-xs px-3 py-1 rounded-full"
                  style={{ color: "#333" }}
                >
                  {hobby.name || hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-2 p-6 space-y-3 overflow-y-auto">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h3 className="text-xl font-semibold mb-2" style={{ color }}>
              About Me
            </h3>
            <p className="text-gray-700 text-xs">{personal.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h3
              className="text-xl font-semibold flex items-center gap-2 mb-2"
              style={{ color }}
            >
              Work Experience
            </h3>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="mb-3 pl-2 border-l-4"
                style={{ borderColor: color }}
              >
                <div className="flex justify-between">
                  <span className="font-bold">{exp.title || "Job Title"}</span>
                  <span className="text-sm italic">
                    {exp.from} – {exp.to || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
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
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3
              className="text-xl font-semibold flex items-center gap-2 mb-2"
              style={{ color }}
            >
              Education
            </h3>
            {education.map((edu, i) => (
              <div
                key={i}
                className="mb-2 pl-2 border-l-4"
                style={{ borderColor: color }}
              >
                <p className="font-semibold">
                  {edu.degree} - {edu.institution}
                </p>
                <p className="text-xs italic">
                  {edu.from} – {edu.to || "Present"}{" "}
                  {edu.grade && `· Grade: ${edu.grade}`}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h3
              className="text-xl font-semibold flex items-center gap-2 mb-2"
              style={{ color }}
            >
              Projects
            </h3>
            {projects.map((proj, i) => (
              <div
                key={i}
                className="mb-3 pl-2 border-l-4"
                style={{ borderColor: color }}
              >
                <p className="font-semibold">{proj.name}</p>
                {proj.description &&
                  <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●')) // replaces leading "-" with "●"
                        .join('<br>')
                    }}
                  />}
                {proj.technologies && (
                  <p className="text-xs italic">Technologies: {proj.technologies}</p>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills (Full-width at bottom, optional) */}
        {skills.length > 0 && (
          <section>
            <h3
              className="text-xl font-semibold mb-2 flex items-center gap-2"
              style={{ color }}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ background: color }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
