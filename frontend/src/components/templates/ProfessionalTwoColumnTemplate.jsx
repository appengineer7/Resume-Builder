// src/components/templates/ProfessionalTwoColumnTemplate.jsx
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ProfessionalTwoColumnTemplate({ data, color = "#1E3A8A", font = "Arial" }) {
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
      className="bg-white mx-auto rounded-lg shadow-lg overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "0",
        fontFamily: `${font}, sans-serif`,
        fontSize: "14px",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        className="w-1/3 flex flex-col"
        style={{ background: color, color: "#FFFFFF", padding: "20px" }}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div
            style={{
              height: "120px",
              width: "120px",
              background: "#D1D5DB",
              margin: "0 auto",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid white",
            }}
          >
            {personal.profileImage ? (
              <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Photo</div>
            )}
          </div>
          <h2 className="text-2xl font-bold mt-3">{personal.fullName || "Full Name"}</h2>
          <p className="text-sm opacity-80">{personal.title || "Job Title"}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-6 space-y-2 text-sm">
          <h3 className="font-semibold text-white border-b border-white/20 pb-1 mb-2">
            Contact
          </h3>
          {personal.email && (
            <p className="flex items-center gap-2">
              <Mail size={14} /> {personal.email}
            </p>
          )}
          {personal.phone && (
            <p className="flex items-center gap-2">
              <Phone size={14} /> {personal.phone}
            </p>
          )}
          {personal.location && (
            <p className="flex items-center gap-2">
              <MapPin size={14} /> {personal.location}
            </p>
          )}
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-white border-b border-white/20 pb-1 mb-2">
              Education
            </h3>
            {education.map((edu, i) => (
              <p key={i} className="text-sm mb-2">
                <span className="font-semibold">{edu.degree}</span> <br />
                {edu.institution} <br />
                <span className="text-xs italic">
                  {edu.from} - {edu.to || "Present"}
                </span>
              </p>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-white border-b border-white/20 pb-1 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1">
              <ul className="list-disc pl-4">
              {skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
        <div>
          <h3 className="font-semibold text-white border-b border-white/20 pb-1 mb-2">
            Certifications
          </h3>
          <ul className="list-disc pl-4">
            {certifications.map((cert, i) => (
              <li key={i} className="text-sm mb-1">
                {cert.name} {cert.date && `(${cert.date})`}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

      {/* Main Column */}
      <div className="w-2/3 p-3 overflow-y-auto space-y-2">
        {/* Summary */}
        {personal.summary && (
          <Section title="Profile" color={color}>
            <p>{personal.summary}</p>
          </Section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <Section title="Work Experience" color={color}>
            {experiences.map((exp, i) => (
              <div key={i} className="mb-3 pl-2 border-l-4" style={{ borderColor: color }}>
                <div className="flex justify-between">
                  <span className="font-semibold">{exp.title || "Job Title"}</span>
                  <span className="text-xs italic">{exp.from} – {exp.to || "Present"}</span>
                </div>
                <p className="text-sm">{exp.company}</p>
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

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Projects" color={color}>
            {projects.map((proj, i) => (
              <div key={i} className="mb-3 pl-2 border-l-4" style={{ borderColor: color }}>
                <p className="font-semibold">{proj.name}</p>
                {proj.description && <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />}
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

        {/* Hobbies */}
        {personal.hobbies?.length > 0 && (
          <Section title="Hobbies" color={color}>
            <p>{personal.hobbies.map(h => h.name || h).join(", ")}</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, icon, children }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg flex items-center gap-2 mb-2" style={{ color }}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}