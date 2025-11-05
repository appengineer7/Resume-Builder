// src/components/templates/ATSMinimalResume.jsx
import React from "react";

export default function ATSMinimalResume({ data, font = "Arial" }) {
  const {
    personal = {},
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data;

  const lineStyle = {
    borderTop: "1px solid #000",
    margin: "6px 0 12px",
  };

  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        padding: "28px",
        fontFamily: `${font}, sans-serif`,
        fontSize: "13px",
        lineHeight: "1.4",
        color: "#000",
        background: "#fff",
      }}
    >
      {/* NAME & TITLE */}
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "4px" }}>
        {personal.fullName}
      </h1>
      <p style={{ marginBottom: "6px", fontWeight: "bold" }}>
        {personal.title || ""}
      </p>

      {/* CONTACT */}
      <p style={{ marginBottom: "12px" }}>
        {personal.phone && <span>{personal.phone} | </span>}
        {personal.email && <span>{personal.email} | </span>}
        {personal.location && <span>{personal.location}</span>}
      </p>

      {/* SUMMARY */}
      {personal.summary && (
        <>
          <div style={lineStyle}></div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Professional Summary</h2>
          <p>{personal.summary}</p>
        </>
      )}

      {/* EXPERIENCE */}
      {experiences.length > 0 && (
        <>
          <div style={lineStyle}></div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Work Experience</h2>

          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold" }}>
                {exp.title} — {exp.company}
              </div>
              <div style={{ fontSize: "12px", fontStyle: "italic", marginBottom: "4px" }}>
                {exp.from} - {exp.to || "Present"}
              </div>

              {exp.description && (
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  {exp.description.split("\n").map((line, idx) => (
                    <li key={idx}>
                      {line.replace(/^-/, "")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <>
          <div style={lineStyle}></div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Projects</h2>

          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold" }}>{proj.name}</div>
              {proj.description && (
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  {proj.description.split("\n").map((line, idx) => (
                    <li key={idx}>{line.replace(/^-/, "")}</li>
                  ))}
                </ul>
              )}
              {proj.technologies && (
                <p style={{ fontSize: "12px", fontStyle: "italic" }}>
                  Technologies: {proj.technologies}
                </p>
              )}
              {proj.link && (
                <p style={{ fontSize: "12px" }}>{proj.link}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <>
          <div style={lineStyle}></div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Education</h2>

          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
              <div>{edu.institution}</div>
              <div style={{ fontSize: "12px", fontStyle: "italic" }}>
                {edu.from} - {edu.to || "Present"}
              </div>
            </div>
          ))}
        </>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <>
          <div style={lineStyle}></div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Skills</h2>
          <p>{skills.join(", ")}</p>
        </>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <>
          <div style={lineStyle}></div>
          <h2 style={{ fontSize: "14px", fontWeight: "bold" }}>Certifications</h2>

          {certifications.map((c, i) => (
            <p key={i}>
              {c.name} {c.date && `(${c.date})`}
            </p>
          ))}
        </>
      )}
    </div>
  );
}
