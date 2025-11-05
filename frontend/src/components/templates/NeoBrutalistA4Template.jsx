// NeoBrutalistA4Template.jsx
import React from "react";

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

/* ------------------- Reusable Components ------------------- */
const Card = ({ title, color, children }) => (
  <div className="p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <h3 className="font-black text-xs tracking-widest mb-1.5" style={{ color, letterSpacing: "1.5px" }}>
      {title}
    </h3>
    {children}
  </div>
);

const Section = ({ title, color, children }) => (
  <div className="mb-3">
    <h3 className="font-black text-xs tracking-widest mb-2 pb-0.5 border-b-2 inline-block" style={{ borderColor: color }}>
      {title}
    </h3>
    {children}
  </div>
);

const TimelineBlock = ({ title, company, period, points, isFirst }) => (
  <div className={`relative pl-5 pb-3 ${!isFirst ? "border-l-4" : ""}`} style={{ borderColor: "#dc2626" }}>
    {!isFirst && (
      <div
        className="absolute left-0 top-0 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: "#dc2626" }}
      />
    )}
    <div className="bg-white p-2.5 border-2 border-black">
      <div className="flex justify-between items-start mb-0.5">
        <div>
          <p className="font-bold text-xs leading-tight">{title}</p>
          <p className="text-xs font-medium text-gray-700">{company}</p>
        </div>
        <span className="text-xs bg-black text-white px-1.5 py-0.5 font-mono">{period}</span>
      </div>
      <ul className="text-xs space-y-0.5 mt-1">
        {points.slice(0, 4).map((p, i) => (
          <li key={i} className="flex items-start gap-1">
            <span className="text-red-600 font-bold">›</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ------------------- Inline SVG Icons ------------------- */
const EmailIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
);
const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
);
const LocationIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
);

/* ------------------- Main Template ------------------- */
export default function NeoBrutalistA4Template({ data, color = "#dc2626", font = "system-ui" }) {
  const { personal, experiences, education, projects, skills, certifications } = data;

  return (
    <div
      className="bg-white mx-auto"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "10mm",
        fontFamily: `${font}, -apple-system, BlinkMacSystemFont, sans-serif`,
        fontSize: "10.8px",
        lineHeight: "1.38",
        color: "#0f172a",
        background: "repeating-linear-gradient(45deg, #f9fafb, #f9fafb 8px, #f1f5f9 8px, #f1f5f9 16px)",
      }}
    >
      {/* Border Frame */}
      <div className="h-full p-4 border-4" style={{ borderColor: color, backgroundColor: "white" }}>
        
        {/* Header */}
        <header className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-black tracking-tighter" style={{ fontSize: "28px", color, margin: 0, lineHeight: "1", textTransform: "uppercase" }}>
                {personal.fullName || "NAME"}
              </h1>
              <p className="font-bold" style={{ fontSize: "14px", color: "#1e293b", margin: "2px 0 0" }}>
                {personal.title || "ROLE"}
              </p>
            </div>
            <div className="text-right space-y-0.5">
              {personal.email && (
                <div className="flex items-center justify-end gap-1.5">
                  <EmailIcon />
                  <span className="font-mono text-xs">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center justify-end gap-1.5">
                  <PhoneIcon />
                  <span className="font-mono text-xs">{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center justify-end gap-1.5">
                  <LocationIcon />
                  <span className="font-mono text-xs">{personal.location}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Grid: 1/3 + 2/3 */}
        <div className="grid grid-cols-3 gap-3" style={{ height: "calc(100% - 78px)" }}>
          
          {/* LEFT: Cards */}
          <div className="space-y-2 overflow-y-auto pr-1">
            {personal.summary && (
              <Card title="PROFILE" color={color}>
                <p className="text-xs leading-tight text-gray-700">{personal.summary}</p>
              </Card>
            )}

            {skills?.length > 0 && (
              <Card title="SKILLS" color={color}>
                <div className="grid grid-cols-2 gap-1">
                  {skills.map((s, i) => (
                    <div key={i} className="px-1.5 py-0.5 bg-black text-white text-xs font-bold text-center">
                      {s.toUpperCase()}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {certifications?.length > 0 && (
              <Card title="CERTS" color={color}>
                {certifications.map((c) => (
                  <div key={c.id} className="mb-1.5 text-xs">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-gray-600 text-xs">{c.issuer} {c.date && `· ${c.date}`}</p>
                  </div>
                ))}
              </Card>
            )}
          </div>

          {/* RIGHT: Timeline & Projects */}
          <div className="col-span-2 space-y-3 overflow-y-auto">
            {experiences?.length > 0 && (
              <Section title="EXPERIENCE" color={color}>
                {experiences.map((exp, i) => (
                  <TimelineBlock
                    key={exp.id}
                    title={exp.title}
                    company={exp.company}
                    period={`${exp.from} – ${exp.to || "NOW"}`}
                    points={exp.description.split("\n").filter(l => l.trim()).map(l => l.replace(/^- ?/, ""))}
                    isFirst={i === 0}
                  />
                ))}
              </Section>
            )}

            {education?.length > 0 && (
              <Section title="EDUCATION" color={color}>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2 p-2 bg-gray-50 border-l-4" style={{ borderColor: color }}>
                    <p className="font-bold text-xs">{edu.degree}</p>
                    <p className="text-xs">{edu.institution}</p>
                    <p className="text-xs text-gray-600">{edu.from} – {edu.to || "Present"}{edu.grade && ` · ${edu.grade}`}</p>
                  </div>
                ))}
              </Section>
            )}

            {projects?.length > 0 && (
              <Section title="PROJECTS" color={color}>
                <div className="grid grid-cols-2 gap-2">
                  {projects.map((p) => (
                    <div key={p.id} className="p-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-bold text-xs mb-0.5">{p.name}</p>
                      {p.link && <a href={p.link} className="text-xs underline block mb-0.5">LIVE</a>}
                      <p className="text-xs text-gray-700 mb-0.5">{p.technologies}</p>
                      <ul className="text-xs">
                        {p.description.split("\n").filter(l => l.trim()).slice(0, 2).map((l, i) => (
                          <li key={i}>• {l.replace(/^- ?/, "")}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {personal.hobbies?.length > 0 && (
              <Card title="INTERESTS" color={color}>
                <div className="flex flex-wrap gap-1">
                  {personal.hobbies.map((h, i) => {
                    const name = typeof h === "string" ? h : h.name;
                    return (
                      <span key={i} className="px-2 py-0.5 bg-yellow-300 text-black font-bold text-xs">
                        {name.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}