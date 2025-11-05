import React from "react";

export default function ModernTemplateNormal({ data, color = "#111827", font = "Inter" }) {
  const { personal, experiences, education, projects, skills, certifications } = data;

  return (
    <div
      className="bg-white shadow-lg mx-auto"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "0px",
        fontFamily: `${font}, Arial, sans-serif`,
        fontSize: "12px",
        lineHeight: "1.5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: color }}>
        <h1 className="font-bold" style={{ color, fontSize: "24px" }}>
          {personal.fullName || "Full Name"}
        </h1>
        <p style={{ color: shadeColor(color, 0.2), fontSize: "16px" }}>
          {personal.title || "Job Title"}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-700" style={{ fontSize: "12px" }}>
          {personal.email && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{personal.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left Sidebar */}
        <div
          className="w-1/3 p-4 overflow-y-auto"
          style={{ backgroundColor: "#f9fafb" }}
        >

           {/* Education */}
          {education?.length > 0 && (
            <Section title="Education" color={color}>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-semibold" style={{ fontSize: "13px" }}>
                    {edu.degree}
                  </p>
                  <p className="text-gray-700" style={{ fontSize: "12px" }}>
                    {edu.institution}
                  </p>
                  <p className="italic text-gray-600" style={{ fontSize: "11.5px" }}>
                    {edu.from} — {edu.to || "Present"}
                  </p>
                  {edu.grade && (
                    <p className="text-gray-700" style={{ fontSize: "11.5px" }}>
                      Grade: {edu.grade}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <Section title="Certifications" color={color}>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <p className="font-semibold" style={{ fontSize: "13px" }}>
                    {cert.name}
                  </p>
                  <p className="text-gray-700">{cert.issuer}</p>
                  {cert.date && (
                    <p className="italic text-gray-600">{cert.date}</p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <Section title="Skills" color={color}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-white px-2 py-1 rounded shadow text-sm whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Section title="Hobbies" color={color}>
              <div className="flex flex-wrap gap-2">
                {personal.hobbies.map((hobby, i) => {
                  const hobbyName =
                    typeof hobby === "string" ? hobby : hobby.name;
                  return (
                    <span
                      key={i}
                      className="bg-white px-2 py-1 rounded shadow text-sm whitespace-nowrap"
                    >
                      {hobbyName}
                    </span>
                  );
                })}
              </div>
            </Section>
          )}
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-4 overflow-y-auto space-y-4">
          {/* Summary */}
          {personal.summary && (
            <Section title="Professional Summary" color={color}>
              <p className="text-gray-700">{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences?.length > 0 && (
            <Section title="Professional Experience" color={color}>
              {experiences.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="font-semibold" style={{ fontSize: "13px" }}>
                        {exp.title || "Job Title"}
                      </p>
                      <p className="text-gray-600" style={{ fontSize: "12px" }}>
                        {exp.company}
                      </p>
                    </div>
                    <p
                      className="italic text-gray-600"
                      style={{ fontSize: "12px" }}
                    >
                      {exp.from} - {exp.to || "Present"}
                    </p>
                  </div>
                  <ul className="list-disc pl-5 mt-1 text-gray-700">
                    {exp.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, i) => (
                        <li key={i} style={{ fontSize: "12px" }}>
                          {line.replace(/^- ?/, "")}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <Section title="Projects" color={color}>
              {projects.map((proj) => (
                <div key={proj.id} className="mb-4">
                  <p className="font-semibold" style={{ fontSize: "13px" }}>
                    {proj.name}
                  </p>
                  <ul className="list-disc pl-5 mt-1 text-gray-700">
                    {proj.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, i) => (
                        <li key={i} style={{ fontSize: "12px" }}>
                          {line.replace(/^- ?/, "")}
                        </li>
                      ))}
                  </ul>
                  {proj.technologies && (
                    <p
                      className="italic text-gray-600 mt-1"
                      style={{ fontSize: "12px" }}
                    >
                      Technologies: {proj.technologies}
                    </p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 flex items-center gap-1"
                      style={{ fontSize: "12px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div className="mb-4">
      <h3
        className="font-bold mb-2 pb-1 border-b"
        style={{ fontSize: "15px", color, borderColor: shadeColor(color, 0.8) }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function shadeColor(hex, percent) {
  if (!hex) return hex;
  const f = hex.slice(1),
    t = percent < 0 ? 0 : 255,
    p = Math.abs(percent);
  const R = parseInt(f.substring(0, 2), 16),
    G = parseInt(f.substring(2, 4), 16),
    B = parseInt(f.substring(4, 6), 16);
  const newR = Math.round((t - R) * p) + R;
  const newG = Math.round((t - G) * p) + G;
  const newB = Math.round((t - B) * p) + B;
  return "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
}