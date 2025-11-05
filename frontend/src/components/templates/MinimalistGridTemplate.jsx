import React from "react";

export default function MinimalistGridTemplate({ data, color = "#1e3a8a", font = "system-ui" }) {
  const { personal, experiences, education, projects, skills, certifications } = data;

  return (
    <div
      className="bg-white mx-auto"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "18px 16px",
        fontFamily: `${font}, -apple-system, BlinkMacSystemFont, sans-serif`,
        fontSize: "11px",
        lineHeight: "1.45",
        color: "#1f2937",
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gridTemplateRows: "auto 1fr",
        gap: "16px",
      }}
    >
      {/* Header: Full Width */}
      <header
        className="grid grid-cols-1 border-b pb-2"
        style={{ borderColor: color, gridColumn: "1 / -1" }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1
              className="font-black tracking-tight"
              style={{ color, fontSize: "26px", margin: 0, lineHeight: "1" }}
            >
              {personal.fullName || "Full Name"}
            </h1>
            <p
              className="font-semibold"
              style={{ color: shadeColor(color, 0.35), fontSize: "14px", margin: "3px 0 0" }}
            >
              {personal.title || "Professional Title"}
            </p>
          </div>
          <div className="text-right space-y-0.5 text-gray-600">
            {personal.email && (
              <div className="flex items-center justify-end gap-1.5">
                <Envelope />
                <span style={{ fontSize: "10.5px" }}>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center justify-end gap-1.5">
                <Phone />
                <span style={{ fontSize: "10.5px" }}>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center justify-end gap-1.5">
                <Location />
                <span style={{ fontSize: "10.5px" }}>{personal.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Left Column: Sidebar Info */}
      <aside className="space-y-4 pr-3 border-r" style={{ borderColor: "#e5e7eb" }}>
        {/* Skills */}
        {skills?.length > 0 && (
          <Section title="Skills">
            <div className="space-y-1">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                  style={{ fontSize: "10.5px" }}
                >
                  <Dot />
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="font-bold" style={{ fontSize: "11.5px" }}>
                  {edu.degree}
                </p>
                <p className="text-gray-600" style={{ fontSize: "10.5px" }}>
                  {edu.institution}
                </p>
                <p className="text-gray-500 italic" style={{ fontSize: "10px" }}>
                  {edu.from} – {edu.to || "Present"}
                  {edu.grade && ` · ${edu.grade}`}
                </p>
              </div>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <Section title="Certifications">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-1.5 mb-2">
                <Check />
                <div>
                  <p className="font-medium" style={{ fontSize: "10.5px" }}>
                    {cert.name}
                  </p>
                  <p className="text-gray-600" style={{ fontSize: "10px" }}>
                    {cert.issuer}
                    {cert.date && ` · ${cert.date}`}
                  </p>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* Hobbies */}
        {personal.hobbies?.length > 0 && (
          <Section title="Interests">
            <div className="flex flex-wrap gap-1.5">
              {personal.hobbies.map((hobby, i) => {
                const name = typeof hobby === "string" ? hobby : hobby.name;
                return (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium"
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </Section>
        )}
      </aside>

      {/* Right Column: Main Content */}
      <main className="space-y-4 pl-3">
        {/* Summary */}
        {personal.summary && (
          <Section title="Summary">
            <p className="text-gray-700 leading-snug">{personal.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <Section title="Experience">
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold" style={{ fontSize: "12px" }}>
                      {exp.title}
                    </h4>
                    <p className="text-gray-600" style={{ fontSize: "11px" }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-500 italic" style={{ fontSize: "10.5px" }}>
                    {exp.from} – {exp.to || "Present"}
                  </span>
                </div>
                <ul className="mt-1.5 ml-4 list-none space-y-0.5">
                  {exp.description
                    .split("\n")
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li
                        key={i}
                        className="relative pl-3 text-gray-700"
                        style={{ fontSize: "10.8px" }}
                      >
                        <Arrow />
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
          <Section title="Projects">
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold" style={{ fontSize: "12px" }}>
                    {proj.name}
                  </h4>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      style={{ fontSize: "10px" }}
                    >
                      <LinkIcon />
                      Live
                    </a>
                  )}
                </div>
                <ul className="mt-1 ml-4 list-none space-y-0.5">
                  {proj.description
                    .split("\n")
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li
                        key={i}
                        className="relative pl-3 text-gray-700"
                        style={{ fontSize: "10.8px" }}
                      >
                        <Arrow />
                        {line.replace(/^- ?/, "")}
                      </li>
                    ))}
                </ul>
                {proj.technologies && (
                  <p className="text-gray-600 italic mt-1" style={{ fontSize: "10.5px" }}>
                    Stack: {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}

// Section Title
function Section({ title, children }) {
  return (
    <section>
      <h3
        className="font-black uppercase tracking-widest mb-1.5 text-xs"
        style={{ color: "#1e3a8a", letterSpacing: "1.8px" }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

// Tiny SVG Icons
const Envelope = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Phone = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Location = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Dot = () => (
  <svg className="w-1.5 h-1.5 text-gray-500" fill="currentColor" viewBox="0 0 6 6">
    <circle cx="3" cy="3" r="3" />
  </svg>
);

const Check = () => (
  <svg className="w-3 h-3 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const Arrow = () => (
  <svg className="w-3 h-3 absolute left-0 top-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

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