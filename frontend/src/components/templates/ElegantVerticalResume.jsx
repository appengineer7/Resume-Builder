// src/components/templates/ElegantVerticalResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ElegantVerticalResume({ data, color = "#0D1B2A", font = "Inter" }) {
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
      className="bg-white shadow-xl mx-auto border"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "28px 32px",
        fontFamily: `${font}, sans-serif`,
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color }}>{personal.fullName}</h1>
        <p className="text-sm tracking-wide">{personal.title || "Professional Title"}</p>

        <div className="flex justify-center gap-4 text-xs mt-2 opacity-80">
          {personal.phone && (<span className="flex items-center gap-1"><Phone size={12}/> {personal.phone}</span>)}
          {personal.email && (<span className="flex items-center gap-1"><Mail size={12}/> {personal.email}</span>)}
          {personal.location && (<span className="flex items-center gap-1"><MapPin size={12}/> {personal.location}</span>)}
          {personal.website && (<span className="flex items-center gap-1"><Globe size={12}/> {personal.website}</span>)}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <Section title="PROFILE" color={color}>
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </Section>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-5">

          {/* Skills */}
          {skills.length > 0 && (
            <SidebarBlock title="Skills" color={color}>
              <ul className="text-xs space-y-1">
                {skills.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </SidebarBlock>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SidebarBlock title="Certifications" color={color}>
              {certifications.map((c, i) => (
                <p key={i} className="text-xs mb-1">
                  {c.name} {c.date && <span>({c.date})</span>}
                </p>
              ))}
            </SidebarBlock>
          )}

          {/* Education */}
          {education.length > 0 && (
            <SidebarBlock title="Education" color={color}>
              {education.map((e, i) => (
                <p key={i} className="text-xs mb-2">
                  <span className="font-semibold">{e.degree}</span><br />
                  {e.institution}<br />
                  <span className="text-[11px] italic">{e.from} - {e.to || "Present"}</span>
                </p>
              ))}
            </SidebarBlock>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <SidebarBlock title="Hobbies" color={color}>
              <p className="text-xs">{personal.hobbies.map(h => h.name || h).join(", ")}</p>
            </SidebarBlock>
          )}

        </div>

        {/* Main Column */}
        <div className="col-span-2 space-y-6">

          {/* Work Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between">
                    <p className="font-semibold">{exp.title}</p>
                    <p className="text-xs italic">{exp.from} - {exp.to || "Present"}</p>
                  </div>
                  <p className="text-xs mb-1 text-gray-700">{exp.company}</p>

                  {exp.description && (
                    <ul className="text-xs text-gray-700 leading-relaxed mt-1 list-disc pl-4">
                      {exp.description.split("\n").map((l, idx) => <li key={idx}>{l.replace(/^-/, "")}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4 border-l-4 pl-3" style={{ borderColor: color }}>
                  <p className="font-semibold">{proj.name}</p>

                  {proj.description && (
                    <ul className="text-xs text-gray-700 mt-1 list-disc pl-4">
                      {proj.description.split("\n").map((l, idx) => <li key={idx}>{l.replace(/^-/, "")}</li>)}
                    </ul>
                  )}

                  {proj.technologies && (
                    <p className="text-[11px] italic mt-1">Tech: {proj.technologies}</p>
                  )}

                  {proj.link && (
                    <a className="text-[11px] underline" href={proj.link} target="_blank" rel="noreferrer">
                      {proj.link}
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

/* Components */
function Section({ title, color, children }) {
  return (
    <div>
      <h3 className="text-sm font-bold mb-2" style={{ color }}>{title}</h3>
      <div className="border-t border-gray-300 pt-2">{children}</div>
    </div>
  );
}

function SidebarBlock({ title, color, children }) {
  return (
    <div>
      <h4 className="text-xs font-bold mb-1" style={{ color }}>{title.toUpperCase()}</h4>
      <div className="bg-gray-50 border p-2 rounded text-gray-800">{children}</div>
    </div>
  );
}
