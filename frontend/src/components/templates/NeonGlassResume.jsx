// src/components/templates/NeonGlassResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function NeonGlassResume({ data, color = "#00E5FF", font = "Inter" }) {
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
                padding: "28px",
                fontFamily: font,
                background: "#0A0A0C",
                color: "#EAFBFF",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Neon blur background lights */}
            <div style={neonBlob("#00E5FF", "-100px", "-80px")} />
            <div style={neonBlob("#9b5cff", "60%", "20%")} />
            <div style={neonBlob("#00ffc6", "20%", "70%")} />

            {/* Glass container */}
            <div
                style={{
                    backdropFilter: "blur(12px)",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "26px",
                    border: "1px solid rgba(255,255,255,0.15)",
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color }}>{personal.fullName}</h1>
                    <p style={{ fontSize: "14px", opacity: 0.9 }}>{personal.title}</p>

                    {/* Contact */}
                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                            gap: "14px",
                            fontSize: "12.5px",
                            opacity: 0.9,
                        }}
                    >
                        {personal.phone && <Item text={personal.phone} icon={<Phone size={13} />} />}
                        {personal.email && <Item text={personal.email} icon={<Mail size={13} />} />}
                        {personal.location && <Item text={personal.location} icon={<MapPin size={13} />} />}
                        {personal.website && <Item text={personal.website} icon={<Globe size={13} />} />}
                    </div>
                </div>

                {/* Summary */}
                {personal.summary && (
                    <Section title="Summary" color={color}>
                        <p style={{ fontSize: "13px" }}>{personal.summary}</p>
                    </Section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <Section title="Experience" color={color}>
                        {experiences.map((e, i) => (
                            <div key={i} style={{ marginBottom: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                                    <span>{e.title}</span>
                                    <span style={{ opacity: 0.7, fontSize: "12px" }}>{e.from} – {e.to || "Present"}</span>
                                </div>
                                <p style={{ fontSize: "12.5px", opacity: 0.9 }}>{e.company}</p>
                                <ul style={{ marginLeft: "16px", fontSize: "12.5px", opacity: 0.95 }}>
                                    {e.description?.split("\n").map((l, idx) => (
                                        <li key={idx}>{l.replace(/^-/, "")}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <Section title="Projects" color={color}>
                        {projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: "12px" }}>
                                <b>{p.name}</b>
                                <ul style={{ marginLeft: "16px", fontSize: "12.5px" }}>
                                    {p.description?.split("\n").map((l, idx) => (
                                        <li key={idx}>{l.replace(/^-/, "")}</li>
                                    ))}
                                </ul>
                                {p.technologies && (
                                    <p style={{ fontSize: "11px", fontStyle: "italic", opacity: 0.8 }}>
                                        Tech: {p.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </Section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <Section title="Education" color={color}>
                        {education.map((e, i) => (
                            <div key={i} style={{ marginBottom: "8px" }}>
                                <b>{e.degree}</b> — {e.institution}
                                <span style={{ float: "right", fontSize: "12px", opacity: 0.7 }}>
                                    {e.from} – {e.to || "Present"}
                                </span>
                            </div>
                        ))}
                    </Section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <Section title="Skills" color={color}>
                        <p style={{ fontSize: "13px" }}>{skills.join(" • ")}</p>
                    </Section>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <Section title="Certifications" color={color}>
                        <ul style={{ marginLeft: "16px", fontSize: "12.5px" }}>
                            {certifications.map((c, i) => (
                                <li key={i}>{c.name} {c.date && `(${c.date})`}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                {personal.hobbies?.length > 0 && (
                    <Section title="Hobbies" color={color}>
                        <ul style={{ marginLeft: "16px", fontSize: "12.5px" }}>
                            {personal.hobbies.map((hobby, i) => (
                                <li key={i}>{hobby.name || hobby}</li>
                            ))}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
    );
}

/* Components */
function Item({ icon, text }) {
    return <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>{icon} {text}</div>;
}

function Section({ title, children, color }) {
    return (
        <div style={{ marginTop: "18px" }}>
            <h3 style={{
                fontSize: "13px",
                fontWeight: 700,
                borderBottom: `1.5px solid ${color}`,
                paddingBottom: "4px",
                marginBottom: "8px",
                textShadow: `0px 0px 6px ${color}`
            }}>
                {title.toUpperCase()}
            </h3>
            {children}
        </div>
    );
}

/* Neon floating blur effect helper */
function neonBlob(color, left, top) {
    return {
        position: "absolute",
        left,
        top,
        width: "260px",
        height: "260px",
        background: color,
        filter: "blur(140px)",
        opacity: 0.4,
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite",
    };
}
