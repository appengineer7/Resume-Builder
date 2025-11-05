// src/components/templates/InfographicResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe, Award, Briefcase, BookOpen, Code } from "lucide-react";

export default function InfographicResume({ data, color = "#2C5282", font = "Poppins" }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data;

  const accent = color;

  return (
    <div
      className="mx-auto overflow-hidden bg-white"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "26px 18px",
        fontFamily: `${font}, sans-serif`,
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        {/* Profile Image */}
        <div
          style={{
            width: "105px",
            height: "105px",
            borderRadius: "50%",
            border: `4px solid ${accent}`,
            overflow: "hidden",
            background: "#ddd",
          }}
        >
          {personal.profileImage ? (
            <img src={personal.profileImage} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-600 text-sm">
              Your Photo
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: accent }}>
            {personal.fullName}
          </h1>
          <p className="text-sm tracking-wide text-gray-600">{personal.title}</p>

          <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-700">
            {personal.phone && (<span className="flex items-center gap-1"><Phone size={12}/> {personal.phone}</span>)}
            {personal.email && (<span className="flex items-center gap-1"><Mail size={12}/> {personal.email}</span>)}
            {personal.location && (<span className="flex items-center gap-1"><MapPin size={12}/> {personal.location}</span>)}
            {personal.website && (<span className="flex items-center gap-1"><Globe size={12}/> {personal.website}</span>)}
          </div>
        </div>
      </div>

      {/* Summary Box */}
      {personal.summary && (
        <div
          className="mb-5 p-3 rounded-lg"
          style={{ background: "#F7F9FD", borderLeft: `4px solid ${accent}` }}
        >
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills" icon={<Code size={14} />} color={accent}>
              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-medium">
                      <span>{skill}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${80 - i * 5}%`,
                          background: accent,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" icon={<Award size={14} />} color={accent}>
              <ul className="list-disc pl-4 text-xs space-y-1">
                {certifications.map((c, i) => (
                  <li key={i}>
                    {c.name} {c.date && <span className="opacity-60">({c.date})</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" icon={<BookOpen size={14} />} color={accent}>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-700">{edu.institution}</p>
                  <p className="text-xs opacity-70 italic">{edu.from} - {edu.to || "Present"}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Section title="Hobbies" icon={<Award size={14} />} color={accent}>
              <div className="flex flex-wrap gap-2">
                {personal.hobbies.map((h, i) => (
                  <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {h.name || h}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Work Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" icon={<Briefcase size={14} />} color={accent}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-4 relative pl-5">
                  <div
                    className="absolute left-0 top-1.5 h-3 w-3 rounded-full"
                    style={{ background: accent }}
                  />
                  <p className="font-semibold text-sm">{exp.title}</p>
                  <p className="text-xs text-gray-700">{exp.company}</p>
                  <p className="text-xs italic opacity-70">{exp.from} - {exp.to || "Present"}</p>

                  {exp.description && (
                    <ul className="list-disc pl-4 mt-1 text-xs text-gray-700">
                      {exp.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" icon={<Code size={14} />} color={accent}>
              {projects.map((p, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold text-sm">{p.name}</p>
                  {p.description && (
                    <ul className="list-disc pl-4 mt-1 text-xs text-gray-700">
                      {p.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                  {p.link && (
                    <a href={p.link} className="text-xs text-blue-600 underline" target="_blank">
                      {p.link}
                    </a>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, color, children }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color }}>
        {icon} {title}
      </h3>
      <div className="border-l-4 pl-3 pb-1" style={{ borderColor: color }}>
        {children}
      </div>
    </div>
  );
}
