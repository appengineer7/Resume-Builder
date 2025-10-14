// src/components/templates/ProfessionalPolishedResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Folder, User } from "lucide-react";

export default function ProfessionalPolishedResume({
    data,
    sidebarColor = "#1A202C",
    accentColor = "#FFC107",
    font = "Arial",
}) {
    const {
        personal = {},
        summary = "",
        experiences = [],
        education = [],
        skills = [],
        projects = [],
        certifications = [],
    } = data;

    return (
        <div
            className="bg-white mx-auto rounded-lg shadow-lg overflow-hidden"
            style={{
                width: "210mm",
                height: "297mm",
                display: "flex",
                fontFamily: `${font}, sans-serif`,
                fontSize: "13px",
                color: "#333",
            }}
        >
            {/* Sidebar */}
            <div
                className="w-1/3 p-6 flex flex-col justify-start"
                style={{ backgroundColor: sidebarColor, color: "#fff" }}
            >
                {/* Profile */}
                <div className="text-center mb-6">
                    <div
                        style={{
                            width: "150px",
                            height: "150px",
                            margin: "0 auto",
                            borderRadius: "5%",
                            overflow: "hidden",
                            border: `3px solid ${accentColor}`,
                        }}
                    >
                        {personal.profileImage ? (
                            <img
                                src={personal.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Photo
                            </div>
                        )}
                    </div>
                    <h2 className="text-xl font-bold mt-3">{personal.fullName || "Full Name"}</h2>
                    <p className="text-sm opacity-80">{personal.title || "Job Title"}</p>
                </div>

                {/* Contact */}
                <div className="mb-6 space-y-2 text-sm">
                    <h3 className="font-semibold border-b border-gray-400 pb-1 mb-2">CONTACT</h3>
                    {personal.phone && (
                        <p className="flex items-center gap-2">
                            <Phone size={14} /> {personal.phone}
                        </p>
                    )}
                    {personal.email && (
                        <p className="flex items-center gap-2">
                            <Mail size={14} /> {personal.email}
                        </p>
                    )}
                    {personal.location && (
                        <p className="flex items-center gap-2">
                            <MapPin size={14} /> {personal.location}
                        </p>
                    )}
                    {personal.website && (
                        <p className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-200 rounded-full"></span> {personal.website}
                        </p>
                    )}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold border-b border-gray-400 pb-1 mb-2">SKILLS</h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skill, i) => (
                                <div key={i}>
                                    <span className="text-xs">{skill.name || skill}</span>
                                    <div className="w-full h-1 bg-gray-400 rounded mt-1">
                                        <div
                                            className="h-1 rounded"
                                            style={{
                                                width: skill.level ? `${skill.level}%` : "70%",
                                                backgroundColor: accentColor,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hobbies */}
                {personal.hobbies?.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold border-b border-gray-400 pb-1 mb-2 flex items-center gap-2">
                            HOBBIES
                        </h3>
                        <p className="text-xs">{personal.hobbies.map(h => h.name || h).join(", ")}</p>
                    </div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold border-b border-gray-400 pb-1 mb-2">CERTIFICATIONS</h3>
                        <ul className="list-disc pl-4 text-xs">
                            {certifications.map((cert, i) => (
                                <li key={i}>
                                    {cert.name} {cert.date && `(${cert.date})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {/* Main Column */}
            <div className="w-2/3 p-6 space-y-6 overflow-y-auto">
                {/* Profile Summary */}
                {personal.summary && personal.summary.trim() !== "" && (
                    <Section title="PROFILE" color={accentColor}>
                        <div style={{ fontSize: "13px", lineHeight: "1.5", color: "#333", marginTop: "4px" }}>
                            {personal.summary.split("\n").map((line, idx) => (
                                <p key={idx} style={{ margin: "2px 0" }}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    </Section>
                )}
                {/* Work Experience */}
                {experiences.length > 0 && (
                    <Section title="EXPERIENCE" color={accentColor}>
                        {experiences.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between">
                                    <span className="font-semibold">{exp.title || "Job Title"}</span>
                                    <span className="text-xs italic">{exp.from} - {exp.to || "Present"}</span>
                                </div>
                                <p className="text-sm">{exp.company}</p>
                                {exp.description && <p className="text-xs mt-1">{exp.description}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <Section title="EDUCATION" color={accentColor}>
                        {education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between">
                                    <span className="font-semibold">{edu.degree}</span>
                                    <span className="text-xs italic">{edu.from} - {edu.to || "Present"}</span>
                                </div>
                                <p className="text-sm">{edu.institution}</p>
                            </div>
                        ))}
                    </Section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <Section title="PROJECTS" color={accentColor}>
                        {projects.map((proj, i) => (
                            <div key={i} className="mb-3 pl-2 border-l-2" style={{ borderColor: accentColor }}>
                                <p className="font-semibold">{proj.name}</p>
                                {proj.description && <p className="text-sm">{proj.description}</p>}
                                {proj.technologies && <p className="text-xs italic">Tech: {proj.technologies}</p>}
                                {proj.link && (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-xs"
                                    >
                                        {proj.link}
                                    </a>
                                )}
                            </div>
                        ))}
                    </Section>
                )}
            </div>
        </div>
    );
}

// Reusable Section Component
function Section({ title, color, icon, children }) {
    return (
        <div className="mb-6">
            <h3
                className="flex items-center gap-2 mb-2"
                style={{
                    color,
                    fontWeight: "bold",
                    fontSize: "15px",
                    borderBottom: `2px solid ${color}`,
                    paddingBottom: "2px",
                }}
            >
                {icon} {title}
            </h3>
            {children}
        </div>
    );
}
