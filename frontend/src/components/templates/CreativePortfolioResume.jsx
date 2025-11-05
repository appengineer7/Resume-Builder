// src/components/templates/CreativePortfolioResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CreativePortfolioResume({ data, color = "#111827", font = "Poppins" }) {
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
      className="mx-auto w-full h-full bg-white overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: `${font}, sans-serif`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero Banner */}
      <div
        className="w-full p-6 flex flex-col justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}, #4b5563)`,
          color: "white",
          height: "150px",
        }}
      >
        <h1 className="text-4xl font-bold">{personal.fullName}</h1>
        <p className="text-lg opacity-90 tracking-wide">{personal.title || "Creative Professional"}</p>

        <div className="flex gap-6 text-sm mt-3">
          {personal.email && <span className="flex items-center gap-1"><Mail size={14}/> {personal.email}</span>}
          {personal.phone && <span className="flex items-center gap-1"><Phone size={14}/> {personal.phone}</span>}
          {personal.location && <span className="flex items-center gap-1"><MapPin size={14}/> {personal.location}</span>}
          {personal.website && <span className="flex items-center gap-1"><Globe size={14}/> {personal.website}</span>}
        </div>
      </div>

      <div className="flex flex-1">

        {/* LEFT SIDE PANEL */}
        <div className="w-1/3 bg-gray-50 border-r p-4 flex flex-col gap-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#ddd",
                overflow: "hidden",
                border: `3px solid ${color}`
              }}
            >
              {personal.profileImage ? (
                <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  Photo
                </div>
              )}
            </div>
          </div>

          {/* Profile */}
          {personal.summary && (
            <SideBlock title="ABOUT ME" color={color}>
              <p className="text-xs leading-relaxed">{personal.summary}</p>
            </SideBlock>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <SideBlock title="SKILLS" color={color}>
              <div className="flex flex-wrap gap-1">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded-full border whitespace-nowrap"
                    style={{ borderColor: color, color }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SideBlock>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SideBlock title="CERTIFICATIONS" color={color}>
              {certifications.map((c, i) => (
                <p key={i} className="text-xs mb-1">{c.name}</p>
              ))}
            </SideBlock>
          )}

          {/* Education */}
          {education.length > 0 && (
            <SideBlock title="EDUCATION" color={color}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 text-xs leading-tight">
                  <b>{e.degree}</b>
                  <br/>{e.institution}
                  <br/><span className="italic text-[10px]">{e.from} - {e.to || "Present"}</span>
                </div>
              ))}
            </SideBlock>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <SideBlock title="INTERESTS" color={color}>
              <p className="text-xs">{personal.hobbies.map(h => h.name || h).join(" • ")}</p>
            </SideBlock>
          )}

        </div>

        {/* RIGHT MAIN */}
        <div className="w-2/3 p-6 space-y-6 overflow-y-auto">

          {/* Experience */}
          {experiences.length > 0 && (
            <MainSection title="EXPERIENCE" color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between">
                    <p className="font-semibold">{exp.title}</p>
                    <p className="text-xs italic">{exp.from} - {exp.to || "Present"}</p>
                  </div>
                  <p className="text-xs text-gray-700">{exp.company}</p>
                  {exp.description &&
                    <ul className="text-xs list-disc pl-4 mt-1">
                      {exp.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  }
                </div>
              ))}
            </MainSection>
          )}

          {/* Projects Showcase */}
          {projects.length > 0 && (
            <MainSection title="FEATURED PROJECTS" color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4 p-3 rounded-lg border" style={{ borderColor: color }}>
                  <p className="font-semibold">{proj.name}</p>

                  {proj.description && (
                    <ul className="text-xs text-gray-700 mt-1 list-disc pl-4">
                      {proj.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}

                  {proj.technologies && (
                    <p className="text-[10px] italic mt-1">Tech: {proj.technologies}</p>
                  )}

                  {proj.link && (
                    <a href={proj.link} target="_blank" className="text-[11px] underline">
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </MainSection>
          )}

        </div>
      </div>
    </div>
  );
}

/* --- Components --- */

function SideBlock({ title, color, children }) {
  return (
    <div>
      <h3 className="text-xs font-bold mb-1" style={{ color }}>{title}</h3>
      <div className="bg-white p-2 rounded border text-gray-700 text-xs">{children}</div>
    </div>
  );
}

function MainSection({ title, color, children }) {
  return (
    <div>
      <h2 className="text-sm font-bold mb-2" style={{ color }}>{title}</h2>
      <div className="border-t pt-2">{children}</div>
    </div>
  );
}
