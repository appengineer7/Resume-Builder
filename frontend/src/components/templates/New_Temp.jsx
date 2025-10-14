// src/components/templates/BoldResume.jsx
import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function BoldResume({
  data,
  color = "#F97316", 
  font = "Arial, sans-serif", 
}) {
  const { 
    personal = {}, 
    experiences = [], 
    education = [], 
    skills = [],
    projects = [],
    certifications = [],
    hobbies = []
  } = data;

  return (
    <div
      className="mx-auto overflow-hidden relative"
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: font,
        background: color,
        color: "#333333",
      }}
    >
      {/* Diagonal split background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', backgroundColor: '#1F2937', transform: 'skewX(-12deg)', transformOrigin: 'top left', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', backgroundColor: '#F3F4F6', zIndex: 0 }}></div>

      {/* Content */}
      <div className="relative z-10 flex h-full">
        {/* Left Sidebar - Dark */}
        <aside className="w-1/2 p-6 flex flex-col" style={{ color: '#FFFFFF' }}>
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full overflow-hidden border-4" style={{ width: '120px', height: '120px', borderColor: color }}>
              {personal.profileImage ? (
                <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">Photo</div>
              )}
            </div>
          </div>

          {/* Contact Me */}
          <SectionSidebar title="Contact Me" color={color}>
            {personal.phone && <ItemSidebar icon={<Phone size={16} />} text={personal.phone} />}
            {personal.email && <ItemSidebar icon={<Mail size={16} />} text={personal.email} />}
            {personal.website && <ItemSidebar icon={<Globe size={16} />} text={personal.website} />}
            {personal.location && <ItemSidebar icon={<MapPin size={16} />} text={personal.location} />}
          </SectionSidebar>


          {/* Education */}
          {education.length > 0 && (
            <SectionSidebar title="Education" color={color}>
              {education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <p className="text-sm font-bold uppercase">{edu.institution}</p>
                  <p className="text-xs">{edu.degree}</p>
                  <p className="text-xs">{edu.from} - {edu.to}</p>
                </div>
              ))}
            </SectionSidebar>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <SectionSidebar title="Skills" color={color}>
              {skills.map((skill, i) => (
                <div key={i} className="mb-2 flex items-center justify-between">
                  <p className="text-xs">{typeof skill === 'object' ? skill.name : skill}</p>
                  <div className="w-1/2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: typeof skill === 'object' ? `${skill.level || 70}%` : '70%', backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </SectionSidebar>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SectionSidebar title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="text-xs font-semibold">{cert.name} {cert.date && `(${cert.date})`}</p>
                  {cert.issuer && <p className="text-xs">{cert.issuer}</p>}
                </div>
              ))}
            </SectionSidebar>
          )}

          {/* Hobbies */}
          {personal.hobbies.length > 0 && (
            <SectionSidebar title="Hobbies" color={color}>
              <div className="flex flex-wrap gap-2">
                {personal.hobbies.map((hobby, i) => (
                  <span key={i} className="text-xs bg-gray-500 px-2 py-1 rounded">{typeof hobby === 'object' ? hobby.name : hobby}</span>
                ))}
              </div>
            </SectionSidebar>
          )}
        </aside>

        {/* Right Content - Light */}
        <main className="w-1/2 p-6 flex flex-col justify-start">
          {/* Name and Title */}
          <div className="mb-8 text-right">
            <h1 className="text-3xl font-bold uppercase" style={{ color: color }}>{personal.fullName || "Brian R. Baxter"}</h1>
            <p className="text-lg uppercase">{personal.title || "Graphic & Web Designer"}</p>
          </div>

          {/* About Me */}
          {personal.summary && (
            <SectionMain title="About Me" color={color}>
              <p className="text-sm leading-relaxed">{personal.summary}</p>
            </SectionMain>
          )}

          {/* Job Experience */}
          {experiences.length > 0 && (
            <SectionMain title="Job Experience" color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm uppercase">{exp.title}</p>
                    <p className="text-xs text-gray-500">{exp.from} - {exp.to || "Present"}</p>
                  </div>
                  <p className="text-sm italic">{exp.company} / {exp.location}</p>
                  {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </SectionMain>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <SectionMain title="Projects" color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <p className="font-bold text-sm uppercase">{proj.name}</p>
                  <p className="text-xs text-gray-500">{proj.from} - {proj.to}</p>
                  {proj.description && <p className="text-sm mt-1">{proj.description}</p>}
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs underline" style={{ color }}>
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </SectionMain>
          )}
        </main>
      </div>
    </div>
  );
}

/* Reusable Components for Sidebar (Dark) */
function SectionSidebar({ title, color, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2" style={{ color }}>
        <div className="w-4 h-4 rounded-full border-2 border-current"></div> {title}
      </h3>
      <div className="text-xs space-y-2">{children}</div>
    </div>
  );
}

function ItemSidebar({ icon, text }) {
  return (
    <p className="flex items-center gap-2 text-xs mb-1">
      {icon} {text}
    </p>
  );
}

/* Reusable Components for Main (Light) */
function SectionMain({ title, color, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2" style={{ color }}>
        <div className="w-4 h-4 rounded-full border-2 border-current"></div> {title}
      </h3>
      <div className="text-sm space-y-3">{children}</div>
    </div>
  );
}