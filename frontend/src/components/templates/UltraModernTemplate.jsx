import React from "react";

export default function UltraModernTemplate({ data, color = "#0f172a", font = "Inter" }) {
  const { personal, experiences, education, projects, skills, certifications } = data;

  return (
    <div
      className="bg-gradient-to-br from-gray-50 to-white mx-auto overflow-hidden"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "20px 18px",
        fontFamily: `${font}, system-ui, sans-serif`,
        fontSize: "11.2px",
        lineHeight: "1.48",
        color: "#1e293b",
        position: "relative",
      }}
    >

      {/* Header - Clean & Bold */}
      <header className="mb-5 pl-4 border-l-4" style={{ borderColor: color }}>
        <h1
          className="font-black tracking-tight"
          style={{ fontSize: "28px", color, margin: "0 0 4px 0" }}
        >
          {personal.fullName || "Full Name"}
        </h1>
        <p
          className="font-semibold tracking-wide"
          style={{ fontSize: "15px", color: shadeColor(color, 0.3), margin: 0 }}
        >
          {personal.title || "Senior Role"}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-gray-600">
          {personal.email && (
            <ContactItem icon={<Mail />} text={personal.email} />
          )}
          {personal.phone && (
            <ContactItem icon={<Phone />} text={personal.phone} />
          )}
          {personal.location && (
            <ContactItem icon={<Map />} text={personal.location} />
          )}
        </div>
      </header>

      {/* Main Grid: Asymmetric 2-Column */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "38% 1fr",
          gap: "20px",
          height: "calc(100% - 120px)",
        }}
      >
        {/* Left: Compact Blocks */}
        <div className="space-y-5">
          {/* Summary */}
          {personal.summary && (
            <Block title="About" icon={<UserIcon />}>
              <p className="text-gray-700 leading-snug">{personal.summary}</p>
            </Block>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <Block title="Core Skills" icon={<Zap />}>
              <div className="grid grid-cols-2 gap-1.5">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md text-xs font-semibold text-center"
                    style={{ color: shadeColor(color, 0.2) }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </Block>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <Block title="Certifications" icon={<Award />}>
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2 mb-2">
                  <Verified />
                  <div>
                    <p className="font-medium" style={{ fontSize: "11px" }}>
                      {cert.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {cert.issuer}
                      {cert.date && ` • ${cert.date}`}
                    </p>
                  </div>
                </div>
              ))}
            </Block>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Block title="Interests" icon={<Heart />}>
              <div className="flex flex-wrap gap-2">
                {personal.hobbies.map((hobby, i) => {
                  const name = typeof hobby === "string" ? hobby : hobby.name;
                  return (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-medium"
                      style={{ color: shadeColor(color, 0.2) }}
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </Block>
          )}

        </div>

        {/* Right: Timeline-Style Content */}
        <div className="space-y-6 pl-3 border-l" style={{ borderColor: "#e2e8f0" }}>
          {/* Experience */}
          {experiences?.length > 0 && (
            <TimelineSection title="Experience" icon={<Briefcase />}>
              {experiences.map((exp, idx) => (
                <TimelineItem
                  key={exp.id}
                  title={exp.title}
                  subtitle={exp.company}
                  date={`${exp.from} – ${exp.to || "Present"}`}
                  bullets={exp.description
                    .split("\n")
                    .filter((l) => l.trim())
                    .map((l) => l.replace(/^- ?/, ""))}
                  isLast={idx === experiences.length - 1}
                />
              ))}
            </TimelineSection>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <TimelineSection title="Education" icon={<Graduation />}>
              {education.map((edu, idx) => (
                <TimelineItem
                  key={edu.id}
                  title={edu.degree}
                  subtitle={edu.institution}
                  date={`${edu.from} – ${edu.to || "Present"}`}
                  extra={edu.grade && `GPA: ${edu.grade}`}
                  bullets={[]}
                  isLast={idx === education.length - 1}
                />
              ))}
            </TimelineSection>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <TimelineSection title="Projects" icon={<Code />}>
              {projects.map((proj, idx) => (
                <TimelineItem
                  key={proj.id}
                  title={proj.name}
                  subtitle={proj.technologies || ""}
                  bullets={proj.description
                    .split("\n")
                    .filter((l) => l.trim())
                    .map((l) => l.replace(/^- ?/, ""))}
                  link={proj.link}
                  isLast={idx === projects.length - 1}
                />
              ))}
            </TimelineSection>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span style={{ fontSize: "11px" }}>{text}</span>
  </div>
);

const Block = ({ title, icon, children }) => (
  <div className="bg-white p-3.5 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="font-bold text-sm tracking-wide" style={{ color: "#0f172a" }}>
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const TimelineSection = ({ title, icon, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-4 -ml-7">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="font-bold text-lg" style={{ color: "#0f172a" }}>
        {title}
      </h3>
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

const TimelineItem = ({ title, subtitle, date, extra, bullets, link, isLast }) => (
  <div className="relative pl-8">
    {/* Timeline Dot */}
    <div
      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white"
      style={{ backgroundColor: "#3b82f6", left: "-6px" }}
    />
    {/* Connector Line */}
    {!isLast && (
      <div
        className="absolute left-0 top-5 w-0.5 h-full -translate-x-1/2"
        style={{ backgroundColor: "#cbd5e1", left: "-6px" }}
      />
    )}

    <div>
      <div className="flex justify-between items-start mb-1">
        <div>
          <h4 className="font-semibold" style={{ fontSize: "12.5px" }}>
            {title}
          </h4>
          <p className="text-gray-600" style={{ fontSize: "11px" }}>
            {subtitle}
          </p>
        </div>
        <span className="text-gray-500 italic text-xs">{date}</span>
      </div>
      {extra && <p className="text-gray-600 text-xs mb-1">{extra}</p>}
      {bullets.length > 0 && (
        <ul className="mt-1.5 space-y-1">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-gray-700"
              style={{ fontSize: "11px" }}
            >
              <Chevron />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
        >
          <External />
          View Project
        </a>
      )}
    </div>
  </div>
);

// Icons
const Mail = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const Phone = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const Map = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const UserIcon = () => <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const Zap = () => <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const Award = () => <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const Briefcase = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 0h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const Graduation = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const Code = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const Heart = () => <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;

const Verified = () => <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const Chevron = () => <svg className="w-3.5 h-3.5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>;
const External = () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;

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