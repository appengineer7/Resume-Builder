// src/components/templates/TrendyResumeTemplate.jsx
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

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
      className="bg-white shadow-lg mx-auto"
      style={{
        width: "210mm", 
        height: "297mm",
        padding: "0px", 
        fontFamily: `${font}, Arial, sans-serif`,
        fontSize: "11px", 
        lineHeight: "1.35",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-2 print:shadow-none">
          {personal.profileImage ? (
            <img
              src={personal.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">
              Photo
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 leading-tight">
          {personal.fullName || "Full Name"}
        </h1>
        <p className="text-gray-500 italic text-xs">{personal.title || "Job Title"}</p>

        <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600 text-xs">
          {personal.email && (
            <p className="flex items-center gap-1">
              <Mail size={14} /> {personal.email}
            </p>
          )}
          {personal.phone && (
            <p className="flex items-center gap-1">
              <Phone size={14} /> {personal.phone}
            </p>
          )}
          {personal.location && (
            <p className="flex items-center gap-1">
              <MapPin size={14} /> {personal.location}
            </p>
          )}
        </div>
      </div>

      {/* About Me */}
      {personal.summary && (
        <section className="p-3">
          <h3 className="text-base font-bold mb-1" style={{ color }}>
            About Me
          </h3>
          <p className="text-gray-700 leading-snug">{personal.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="px-3">
          <h3 className="text-base font-bold mb-1 flex items-center gap-1" style={{ color }}>
             Skills
          </h3>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-white text-xs"
                style={{ background: color }}
              >
                {skill.name || skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="p-3">
          <h3 className="text-base font-bold mb-1 flex items-center gap-1" style={{ color }}>
            Experience
          </h3>
          <div className="space-y-2">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="p-2 rounded-md shadow-sm border-l-4"
                style={{ borderColor: color }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{exp.title}</p>
                  <p className="text-xs italic">
                    {exp.from} - {exp.to || "Present"}
                  </p>
                </div>
                <p className="text-gray-600 text-xs">{exp.company}</p>
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
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="px-3">
          <h3 className="text-base font-bold mb-1 flex items-center gap-1" style={{ color }}>
            Education
          </h3>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div
                key={i}
                className="p-2 rounded-md shadow-sm border-l-4"
                style={{ borderColor: color }}
              >
                <p className="font-semibold">
                  {edu.degree} - {edu.institution}
                </p>
                <p className="text-xs italic">
                  {edu.from} - {edu.to || "Present"}{" "}
                  {edu.grade && `· Grade: ${edu.grade}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="p-3">
          <h3 className="text-base font-bold mb-1 flex items-center gap-1" style={{ color }}>
           Projects
          </h3>
          <div className="space-y-2">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="p-2 rounded-md shadow-sm border-l-4"
                style={{ borderColor: color }}
              >
                <p className="font-semibold">{proj.name}</p>
                {proj.description && 
                <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />}
                {proj.technologies && (
                  <p className="text-[10px] italic">Tech: {proj.technologies}</p>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-[10px] hover:underline"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="px-3">
          <h3 className="text-base font-bold mb-1 flex items-center gap-1" style={{ color }}>
           Certifications
          </h3>
          <div className="grid gap-2 grid-cols-2">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="p-2 bg-gray-50 rounded-md shadow-sm border-l-4"
                style={{ borderColor: color }}
              >
                <p className="font-semibold text-xs">{cert.name}</p>
                {cert.issuer && <p className="text-[10px] text-gray-500">{cert.issuer}</p>}
                {cert.date && <p className="text-[10px] italic">{cert.date}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {personal.hobbies?.length > 0 && (
        <section className="p-3">
          <h3 className="text-base font-bold mb-1" style={{ color }}>
            Hobbies
          </h3>
          <div className="flex flex-wrap gap-1">
            {personal.hobbies.map((h, i) => (
              <span
                key={i}
                className="bg-gray-200 text-[10px] px-2 py-0.5 rounded-full"
              >
                {h.name || h}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
