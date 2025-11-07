// src/components/templates/CreativeBrandResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CreativeBrandResume({
  data,
  color = "#8B5CF6",
  font = "Inter",
}) {
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
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#ffffff",
        fontFamily: font,
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Branded Header */}
      <div
        style={{
          padding: "28px 26px 20px",
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.16) 0%, rgba(14,165,233,0.14) 100%)",
          borderBottom: `2px solid ${withOpacity(color, 0.25)}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.7), rgba(14,165,233,0.7))",
              boxShadow: `0 6px 24px ${withOpacity(color, 0.35)}`,
            }}
          />
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: 0.2,
                color: "#0b1220",
              }}
            >
              {personal.fullName}
            </h1>
            <div
              style={{
                marginTop: 2,
                fontSize: 14,
                opacity: 0.85,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Chip color={color}>{personal.title}</Chip>
              {personal.tagline && <Chip soft>{personal.tagline}</Chip>}
            </div>
          </div>
        </div>

        {/* Contact row */}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            fontSize: 12.5,
            color: "#0f172a",
            opacity: 0.9,
          }}
        >
          {personal.phone && <Contact icon={<Phone size={14} />} text={personal.phone} />}
          {personal.email && <Contact icon={<Mail size={14} />} text={personal.email} />}
          {personal.location && <Contact icon={<MapPin size={14} />} text={personal.location} />}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "34% 66%",
          gap: 20,
          padding: "20px 22px 26px",
          flex: 1,
        }}
      >
        {/* Left Column — Brand sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* About / Summary */}
          {personal.summary && (
            <Card title="About Me" color={color}>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>{personal.summary}</p>
            </Card>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Card title="Core Skills" color={color}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((s, i) => (
                  <SkillPill key={i} color={color}>
                    {s}
                  </SkillPill>
                ))}
              </div>
            </Card>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Card title="Certifications" color={color}>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12.5, lineHeight: 1.5 }}>
                {certifications.map((c, i) => (
                  <li key={i}>
                    {c.name} {c.date && <span style={{ opacity: 0.7 }}>({c.date})</span>}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Card title="Hobbies" color={color}>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12.5, lineHeight: 1.5 }}>
                {personal.hobbies?.map((hobby, i) => (
                  <li key={i}>
                    • {hobby.name || hobby}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right Column — Experience, Projects, Education */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Experience */}
          {experiences.length > 0 && (
            <Card title="Experience" color={color}>
              {experiences.map((e, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 0",
                    borderTop: i === 0 ? "none" : "1px dashed #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{e.title}</div>
                      <div style={{ fontSize: 12.5, opacity: 0.85 }}>{e.company}</div>
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                      {e.from} – {e.to || "Present"}
                    </div>
                  </div>
                  {e.description && (
                    <ul style={{ marginTop: 6, marginLeft: 18, fontSize: 12.5 }}>
                      {e.description.split("\n").map((line, idx) => (
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
            <Card title="Selected Projects" color={color}>
              {projects.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 0",
                    borderTop: i === 0 ? "none" : "1px dashed #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.name}</div>
                    {p.link && (
                      <a
                        href={p.link}
                        style={{
                          fontSize: 11.5,
                          textDecoration: "none",
                          color,
                        }}
                      >
                        {p.link}
                      </a>
                    )}
                  </div>
                  {p.description && (
                    <ul style={{ marginTop: 6, marginLeft: 18, fontSize: 12.5 }}>
                      {p.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line.replace(/^-/, "")}</li>
                      ))}
                    </ul>
                  )}
                  {p.technologies && (
                    <div style={{ marginTop: 4, fontSize: 11.5, opacity: 0.75 }}>
                      Tech: {p.technologies}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Card title="Education" color={color}>
              {education.map((ed, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 0",
                    borderTop: i === 0 ? "none" : "1px dashed #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{ed.degree}</div>
                      <div style={{ fontSize: 12.5, opacity: 0.85 }}>{ed.institution}</div>
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                      {ed.from} – {ed.to || "Present"}
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- UI primitives ---------- */

function Card({ title, color, children }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 14,
        background:
          "linear-gradient(0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.96))",
        boxShadow: "0 4px 20px rgba(2, 6, 23, 0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 0 3px ${withOpacity(color, 0.18)}`,
          }}
        />
        <div
          style={{
            fontWeight: 800,
            fontSize: 12.5,
            letterSpacing: 0.3,
            textTransform: "uppercase",
            color: "#0b1220",
          }}
        >
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}

function Chip({ children, color, soft = false }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: soft ? "#eef2ff" : withOpacity(color || "#8B5CF6", 0.14),
        color: soft ? "#3730a3" : "#0b1220",
        border: soft ? "1px solid #e0e7ff" : `1px solid ${withOpacity(color || "#8B5CF6", 0.3)}`,
      }}
    >
      {children}
    </span>
  );
}

function SkillPill({ children, color }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "4px 10px",
        borderRadius: 999,
        background:
          "linear-gradient(180deg, #ffffff, rgba(249,250,251,0.9))",
        border: `1px solid ${withOpacity(color, 0.25)}`,
        boxShadow: "0 2px 10px rgba(2,6,23,0.04)",
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

/* ---------- utils ---------- */
function withOpacity(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const bigint = parseInt(raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
