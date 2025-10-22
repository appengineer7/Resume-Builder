import React from "react";

export default function ResumeTemplate({ data, color = "#111827", font = "Inter" }) {
  const { personal, summary, experiences, education, skills } = data || {};

  // Default data from template
  const defaultPersonal = personal || {
    fullName: "OLIVIA WALKER",
    title: "PROFESSIONAL TITLE",
    phone: "1-123-234-123",
    email: "email@email.com",
    location: "City, State, Country",
    linkedin: "@username"
  };

  const defaultSummary = summary || "Write a summary of your qualifications and skills. Things you can mention: Number of years of experience in the field, relevant credentials, training, education, and accomplishments – mention relating to the job objective, or a quality of yours aligning to what the company is looking to hire. Quantify your career highlights with real numbers.";

  const defaultCoreSkills = skills?.core || [
    "Project Management",
    "Strategic Thinking",
    "Team Management",
    "Forward Thinking, Planning",
    "Business Ethics"
  ];

  const defaultTechnicalSkills = skills?.technical || [
    "MS Word & Excel",
    "Mac OS PC Word & Excel",
    "Adobe Photoshop CC",
    "Social Media Marketing"
  ];

  const defaultEducation = education || [
    {
      degree: "BACHELOR'S DIPLOMA",
      institution: "University College Name",
      location: "City, State, Country",
      years: "YEAR—YEAR"
    }
  ];

  const defaultExperiences = experiences || [
    {
      title: "/PROFESSIONAL TITLE",
      company: "/COMPANY NAME",
      location: "City, State, Country",
      years: "YEAR—YEAR",
      description: "Write a brief job and company description. Highlight your main achievements at the company instead of simply listing your tasks. Show real numbers and examples. When starting this you will copy, highlight the font 'text' and type in your resume (CTRL or CMD+C), go to keep font type, copy the font of your old resume (CTRL or CMD+V), if your template, right-click, select paste special, choose unformatted text.",
      bullets: [
        "• To keep font type, copy the font of your old resume (CTRL or CMD+C), go to keep font type, copy the font of your old resume (CTRL or CMD+V), if your template, right-click, select paste special, choose unformatted text.",
        "• Always highlight simply your tasks. Show real numbers and examples. Listing your basic responsibilities or daily tasks; do this before-",
        "• Give quantifiable examples of your achievements—“real” numbers—like positive statistics, customer ratings, or profit increases."
      ]
    },
    {
      title: "/PROFESSIONAL TITLE",
      company: "/COMPANY NAME",
      location: "City, State, Country",
      years: "YEAR—YEAR",
      description: "Write a brief job and company description. Highlight your main achievements at the company instead of simply listing your tasks. Show real numbers and examples.",
      bullets: [
        "• An example of profit increase would be “40% improvement of monthly-"
      ]
    }
  ];

  return (
    <div
      className="bg-white shadow-lg mx-auto"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "20mm 15mm",
        fontFamily: `${font}, Arial, sans-serif`,
        fontSize: "10px",
        lineHeight: "1.3",
        color: "#333",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color,
            margin: "0 0 5px 0",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {defaultPersonal.fullName}
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: shadeColor(color, 0.2),
            margin: "0 0 10px 0",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {defaultPersonal.title}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            fontSize: "11px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "8px", height: "8px", background: "#ddd", borderRadius: "50%" }} />
            <span>{defaultPersonal.phone}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>@</span>
            <span>{defaultPersonal.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "8px", height: "8px", background: "#ddd", borderRadius: "50%" }} />
            <span>{defaultPersonal.location}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>in</span>
            <span>LinkedIn {defaultPersonal.linkedin}</span>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color,
            margin: "0 0 8px 0",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "2px",
          }}
        >
          Professional Summary
        </h2>
        <p style={{ fontSize: "10px", textAlign: "justify", lineHeight: "1.4" }}>
          {defaultSummary}
        </p>
      </div>

      {/* Two-Column Layout */}
      <div style={{ display: "flex", gap: "25px", flex: 1, minHeight: "0" }}>
        {/* Left Column: Skills & Education */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Core Skills */}
          <div>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color,
                margin: "0 0 6px 0",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}
            >
              Core Skills
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {defaultCoreSkills.map((skill, i) => (
                <li key={i} style={{ fontSize: "10px", marginBottom: "3px", lineHeight: "1.2" }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color,
                margin: "0 0 6px 0",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}
            >
              Technical
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {defaultTechnicalSkills.map((skill, i) => (
                <li key={i} style={{ fontSize: "10px", marginBottom: "3px", lineHeight: "1.2" }}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color,
                margin: "0 0 6px 0",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}
            >
              Education
            </h3>
            {defaultEducation.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    marginBottom: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {edu.degree}
                </div>
                <div style={{ fontSize: "10px", marginBottom: "2px" }}>{edu.institution}</div>
                <div style={{ fontSize: "10px", color: "#666", marginBottom: "2px" }}>
                  {edu.location}
                </div>
                <div style={{ fontSize: "10px", color: "#666" }}>{edu.years}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Professional Experience */}
        <div style={{ flex: 1, paddingLeft: "25px", borderLeft: "1px solid #e5e7eb" }}>
          <h3
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color,
              margin: "0 0 10px 0",
              textTransform: "uppercase",
              letterSpacing: "0.3px",
            }}
          >
            Professional Experience
          </h3>
          {defaultExperiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase" }}>
                    {exp.title}
                  </div>
                  <div style={{ fontSize: "10px", color: "#666" }}>
                    {exp.company} – {exp.location} – {exp.years}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "10px", marginBottom: "6px", lineHeight: "1.3" }}>
                {exp.description}
              </p>
              {exp.bullets && (
                <ul style={{ listStyle: "disc", paddingLeft: "15px", margin: "4px 0 0 0" }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} style={{ fontSize: "10px", marginBottom: "2px", lineHeight: "1.2" }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
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