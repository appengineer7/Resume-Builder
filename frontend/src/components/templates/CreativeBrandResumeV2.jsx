// src/components/templates/CreativeBrandResumeV2.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CreativeBrandResumeV2({ data, color = "#3B82F6", font = "Inter" }) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [] } = data;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#f8fafc",
        fontFamily: font,
        color: "#0f172a",
        padding: "20px 26px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Modern Header */}
      <div
        style={{
          padding: "30px",
          background: "white",
          borderRadius: "14px",
          border: `2px solid ${withOpacity(color, 0.25)}`,
          marginBottom: 20,
          boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, opacity: 0.9, marginTop: 6 }}>{personal.title}</div>

        {/* Contact */}
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 12, fontSize: 13 }}>
          {personal.phone && <Contact icon={<Phone size={14} />} text={personal.phone} />}
          {personal.email && <Contact icon={<Mail size={14} />} text={personal.email} />}
          {personal.location && <Contact icon={<MapPin size={14} />} text={personal.location} />}
          {personal.website && <Contact icon={<Globe size={14} />} text={personal.website} />}
        </div>
      </div>

      {/* Body Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "65% 35%", gap: 18, flex: 1 }}>
        {/* Left Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" color={color}>
              {experiences.map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 12.5, opacity: 0.75 }}>{e.company}</div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>
                    {e.from} – {e.to || "Present"}
                  </div>
                  {e.description && (
                    <ul style={{ marginLeft: 18, fontSize: 12.5 }}>
                      {e.description.split("\n").map((line, idx) => (
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
            <Section title="Projects" color={color}>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  {p.link && (
                    <a href={p.link} style={{ fontSize: 11.5, textDecoration: "none", color }}>
                      {p.link}
                    </a>
                  )}
                  {p.description && (
                    <ul style={{ marginLeft: 18, fontSize: 12.5 }}>
                      {p.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                  {p.technologies && (
                    <div style={{ fontSize: 11.5, opacity: 0.75 }}>Tech: {p.technologies}</div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Summary */}
          {personal.summary && (
            <Section title="Profile" color={color}>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>{personal.summary}</p>
            </Section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills" color={color}>
              <div className="whitespace-nowrap" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 12,
                      padding: "4px 8px",
                      background: withOpacity(color, 0.12),
                      borderRadius: 6,
                      border: `1px solid ${withOpacity(color, 0.25)}`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" color={color}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 12.5, marginBottom: 4 }}>
                  {c.name} {c.date && <span style={{ opacity: 0.6 }}>({c.date})</span>}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((ed, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{ed.degree}</div>
                  <div style={{ fontSize: 12.5, opacity: 0.8 }}>{ed.institution}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>
                    {ed.from} – {ed.to || "Present"}
                  </div>
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
    <div style={{ background: "white", padding: 14, borderRadius: 12, borderLeft: `4px solid ${color}` }}>
      <div style={{ fontWeight: 800, fontSize: 12.5, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
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

/* utils */
function withOpacity(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const bigint = parseInt(raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
