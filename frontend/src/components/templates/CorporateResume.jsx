// src/components/templates/CorporateResume.jsx
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function CorporateResume({
  data,
  color = "#1E3A8A", // Corporate Blue
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
      className="mx-auto shadow-xl border border-gray-200 rounded-2xl overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${font}, sans-serif`,
        background: "#F9FAFB",
      }}
    >
      {/* HEADER - Corporate Banner */}
      <header
        className="px-6 py-4 flex flex-col items-center text-center"
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: `4px solid ${color}`,
        }}
      >
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
          {personal.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-gray-600">
          {personal.title || "Professional Title"}
        </p>
      </header>

      {/* BODY - Two Column Layout */}
      <div className="grid grid-cols-3 gap-6 p-6 flex-1">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-1 space-y-5">
          {/* Profile Image */}
          <div className="text-center">
            <div
              className="rounded-full overflow-hidden mx-auto shadow-md"
              style={{
                width: "140px",
                height: "140px",
                border: `4px solid ${color}`,
              }}
            >
              {personal.profileImage ? (
                <img
                  src={personal.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                  No Photo
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <SideCard title="Contact" color={color}>
            {personal.phone && <ContactItem icon={<Phone size={14} />} text={personal.phone} />}
            {personal.email && <ContactItem icon={<Mail size={14} />} text={personal.email} />}
            {personal.location && <ContactItem icon={<MapPin size={14} />} text={personal.location} />}
          </SideCard>

          {/* Skills Section */}
          {skills.length > 0 && (
            <SideCard title="Skills" color={color}>
              <ul className="list-disc ml-4 text-xs space-y-1">
                {skills.map((skill, i) => (
                  <li key={i}>{skill.name || skill}</li>
                ))}
              </ul>
            </SideCard>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SideCard title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <p key={i} className="text-xs">
                  <span className="font-semibold">{cert.name}</span>{" "}
                  {cert.date && <span className="text-gray-500">({cert.date})</span>}
                </p>
              ))}
            </SideCard>
          )}

          {/* Certifications */}
          {personal.hobbies?.length > 0 && (
            <SideCard title="Hobbies" color={color}>
              {personal.hobbies.map((hobby, i) => (
                <p key={i} className="text-xs">
                  <span className="font-semibold">{hobby.name || hobby}</span>{" "}
                </p>
              ))}
            </SideCard>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-2 space-y-6 overflow-y-auto">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="Professional Summary" color={color}>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personal.summary}
              </p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Work Experience" color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                    <span className="text-xs text-gray-500">
                      {exp.from} - {exp.to || "Present"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{exp.company}</p>
                  {exp.description && (
                    <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: exp.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
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
            <Section title="Key Projects" color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold text-sm">{proj.name}</p>
                  {proj.description && 
                  <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 text-xs underline"
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
      <h3 className="text-base font-bold flex items-center gap-2 mb-2" style={{ color }}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function SideCard({ title, color, children }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h4 className="font-bold text-sm uppercase mb-2" style={{ color }}>
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <p className="flex items-center gap-2 text-xs text-gray-700">
      {icon} {text}
    </p>
  );
}
