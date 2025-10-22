import React from "react";

export default function ClassicTemplate({ data, color = "#111827", font = "Inter" }) {
  const { personal, experiences, education, projects, skills, certifications } = data;

  return (
    <div
      className="bg-white shadow-lg mx-auto"
      style={{
        width: "210mm", // A4 width
        height: "297mm", // A4 height
        padding: "0px",
        fontFamily: `${font}, Arial, sans-serif`,
        fontSize: "14px", // ⬇ slightly smaller base font
        lineHeight: "1.45",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Header */}
      <div className="text-center mb-3">
        <h1
          className="font-bold"
          style={{ color, fontSize: "22px", marginBottom: "3px" }} // ⬇ smaller heading
        >
          {personal.fullName || "Full Name"}
        </h1>
        <p className="italic" style={{ color: shadeColor(color, 0.2), fontSize: "13px" }}>
          {personal.title || "Job Title"}
        </p>
        <p className="text-xs" style={{ color: "#374151", fontSize: "11.5px" }}>
          {personal.email} · {personal.phone} · {personal.location}
        </p>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflow: "hidden" }} className="p-5 overflow-y-auto space-y-5">
        {personal.summary && (
          <Section title="Summary" color={color}>
            <p style={{ fontSize: "12px" }}>{personal.summary}</p>
          </Section>
        )}

        {experiences?.length > 0 && (
          <Section title="Experience" color={color}>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-1.5">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold" style={{ fontSize: "13px" }}>{exp.title || "Job Title"}</div>
                    <div className="text-xs" style={{ fontSize: "11.5px" }}>{exp.company}</div>
                  </div>
                  <div className="text-xs italic" style={{ fontSize: "11.5px" }}>
                    {exp.from} - {exp.to || "Present"}
                  </div>
                </div>
                <div className="text-xs" style={{ fontSize: "11.5px" }}>{exp.description}</div>
              </div>
            ))}
          </Section>
        )}

        {education?.length > 0 && (
          <Section title="Education" color={color}>
            {education.map((edu) => (
              <div key={edu.id} className="mb-1.5">
                <div className="font-semibold" style={{ fontSize: "13px" }}>{edu.degree}</div>
                <div className="text-xs" style={{ fontSize: "11.5px" }}>{edu.institution}</div>
                <div className="text-xs italic" style={{ fontSize: "11.5px" }}>
                  {edu.from} — {edu.to || "Present"} {edu.grade && `· Grade: ${edu.grade}`}
                </div>
              </div>
            ))}
          </Section>
        )}

        {projects?.length > 0 && (
          <Section title="Projects" color={color}>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-1.5">
                <div className="font-semibold" style={{ fontSize: "13px" }}>{proj.name}</div>
                <div className="text-xs" style={{ fontSize: "11.5px" }}>{proj.description}</div>
                {proj.technologies && (
                  <div className="text-xs italic" style={{ fontSize: "11.5px" }}>
                    Technologies: {proj.technologies}
                  </div>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs"
                    style={{ fontSize: "11.5px" }}
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </Section>
        )}

        {skills?.length > 0 && (
          <Section title="Skills" color={color}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-gray-200 px-1.5 py-0.5 rounded text-xs whitespace-nowrap" style={{ fontSize: "11.5px" }}>
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {certifications?.length > 0 && (
          <Section title="Certifications" color={color}>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs mb-1.5" style={{ fontSize: "11.5px" }}>
                <div className="font-semibold" style={{ fontSize: "13px" }}>{cert.name}</div>
                <div>{cert.issuer}</div>
                {cert.date && <div className="italic">{cert.date}</div>}
              </div>
            ))}
          </Section>
        )}

        {personal.hobbies?.length > 0 && (
          <Section title="Hobbies" color={color}>
            <div className="flex flex-wrap gap-2">
              {personal.hobbies.map((hobby, i) => {
                const hobbyName = typeof hobby === "string" ? hobby : hobby.name;
                return (
                  <span key={i} className="bg-gray-200 px-1.5 py-0.5 rounded text-xs whitespace-nowrap" style={{ fontSize: "11.5px" }}>
                    {hobbyName}
                  </span>
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div className="mb-2">
      <h3
        className="font-semibold border-b border-cyan-400 pb-0.5 mb-0.5"
        style={{ color, fontSize: "14px"  }} // ⬇ smaller section title
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function shadeColor(hex, percent) {
  if (!hex) return hex;
  const f = hex.slice(1), t = percent < 0 ? 0 : 255, p = Math.abs(percent);
  const R = parseInt(f.substring(0, 2), 16),
    G = parseInt(f.substring(2, 4), 16),
    B = parseInt(f.substring(4, 6), 16);
  const newR = Math.round((t - R) * p) + R;
  const newG = Math.round((t - G) * p) + G;
  const newB = Math.round((t - B) * p) + B;
  return "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
}
