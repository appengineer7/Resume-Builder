// src/components/templates/ContemporaryResume.jsx
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ContemporaryResume({
  data,
  color = "#10B981", // Fresh green accent for modern look
  font = "Nunito",
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
      className="mx-auto shadow-2xl rounded-2xl overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${font}, sans-serif`,
        background: "#F3F4F6",
      }}
    >
      {/* HEADER - Modern Stylish Header */}
      <header
        className="px-8 py-6 text-white"
        style={{
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 className="text-3xl font-extrabold whitespace-nowrap">{personal.fullName || "Your Name"}</h1>
          <p className="text-sm opacity-90">{personal.title || "Professional Title"}</p>
        </div>
        {personal.profileImage && (
          <div
            className="rounded-full overflow-hidden border-4"
            style={{ width: "90px", height: "90px", borderColor: "#FFF" }}
          >
            <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* BODY - Contemporary layout */}
      <div className="grid grid-cols-3 gap-6 p-6 flex-1">
        {/* LEFT COLUMN */}
        <aside className="col-span-1 space-y-5">
          {/* Contact Info */}
          <Card title="Contact Info" color={color}>
            {personal.phone && <Item icon={<Phone size={14} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={14} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={14} />} text={personal.location} />}
          </Card>

          {/* Skills - Modern Pill Style */}
          {skills.length > 0 && (
            <Card title="Skills" color={color}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                      border: `1px solid ${color}`,
                    }}
                  >
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Hobbbies - Modern Pill Style */}
          {personal.hobbies?.length > 0 && (
            <Card title="Hobbies" color={color}>
              <div className="flex flex-wrap gap-2">
                {personal.hobbies.map((hobby, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                      border: `1px solid ${color}`,
                    }}
                  >
                    {hobby.name || hobby}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Card title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <p key={i} className="text-xs font-medium">
                  {cert.name}{" "}
                  {cert.date && <span className="text-gray-500">({cert.date})</span>}
                </p>
              ))}
            </Card>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className="col-span-2 space-y-6 overflow-y-auto">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="About Me" color={color}>
              <p className="text-sm leading-relaxed text-gray-700">{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" color={color}>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl shadow-sm border-l-4 mb-3"
                  style={{ borderColor: color }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                    <span className="text-xs text-gray-500">
                      {exp.from} - {exp.to || "Present"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{exp.company}</p>
                  {exp.description && (
                    <p className="text-xs mt-1 text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl shadow-sm border-l-4 mb-3"
                  style={{ borderColor: color }}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">{edu.degree}</span>
                    <span className="text-xs text-gray-500">
                      {edu.from} - {edu.to}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" color={color}>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl shadow-sm border-l-4 mb-3"
                  style={{ borderColor: color }}
                >
                  <p className="font-semibold text-sm">{proj.name}</p>
                  {proj.description && <p className="text-xs text-gray-700">{proj.description}</p>}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 text-xs underline"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

/* Reusable Components */
function Section({ title, color, icon, children }) {
  return (
    <div>
      <h3
        className="text-lg font-bold flex items-center gap-2 mb-2 tracking-wide"
        style={{ color }}
      >
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function Card({ title, color, children }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h4 className="font-bold text-sm uppercase mb-2" style={{ color }}>
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({ icon, text }) {
  return (
    <p className="flex items-center gap-2 text-xs text-gray-700">
      {icon} {text}
    </p>
  );
}
