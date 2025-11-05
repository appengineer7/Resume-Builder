// src/components/templates/StartupTechResume.jsx
import React from "react";

export default function StartupTechResume({ data, font = "Inter", color = "#111827" }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data;

  const badgeStyle = {
    padding: "1.5px 6px",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: "5px",
    background: "#F3F4F6",
    marginRight: "3px",
    display: "inline-block",
  };

  const sectionTitle = {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.2px",
    marginBottom: "3px",
    marginTop: "8px",
    color,
  };

  const divider = {
    height: "1px",
    background: "#E5E7EB",
    margin: "4px 0 4px",
  };

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        padding: "16px 14px",
        fontFamily: `${font}, sans-serif`,
        fontSize: "13px",
        background: "#fff",
        color: "#111",
        lineHeight: "1.4",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color }}>
            {personal.fullName}
          </h1>
          <p style={{ fontSize: "13.5px", fontWeight: 500, color: "#4B5563" }}>
            {personal.title}
          </p>
        </div>

        {/* Quick Skill Tags */}
        {skills.length > 0 && (
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#6B7280", marginBottom: "2px" }}>
              Core Skills
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "flex-end", maxWidth: "240px" }}>
              {skills.slice(0, 6).map((s, i) => (
                <span key={i} style={{ ...badgeStyle }}>{s}</span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Contact */}
      <p style={{ fontSize: "12.5px", marginTop: "0px", marginBottom: "12px", color: "#374151" }}>
        {personal.email} • {personal.phone} • {personal.location}
        {personal.website && ` • ${personal.website}`}
      </p>

      {/* Summary */}
      {personal.summary && (
        <>
          <div style={sectionTitle}>About Me</div>
          <div style={divider}></div>
          <p style={{ fontSize: "12.5px" }}>{personal.summary}</p>
        </>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <>
          <div style={sectionTitle}>Experience</div>
          <div style={divider}></div>

          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                <span>{exp.title}</span>
                <span style={{ fontSize: "11.5px", color: "#6B7280" }}>
                  {exp.from} - {exp.to || "Present"}
                </span>
              </div>

              <div style={{ fontSize: "12.5px", fontWeight: 500, color: "#4B5563" }}>
                {exp.company}
              </div>

              {exp.description && (
                <ul style={{ paddingLeft: "12px", marginTop: "3px" }}>
                  {exp.description.split("\n").map((line, idx) => (
                    <li key={idx} style={{ marginBottom: "1px", fontSize: "12px" }}>
                      {line.replace(/^-/, "")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <div style={sectionTitle}>Projects</div>
          <div style={divider}></div>

          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: 700 }}>{p.name}</div>

              {p.description && (
                <ul style={{ paddingLeft: "14px", marginTop: "3px" }}>
                  {p.description.split("\n").map((line, idx) => (
                    <li key={idx} style={{ fontSize: "12px" }}>{line.replace(/^-/, "")}</li>
                  ))}
                </ul>
              )}

              {p.technologies && (
                <p style={{ fontSize: "11.5px", color: "#6B7280" }}>
                  Tech: {p.technologies}
                </p>
              )}

              {p.link && <p style={{ fontSize: "11.5px" }}>{p.link}</p>}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div style={sectionTitle}>Education</div>
          <div style={divider}></div>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: "2px" }}>
              <div style={{ fontWeight: 700 }}>{e.degree}</div>
              <div style={{ color: "#6B7280", fontSize: "12px" }}>
                {e.institution}
              </div>
              <div style={{ fontSize: "11.5px", color: "#6B7280" }}>
                {e.from} - {e.to || "Present"}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <div style={sectionTitle}>Certifications</div>
          <div style={divider}></div>
          {certifications.map((c, i) => (
            <p key={i} style={{ marginBottom: "0px", fontSize: "12px" }}>
              {c.name} {c.date && `(${c.date})`}
            </p>
          ))}
        </>
      )}
    </div>
  );
}
