// src/components/templates/GoogleMaterialResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function GoogleMaterialResume({ data, color = "#1A73E8", font = "Inter" }) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [] } = data;

  return (
    <div
      className="mx-auto bg-[#F9FAFB]"
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: `${font}, sans-serif`,
        padding: "0",
        overflow: "hidden"
      }}
    >
      {/* Top App Bar */}
      <div
        style={{
          background: color,
          color: "#fff",
          padding: "22px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <h1 className="text-3xl font-semibold">{personal.fullName}</h1>
        <p className="text-sm">{personal.title}</p>
      </div>

      {/* Contact Row */}
      <div className="flex justify-center gap-8 text-xs py-2 bg-white shadow-sm">
        {personal.phone && <span className="flex items-center gap-1"><Phone size={12}/> {personal.phone}</span>}
        {personal.email && <span className="flex items-center gap-1"><Mail size={12}/> {personal.email}</span>}
        {personal.location && <span className="flex items-center gap-1"><MapPin size={12}/> {personal.location}</span>}
        {personal.website && <span className="flex items-center gap-1"><Globe size={12}/> {personal.website}</span>}
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-4 p-5">

        {/* Left Column */}
        <div className="col-span-1 space-y-4">

          {/* Profile */}
          {personal.summary && (
            <Card title="About Me" color={color}>
              <p className="text-xs text-gray-700 leading-relaxed">{personal.summary}</p>
            </Card>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Card title="Skills" color={color}>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-[2px] bg-gray-100 text-xs rounded-md border whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Card title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <p key={i} className="text-xs mb-1">
                  <span className="font-medium">{cert.name}</span> {cert.date && `(${cert.date})`}
                </p>
              ))}
            </Card>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Card title="Education" color={color}>
              {education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium text-xs">{edu.degree}</p>
                  <p className="text-[11px] text-gray-600">{edu.institution}</p>
                  <p className="text-[10px] italic">{edu.from} - {edu.to || "Present"}</p>
                </div>
              ))}
            </Card>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Card title="Interests" color={color}>
              <p className="text-xs">{personal.hobbies.map(h => h.name || h).join(", ")}</p>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-4">

          {/* Work Experience */}
          {experiences.length > 0 && (
            <Card title="Work Experience" color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-xs">
                    <p className="font-semibold">{exp.title}</p>
                    <p className="italic">{exp.from} - {exp.to || "Present"}</p>
                  </div>
                  <p className="text-xs text-gray-700">{exp.company}</p>

                  {exp.description && (
                    <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
                      {exp.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Card>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Card title="Projects" color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4 border-l-4 pl-2" style={{ borderColor: color }}>
                  <p className="font-medium text-xs">{proj.name}</p>

                  {proj.description && (
                    <ul className="text-xs text-gray-700 list-disc pl-4">
                      {proj.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}

                  {proj.technologies && <p className="text-[11px] italic mt-1">Tech: {proj.technologies}</p>}
                  {proj.link && (
                    <a
                      className="text-[11px] underline"
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* Card Component */
function Card({ title, color, children }) {
  return (
    <div className="bg-white shadow-sm rounded-md p-3 border border-gray-200">
      <h3 className="text-xs font-semibold mb-2" style={{ color }}>{title}</h3>
      {children}
    </div>
  );
}
