import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
export default function MinimalEleganceModern({ data, color = "#2563eb", font = "Inter" }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data || {};

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
      {/* Header */}
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

        <h1 className="text-2xl font-bold  leading-tight"
          style={{
            color: color
          }}>
          {personal.fullName || "Full Name"}
        </h1>
        <p className="text-gray-500 italic text-xs">{personal.title || "Job Title"}</p>

        <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600 text-xs">
          {personal.email && (
            <p className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personal.email}
            </p>
          )}
          {personal.phone && (
            <p className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personal.phone}
            </p>
          )}
          {personal.location && (
            <p className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personal.location}
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="p-3">
          <h2 className="text-base font-semibold mb-1" style={{ color }}>
            About Me
          </h2>
          <p className="text-gray-700 text-[11px]">{personal.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="p-3">
          <h2 className="text-base font-semibold mb-1" style={{ color }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-full bg-gray-50 text-[10px] font-medium shadow-sm whitespace-nowrap"
                style={{ border: `1px solid ${color}` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="p-3">
          <h2 className="text-base font-semibold flex items-center gap-1 mb-1.5" style={{ color }}>
            Experience
          </h2>
          <div className="space-y-1.5">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-1.5 border-l-4 text-[11px]"
                style={{ borderColor: color, backgroundColor: "#f9fafb" }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{exp.title || "Job Title"}</span>
                  <span className="italic text-[10px] text-gray-500">
                    {exp.from || "Start"} - {exp.to || "Present"}
                  </span>
                </div>
                <p className="text-gray-600 text-[10px]">{exp.company || "Company"}</p>
                {exp.description && (
                  <p className="text-gray-700 text-[10px] mt-0.5">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="p-3">
          <h2 className="text-base font-semibold flex items-center gap-1 mb-1.5" style={{ color }}>
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-1.5 border-l-4 text-[11px]"
                style={{ borderColor: color, backgroundColor: "#f9fafb" }}
              >
                <p className="font-semibold">
                  {edu.degree || "Degree"} - {edu.institution || "Institution"}
                </p>
                <span className="italic text-[10px] text-gray-500">
                  {edu.from || "Start"} - {edu.to || "Present"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="p-3">
          <h2 className="text-base font-semibold flex items-center gap-1 mb-1.5" style={{ color }}>
            Projects
          </h2>
          <div className="grid gap-1.5">
            {projects.map((project, idx) => (
              <div key={idx} className="p-1.5 border rounded-md bg-gray-50 text-[11px]">
                <p className="font-semibold">{project.name || "Project"}</p>
                {project.description && (
                  <p className="text-[10px] text-gray-700">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="p-3">
          <h2 className="text-base font-semibold flex items-center gap-1 mb-1.5" style={{ color }}>
            Certifications
          </h2>
          <ul className="list-disc list-inside text-[10px] text-gray-700">
            {certifications.map((cert, idx) => (
              <li key={idx}>{cert.name || cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Hobbies */}
      {personal.hobbies?.length > 0 && (
        <div className="p-3">
          <h2 className="text-base font-semibold mb-1" style={{ color }}>
            Hobbies
          </h2>
          <div className="flex flex-wrap gap-1">
            {personal.hobbies.map((hobby, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded-full bg-gray-50 text-[10px] font-medium shadow-sm whitespace-nowrap"
                style={{ border: `1px solid ${color}` }}
              >
                {hobby.name || hobby}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
