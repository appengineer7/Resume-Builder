// src/components/templates/TrendyResumeTemplate.jsx
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function TrendyResumeTemplate({ data, color = "#4f46e5", font = "Arial" }) {
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
      className="
        flex flex-col lg:flex-row bg-white text-gray-800
        min-h-screen lg:gap-2
        print:flex print:flex-row print:bg-white print:min-h-[297mm] print:w-[210mm] print:gap-6
      "
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: `${font}, sans-serif`,
        fontSize: "13px",
        lineHeight: "1.4",
        boxSizing: "border-box",
      }}
    >
      {/* ===== SIDEBAR ===== */}
      <aside
        className="
          lg:w-1/3 bg-gray-100 p-5 flex flex-col items-center shadow-md rounded-lg
          print:w-1/3 print:shadow-none print:border-r print:border-gray-300 print:rounded-none
        "
      >
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow mb-3 print:border print:border-gray-400 print:shadow-none bg-gray-200 flex items-center justify-center">
          {personal.profileImage ? (
            <img
              src={personal.profileImage}
              alt="Profile"
              className="w-full h-full object-cover object-center scale-110"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : (
            <div className="text-gray-600 text-xs">Photo</div>
          )}
        </div>

        {/* Name & Title */}
        <h1 className="text-xl font-bold text-gray-800 text-center leading-tight">
          {personal.fullName || "Your Name"}
        </h1>
        <p className="text-gray-500 text-xs mb-3 text-center">
          {personal.title || "Your Title"}
        </p>

        {/* Contact Info */}
        <div className="w-full space-y-1.5 text-gray-700 text-xs mb-5">
          {personal.email && (
            <p className="flex items-center gap-2 break-all">
              <Mail size={14} /> {personal.email}
            </p>
          )}
          {personal.phone && (
            <p className="flex items-center gap-2">
              <Phone size={14} /> {personal.phone}
            </p>
          )}
          {personal.location && (
            <p className="flex items-center gap-2">
              <MapPin size={14} /> {personal.location}
            </p>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-3 w-full no-break">
            <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color }}>
              Skills
            </h3>
            <div className="flex flex-col gap-2">
              {skills.slice(0, 8).map((skill, i) => (
                <div key={i}>
                  <p className="text-xs font-medium">{skill.name || skill}</p>
                  <div className="w-full bg-gray-300 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${Math.min(100, skill.level || 70)}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mt-4 w-full no-break">
            <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color }}>
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.slice(0, 3).map((cert, i) => (
                <div
                  key={i}
                  className="bg-white p-2 rounded shadow border-l-4 print:shadow-none print:border print:border-gray-300"
                  style={{ borderColor: color }}
                >
                  <p className="font-semibold text-xs">{cert.name}</p>
                  {cert.issuer && <p className="text-[10px] text-gray-500">{cert.issuer}</p>}
                  {cert.date && <p className="text-[10px] italic">{cert.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {personal.hobbies?.length > 0 && (
          <div className="mt-4 w-full no-break">
            <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color }}>
              Hobbies
            </h3>
            <div className="flex flex-wrap gap-1">
              {personal.hobbies.slice(0, 5).map((hobby, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-[10px] px-2 py-0.5 rounded-full text-gray-700 print:border print:border-gray-300"
                >
                  {hobby.name || hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="
          lg:w-2/3 px-2 py-4 space-y-3
          print:shadow-none print:p-3 print:space-y-3
        "
      >
        {/* About Me */}
        {personal.summary && (
          <section className="no-break">
            <h3 className="text-lg font-bold mb-1" style={{ color }}>
              About Me
            </h3>
            <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-line">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="no-break">
            <h3 className="text-lg font-bold mb-2" style={{ color }}>
              Experience
            </h3>
            <div className="space-y-2">
              {experiences.slice(0, 3).map((exp, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded shadow border-l-4 print:shadow-none print:border print:border-gray-300"
                  style={{ borderColor: color }}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">{exp.title}</p>
                    <span className="text-[10px] italic">
                      {exp.from} - {exp.to || "Present"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-700 text-[11px] mt-1 leading-snug">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="no-break">
            <h3 className="text-lg font-bold mb-2" style={{ color }}>
              Education
            </h3>
            <div className="space-y-2">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded shadow border-l-4 print:shadow-none print:border print:border-gray-300"
                  style={{ borderColor: color }}
                >
                  <p className="font-semibold text-sm">{edu.degree}</p>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                  <p className="text-[10px] italic">
                    {edu.from} - {edu.to || "Present"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="no-break">
            <h3 className="text-lg font-bold mb-2" style={{ color }}>
              Projects
            </h3>
            <div className="space-y-2">
              {projects.slice(0, 3).map((proj, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded shadow border-l-4 print:shadow-none print:border print:border-gray-300"
                  style={{ borderColor: color }}
                >
                  <p className="font-semibold text-sm">{proj.name}</p>
                  {proj.description && (
                    <p className="text-[11px] mt-1 leading-snug">{proj.description}</p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-[10px] hover:underline break-all print:text-black"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools & Tech */}
        {skills.length > 0 && (
          <section className="no-break">
            <h3 className="text-lg font-bold mb-2" style={{ color }}>
              Tools & Tech
            </h3>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 12).map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full text-white print:text-black print:border print:border-gray-400 print:bg-white"
                  style={{ backgroundColor: color }}
                >
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
