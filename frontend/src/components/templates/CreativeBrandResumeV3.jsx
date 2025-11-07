// src/components/templates/CreativeBrandResumeV3.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CreativeBrandResumeV3({ data, color = "#EA580C", font = "Inter" }) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [] } = data;

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#ffffff",
        fontFamily: font,
        color: "#0f172a",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Header - Bold Left Bar */}
      <header style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 8, height: "100%", background: color, borderRadius: 4 }} />
        <div>
          <h1 style={{ fontSize: 34, margin: 0, fontWeight: 900 }}>{personal.fullName}</h1>
          <div style={{ fontSize: 15, opacity: 0.8 }}>{personal.title}</div>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 13,
            }}
          >
            {personal.phone && <Contact icon={<Phone size={14} />} text={personal.phone} />}
            {personal.email && <Contact icon={<Mail size={14} />} text={personal.email} />}
            {personal.location && <Contact icon={<MapPin size={14} />} text={personal.location} />}
            {personal.website && <Contact icon={<Globe size={14} />} text={personal.website} />}
          </div>
        </div>
      </header>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "62% 38%", gap: 22 }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Summary */}
          {personal.summary && (
            <Block title="Professional Summary" color={color}>
              <p style={{ fontSize: 13.2, lineHeight: 1.52 }}>{personal.summary}</p>
            </Block>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Block title="Work Experience" color={color}>
              {experiences.map((e, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.75 }}>{e.company}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>{e.from} - {e.to || "Present"}</div>

                  {e.description && (
                    <ul style={{ fontSize: 12.5, marginLeft: 18, marginTop: 4 }}>
                      {e.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Block>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Block title="Highlighted Projects" color={color}>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                  {p.link && (
                    <a href={p.link} style={{ fontSize: 11.5, textDecoration: "none", color }}>
                      {p.link}
                    </a>
                  )}
                  {p.description && (
                    <ul style={{ fontSize: 12.5, marginLeft: 18 }}>
                      {p.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Block>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <Block title="Skills & Tools" color={color}>
              <div className=" whitespace-nowrap" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((s, i) => (
                  <Tag key={i} color={color}>{s}</Tag>
                ))}
              </div>
            </Block>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Block title="Education" color={color}>
              {education.map((ed, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{ed.degree}</div>
                  <div style={{ fontSize: 12.8, opacity: 0.75 }}>{ed.institution}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>{ed.from} - {ed.to || "Present"}</div>
                </div>
              ))}
            </Block>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Block title="Certifications" color={color}>
              {certifications.map((c, i) => (
                <div key={i} style={{ fontSize: 12.5, marginBottom: 4 }}>
                  {c.name} {c.date && <span style={{ opacity: 0.6 }}>({c.date})</span>}
                </div>
              ))}
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable UI */
function Block({ title, color, children }) {
  return (
    <section style={{ background: "#fafafa", padding: 14, borderRadius: 10, border: `1px solid ${withOpacity(color,0.25)}` }}>
      <div style={{ fontWeight: 800, fontSize: 12.5, marginBottom: 6 }}>{title}</div>
      {children}
    </section>
  );
}

function Tag({ children, color }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "4px 8px",
        background: withOpacity(color, 0.1),
        borderRadius: 6,
        border: `1px solid ${withOpacity(color, 0.3)}`,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
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