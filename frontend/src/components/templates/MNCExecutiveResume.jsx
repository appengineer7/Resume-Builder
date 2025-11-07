// src/components/templates/MNCExecutiveResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function MNCExecutiveResume({ data, color = "#0F62FE", font = "Inter" }) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [] } = data;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: font,
        background: "white",
        color: "#0b0f16",
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* Corporate Header */}
      <header style={{ borderBottom: `3px solid ${color}`, paddingBottom: 18 }}>
        <h1 style={{ fontSize: 30, margin: 0, fontWeight: 800 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, opacity: 0.85, fontWeight: 500 }}>{personal.title}</div>

        <div className=" whitespace-nowrap" style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 12, fontSize: 13 }}>
          {personal.phone && <Contact icon={<Phone size={14} />} text={personal.phone} />}
          {personal.email && <Contact icon={<Mail size={14} />} text={personal.email} />}
          {personal.location && <Contact icon={<MapPin size={14} />} text={personal.location} />}
          {personal.website && <Contact icon={<Globe size={14} />} text={personal.website} />}
        </div>
      </header>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "65% 35%", gap: 24 }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Summary */}
          {personal.summary && (
            <Section title="Executive Summary" color={color}>
              <p style={{ fontSize: 13.2, lineHeight: 1.55 }}>{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Professional Experience" color={color}>
              {experiences.map((e, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.75 }}>{e.company}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>{e.from} – {e.to || "Present"}</div>

                  {e.description && (
                    <ul style={{ fontSize: 12.5, marginLeft: 20, marginTop: 4 }}>
                      {e.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Key Projects */}
          {projects.length > 0 && (
            <Section title="Strategic Projects" color={color}>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  {p.link && <a href={p.link} style={{ fontSize: 11.5, textDecoration: "none", color }}>{p.link}</a>}
                  {p.description && (
                    <ul style={{ fontSize: 12.5, marginLeft: 20 }}>
                      {p.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Core Competencies" color={color}>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.5, fontSize: 12.5 }}>
                {skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" color={color}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 12.7, marginBottom: 4 }}>
                  ✅ {c.name} {c.date && <span style={{ opacity: 0.6 }}>({c.date})</span>}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((ed, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{ed.degree}</div>
                  <div style={{ fontSize: 12.8, opacity: 0.75 }}>{ed.institution}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>{ed.from} – {ed.to || "Present"}</div>
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
    <section style={{ borderLeft: `4px solid ${color}`, paddingLeft: 12 }}>
      <h4 style={{ fontWeight: 800, fontSize: 13, margin: 0, marginBottom: 6 }}>{title}</h4>
      {children}
    </section>
  );
}

function Contact({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

/* Utils */
function withOpacity(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const bigint = parseInt(raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}