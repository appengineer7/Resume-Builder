import React from "react";
import { Briefcase, GraduationCap, Star, Award } from "lucide-react";

export default function ProfessionalTemplate({
  data,
  color = "#1f2937",
  font = "Inter"
}) {
  const {
    personal,
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = []
  } = data;

  return (
    <div
      className="p-2 rounded-lg shadow-lg bg-white"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "0px",
        fontFamily: `${font}, Arial, sans-serif`,
        fontSize: "13px"
      }}
    >
      {/* Header */}
      <div className="flex gap-2 items-center p-2">
        {/* Profile Image Placeholder */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
          {personal.profileImage ? (
            <img
              src={personal.profileImage}
              alt={personal.fullName || "Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
              Photo
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color }}>
            {personal.fullName || "Full Name"}
          </h1>
          <p className="italic text-base">{personal.title || "Job Title"}</p>
          <p className="text-xs text-gray-600">
            {personal.email} · {personal.phone} · {personal.location}
          </p>
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="p-2">
          <h3 className="text-lg font-semibold mb-1" style={{ color }}>
            About Me
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color }}>
           Work Experience
          </h3>
          <div className="border-l-2 border-gray-300 pl-3">
            {experiences.map((exp, i) => (
              <div key={i} className=" relative">
                <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-sm">{exp.title}</div>
                    <div className="text-xs text-gray-600">{exp.company}</div>
                  </div>
                  <div className="text-xs italic">
                    {exp.from} - {exp.to || "Present"}
                  </div>
                </div>
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
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color }}>
           Education
          </h3>
          <div className="border-l-2 border-gray-300 pl-3">
            {education.map((edu, i) => (
              <div key={i} className=" relative">
                <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <div className="font-semibold text-sm">
                  {edu.degree} - {edu.institution}
                </div>
                <div className="text-xs italic">
                  {edu.from} - {edu.to || "Present"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color }}>
           Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="px-2.5 py-0.5 rounded-full text-white text-xs font-medium"
                style={{ backgroundColor: color }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color }}>
           Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {projects.map((proj, i) => (
              <div key={i} className="p-2 border rounded shadow-sm text-xs">
                <div className="font-semibold text-sm">{proj.name}</div>
                <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />
                {proj.technologies && (
                  <div className="italic text-gray-500">
                    Tech: {proj.technologies}
                  </div>
                )}
                {proj.link && (
                  <div className="text-blue-600">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                      {proj.link}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="p-3">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color }}>
           Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-white text-xs font-medium"
                style={{ backgroundColor: color }}
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hobbies */}
      {personal.hobbies?.length > 0 && (
        <section className="p-3">
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2" style={{ color }}>
            Hobbies
          </h3>
          <div className="flex flex-wrap gap-2">
            {personal.hobbies.map((hobby, i) => {
              const hobbyName = typeof hobby === "string" ? hobby : hobby.name;
              return (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                  style={{ background: color }}
                >
                  {hobbyName}
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
