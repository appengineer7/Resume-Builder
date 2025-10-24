// src/components/templates/CreativeTemplate.jsx
import React from "react";


export default function CreativeTemplate({ data, color = "#2563eb", font = "Inter" }) {
  const {
    personal,
    experiences = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data;

  return (
    <div
      className="rounded-lg shadow-lg flex flex-col mx-auto "
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: `${font}, Arial, sans-serif`,
        background: "#f9fafb",
        padding: "0px",
        boxSizing: "border-box",
        overflow: "hidden",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
       {/* Main Content */}
      <div className="flex-1 p-5 overflow-hidden space-y-3">
      {/* Header */}
      <div
        className="rounded-lg mb-4 text-white p-5"
        style={{ background: color }}
      >
        <h1
          className="font-extrabold"
          style={{
            fontSize: "24px", // ✅ slightly smaller header
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {personal.fullName || "Full Name"}
        </h1>
        <p className="italic" style={{ fontSize: "13px" }}>
          {personal.title}
        </p>
        <div className="mt-1 text-xs flex flex-wrap gap-2">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>· {personal.phone}</span>}
          {personal.location && <span>· {personal.location}</span>}
        </div>
      </div>

     
        {/* About Me */}
        {personal.summary && (
          <Section title="About Me" color={color}>
            <p className="text-gray-800 text-[12px]">
              {truncateText(personal.summary, 400)}
            </p>
          </Section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <Section title="Work Experience" color={color}>
            {experiences.slice(0, 3).map((exp) => (
              <ItemBlock key={exp.id} color={color}>
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-[13px]">{exp.title}</div>
                    <div className="text-gray-700 text-[12px]">{exp.company}</div>
                  </div>
                  <div className="italic text-[11px]">
                    {exp.from} - {exp.to || "Present"}
                  </div>
                </div>
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
              </ItemBlock>
            ))}
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="Education" color={color}>
            {education.slice(0, 3).map((edu, i) => (
              <ItemBlock key={i} color={color}>
                <div className="font-semibold text-[13px]">
                  {edu.degree} - {edu.institution}
                </div>
                <div className="italic text-[11px]">
                  {edu.from} - {edu.to || "Present"}{" "}
                  {edu.grade && `· Grade: ${edu.grade}`}
                </div>
              </ItemBlock>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Projects" color={color}>
            {projects.slice(0, 2).map((proj) => (
              <ItemBlock key={proj.id} color={color}>
                <div className="font-semibold text-[13px]">{proj.name}</div>
                <div
                    className="text-xs text-gray-700 mt-1 whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: proj.description
                        .split('\n')
                        .map(line => line.replace(/^-/, '●'))
                        .join('<br>')
                    }}
                  />
              </ItemBlock>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills" color={color}>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-[2px] rounded-full text-[11px] font-medium text-white"
                  style={{ background: color }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Section title="Certifications" color={color}>
            {certifications.slice(0, 3).map((cert) => (
              <ItemBlock key={cert.id} color={color}>
                <div className="font-semibold text-[13px]">{cert.name}</div>
                <div className="text-[12px]">{cert.issuer}</div>
                {cert.date && <div className="italic text-[11px]">{cert.date}</div>}
              </ItemBlock>
            ))}
          </Section>
        )}

        {/* Hobbies */}
        {personal.hobbies?.length > 0 && (
          <Section title="Hobbies" color={color}>
            <div className="flex flex-wrap gap-1">
              {personal.hobbies.map((hobby, i) => (
                <span
                  key={i}
                  className="px-2 py-[2px] rounded-full text-[11px] font-medium text-white"
                  style={{ background: color }}
                >
                  {hobby.name || hobby}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function Section({ title, color, icon, children }) {
  return (
    <div>
      <h3
        className="font-semibold mb-1 flex items-center gap-2"
        style={{ color, fontSize: "15px" }}
      >
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function ItemBlock({ children, color }) {
  return (
    <div
      className="mb-2 pl-2 border-l-4"
      style={{ borderColor: color }}
    >
      {children}
    </div>
  );
}

/* ---------- Helper Function to Clamp Long Text ---------- */
function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
