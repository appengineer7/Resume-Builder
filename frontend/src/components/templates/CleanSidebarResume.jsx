import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Linkedin,
  Globe,
  Folder,
} from "lucide-react";

export default function CleanSidebarResume({
  data,
  color = "#0F172A", // Deep, professional sidebar color
  font = "Roboto",
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
      className="mx-auto rounded-lg shadow-lg flex"
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: `${font}, sans-serif`,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <aside
        className="flex flex-col justify-between text-white p-6"
        style={{ backgroundColor: color, width: "260px" }}
      >
        {/* Profile Image & Info */}
        <div>
          <div className="flex flex-col items-center mb-6">
            <div
              className="rounded-full overflow-hidden border-2 border-white"
              style={{ width: "110px", height: "110px" }}
            >
              {personal.profileImage ? (
                <img
                  src={personal.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 text-xs bg-gray-700">
                  No Photo
                </div>
              )}
            </div>
            <h1 className="text-xl font-bold mt-4">{personal.fullName || "Your Name"}</h1>
            <p className="text-sm opacity-80">{personal.title || "Job Title"}</p>
          </div>

          {/* Contact */}
          <SidebarSection title="Contact" color={color}>
            {personal.phone && <Item icon={<Phone size={12} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={12} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={12} />} text={personal.location} />}
          </SidebarSection>

          {/* Skills */}
          {skills.length > 0 && (
            <SidebarSection title="Skills" color={color}>
              {skills.map((skill, i) => (
                <p key={i} className="text-xs mb-2 border-b border-gray-600 pb-1">
                  {skill.name || skill}
                </p>
              ))}
            </SidebarSection>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <SidebarSection title="Hobbies" color={color}>
              {personal.hobbies.map((hobby, i) => (
                <p key={i} className="text-xs mb-2">
                  {hobby.name || hobby}
                </p>
              ))}
            </SidebarSection>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SidebarSection title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <p key={i} className="text-xs mb-1">
                  {cert.name} {cert.date && `(${cert.date})`}
                </p>
              ))}
            </SidebarSection>
          )}
        </div>
      </aside>

      {/* MAIN SECTION */}
      <main className="flex-1 p-3 overflow-y-auto">
        {/* Profile Summary */}
        {personal.summary && (
          <Section title="Profile" color={color}>
            <p className="text-sm text-gray-700 leading-relaxed p-2">
              {personal.summary}
            </p>
          </Section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <Section title="Experience" color={color}>
            {experiences.map((exp, i) => (
              <div key={i} className="p-2">
                <div className="flex justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {exp.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {exp.from} - {exp.to || "Present"}
                  </span>
                </div>
                <p className="text-xs text-gray-700 font-medium">{exp.company}</p>
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
              <div key={i} className="p-2">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-900">
                    {edu.degree}
                  </span>
                  <span className="text-xs text-gray-500">
                    {edu.from} - {edu.to}
                  </span>
                </div>
                <p className="text-xs text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Projects" color={color}>
            {projects.map((proj, i) => (
              <div key={i} className="p-2">
                <p className="text-sm font-semibold text-gray-900">{proj.name}</p>
                {proj.description && (
                  <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium hover:underline"
                    style={{ color }}
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
  );
}

/* ============ COMPONENTS ============ */

function SidebarSection({ title, color, children }) {
  return (
    <div className="mb-4">
      <h3
        className="text-xs font-bold uppercase tracking-wide mb-2 border-b pb-1"
        style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
      >
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Section({ title, children, color }) {
  return (
    <div className="mb-3">
      <h3
        className="text-sm font-bold flex items-center gap-2 mb-2 border-b pb-1 px-2"
        style={{ borderColor: color, color }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Item({ icon, text }) {
  return (
    <p className="flex items-center gap-2 text-xs text-gray-100">
      {icon} {text}
    </p>
  );
}
