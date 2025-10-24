// src/components/templates/BoldResume.jsx
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function BoldResume({
  data,
  color = "#DC2626", // Main dynamic color
  font = "Poppins",
}) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [] } = data;

  return (
    <div
      className="mx-auto shadow-lg rounded-lg overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${font}, sans-serif`,
        background: "#FFFFFF",
      }}
    >
      {/* HEADER */}
      <header
        className="p-6 text-white text-center"
        style={{ backgroundColor: color }}
      >
        <h1 className="text-2xl font-bold tracking-wide">{personal.fullName || "Your Name"}</h1>
        <p className="text-sm opacity-90">{personal.title || "Job Title"}</p>
      </header>

      {/* BODY */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4">
        {/* LEFT COLUMN */}
        <aside className="col-span-1 flex flex-col gap-4">
          {/* Profile Image */}
          <div className="text-center">
            <div
              className="rounded-lg overflow-hidden mx-auto shadow-sm flex items-center justify-center bg-white"
              style={{ width: "114px", height: "114px", border: `2px solid ${color}`,boxSizing: "border-box"}}
            >
              {personal.profileImage ? (
                <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Photo</div>
              )}
            </div>
          </div>

          {/* Contact */}
          <Card title="Contact" color={color}>
            {personal.phone && <Item icon={<Phone size={12} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={12} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={12} />} text={personal.location} />}
          </Card>

          {/* Skills */}
          {skills.length > 0 && (
            <Card title="Skills" color={color}>
              {skills.map((skill, i) => (
                <div key={i} className="mb-1">
                  <p className="text-xs font-semibold">{skill.name || skill}</p>
                  <div className="w-full h-1 bg-gray-200 rounded">
                    <div
                      className="h-1 rounded"
                      style={{ width: skill.level ? `${skill.level}%` : "70%", backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </Card>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Card title="Hobbies" color={color}>
              {personal.hobbies.map((hobby, i) => (
                <div key={i} className="mb-1">
                  <p className="text-xs font-semibold">{hobby.name || hobby}</p>
                  <div className="w-full h-1 bg-gray-200 rounded">
                    <div className="h-1 rounded" style={{ width: "100%", backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </Card>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Card title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <div key={i} className="mb-1">
                  <p className="text-xs font-semibold">
                    {cert.name} {cert.date && `(${cert.date})`}
                  </p>
                  <div className="w-full h-1 bg-gray-200 rounded">
                    <div className="h-1 rounded" style={{ width: "100%", backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </Card>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className="col-span-2 space-y-4 overflow-y-auto">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="Profile" color={color}>
              <p className="text-xs leading-relaxed">{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-2 pl-2 border-l-4" style={{ borderColor: color }}>
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-gray-900 text-sm">{exp.title}</h4>
                    <span className="text-xs text-gray-500">{exp.from} - {exp.to || "Present"}</span>
                  </div>
                  <p className="text-xs font-medium">{exp.company}</p>
                  {exp.description && 
                  <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: exp.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((edu, i) => (
                <div key={i} className="mb-2 pl-2 border-l-4" style={{ borderColor: color }}>
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">{edu.degree}</span>
                    <span className="text-xs text-gray-500">{edu.from} - {edu.to}</span>
                  </div>
                  <p className="text-xs">{edu.institution}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-2 pl-2 border-l-4" style={{ borderColor: color }}>
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
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">
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
    <div className="mb-3">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-1" style={{ color }}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function Card({ title, color, children }) {
  return (
    <div className="p-3 rounded-md shadow-sm bg-gray-50">
      <h4 className="font-bold text-xs uppercase mb-1" style={{ color }}>{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Item({ icon, text }) {
  return (
    <p className="flex items-center gap-1 text-xs">
      {icon} {text}
    </p>
  );
}
