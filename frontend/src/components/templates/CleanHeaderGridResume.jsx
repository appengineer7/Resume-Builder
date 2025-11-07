// src/components/templates/CleanHeaderGridResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CleanHeaderGridResume({ data, color = "#0C3A5B", font = "Inter" }) {
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
                height: "297mm",
                background: "#fff",
                fontFamily: font,
                display: "flex",
                flexDirection: "column",
                padding: "26px",
                fontSize: "14px"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color }}>{personal.fullName}</h1>
                <p style={{ fontSize: "15px", opacity: 0.9 }}>{personal.title}</p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    background: color,
                    color: "white",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12.5px",
                    marginBottom: "22px",
                    gap: "135px"
                }}
            >
                {personal.phone && <Item icon={<Phone size={14} />} text={personal.phone} />}
                {personal.email && <Item icon={<Mail size={14} />} text={personal.email} />}
                {personal.location && <Item icon={<MapPin size={14} />} text={personal.location} />}
            </div>

            {/* SUMMARY */}
            {personal.summary && (
                <Section title="PROFESSIONAL SUMMARY" color={color}>
                    <p style={{ fontSize: "13px" }}>{personal.summary}</p>
                </Section>
            )}

            {/* EXPERIENCE */}
            {experiences.length > 0 && (
                <Section title="WORK EXPERIENCE" color={color}>
                    {experiences.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "8px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                                <span>{exp.title}</span>
                                <span style={{ fontSize: "12px", opacity: 0.7 }}>
                                    {exp.from} - {exp.to || "Present"}
                                </span>
                            </div>
                            <p style={{ fontSize: "13px", fontWeight: 500 }}>{exp.company}</p>
                            {exp.description && (
                                <div
                                    style={{ fontSize: "12px", opacity: 0.95, marginTop: "4px" }}
                                    dangerouslySetInnerHTML={{
                                        __html: exp.description
                                            .split("\n")
                                            .map(line => line.replace(/^-/, "•"))
                                            .join("<br>")
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
                <Section title="PROJECTS" color={color}>
                    {projects.map((proj, i) => (
                        <div key={i} style={{ marginBottom: "10px" }}>
                            <b style={{ fontSize: "13px" }}>{proj.name}</b>
                            <div
                                style={{ fontSize: "12px", opacity: 0.95 }}
                                dangerouslySetInnerHTML={{
                                    __html: proj.description
                                        ?.split("\n")
                                        .map(line => line.replace(/^-/, "•"))
                                        .join("<br>")
                                }}
                            />
                            {proj.technologies && (
                                <p style={{ fontSize: "11.5px", fontStyle: "italic", marginTop: "3px" }}>
                                    Tech: {proj.technologies}
                                </p>
                            )}
                            {proj.link && (
                                <p style={{ fontSize: "11.5px", color }}>
                                    {proj.link}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
                <Section title="EDUCATION" color={color}>
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "10px" }}>
                            <b style={{ fontSize: "13px" }}>{edu.degree}</b>
                            <p style={{ fontSize: "12.5px" }}>{edu.institution}</p>
                            <p style={{ fontSize: "11.5px", opacity: 0.8 }}>
                                {edu.from} - {edu.to || "Present"}
                            </p>
                        </div>
                    ))}
                </Section>
            )}

            {/* SKILLS + CERTIFICATION ROW */}
            <div style={{ display: "flex", gap: "30px" }}>
                {skills.length > 0 && (
                    <Section title="SKILLS" color={color} noMargin>
                        <ul style={{ fontSize: "12.5px", listStyle: "disc", paddingLeft: "18px" }}>
                            {skills.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </Section>
                )}

                {personal.hobbies?.length > 0 && (
                    <Section title="Hobbies" color={color} noMargin>
                        <ul style={{ fontSize: "12.5px", listStyle: "disc", paddingLeft: "18px" }}>
                            {personal.hobbies.map((hobby, i) => <li key={i}>{hobby.name || hobby}</li>)}
                        </ul>
                    </Section>
                )}

                {certifications.length > 0 && (
                    <Section title="CERTIFICATIONS" color={color} noMargin>
                        <ul style={{ fontSize: "12.5px", listStyle: "disc", paddingLeft: "18px" }}>
                            {certifications.map((c, i) => (
                                <li key={i}>
                                    {c.name} {c.date && `(${c.date})`}
                                </li>
                            ))}
                        </ul>
                    </Section>
                )}


            </div>
        </div>
    );
}

// Helpers
function Item({ icon, text }) {
    return <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>{icon}{text}</div>;
}

function Section({ title, color, children, noMargin }) {
    return (
        <div style={{ marginBottom: noMargin ? "0px" : "8px" }}>
            <h3 style={{
                fontWeight: "700",
                fontSize: "13.5px",
                marginBottom: "6px",
                borderBottom: `2px solid ${color}`,
                paddingBottom: "2px"
            }}>
                {title}
            </h3>
            {children}
        </div>
    );
}
