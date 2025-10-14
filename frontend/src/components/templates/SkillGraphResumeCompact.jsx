import React from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Linkedin, Globe, Folder, BarChart2 } from "lucide-react";

export default function SkillGraphResumeCompact({
  data,
  color = "#FF5722", // Accent color
  font = "Poppins",
}) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [] } = data;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden" style={{ fontFamily: font }}>
      {/* HEADER */}
      <header className="p-3 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white relative">
        <div className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden border-2 border-white w-24 h-24 mb-1 shadow-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
            {personal.profileImage ? (
              <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-200 text-xs bg-gray-500">No Photo</div>
            )}
          </div>
          <h1 className="text-2xl font-bold drop-shadow-md">{personal.fullName || 'Your Name'}</h1>
          <p className="text-sm opacity-90 mt-0.5">{personal.title || 'Professional Title'}</p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LEFT COLUMN */}
        <aside className="space-y-4 md:col-span-1">
          {/* Contact */}
          <Section title="Contact" color={color}>
            {personal.phone && <Item icon={<Phone size={12} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={12} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={12} />} text={personal.location} />}
            {personal.linkedin && <Item icon={<Linkedin size={12} />} text={personal.linkedin} />}
            {personal.website && <Item icon={<Globe size={12} />} text={personal.website} />}
          </Section>

          {/* Skills Graph */}
          {skills.length > 0 && (
            <Section title="Skills" icon={<BarChart2 size={14} />} color={color}>
              {skills.map((skill, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-xs font-semibold text-gray-700">{skill.name || skill}</span>
                    <span className="text-xxs text-gray-500">{skill.level || 70}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full" style={{ width: skill.level ? `${skill.level}%` : '70%', background: `linear-gradient(90deg, ${color}, #FFD700)` }}></div>
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Hobbies */}
          {personal.hobbies?.length > 0 && (
            <Section title="Hobbies" color={color}>
              {personal.hobbies.map((hobby, i) => (
                <p key={i} className="text-xs">{hobby.name || hobby}</p>
              ))}
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" color={color}>
              {certifications.map((cert, i) => (
                <p key={i} className="text-xs">{cert.name} {cert.date && `(${cert.date})`}</p>
              ))}
            </Section>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className="md:col-span-2 space-y-4">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="Profile" color={color}>
              <p className="text-xs text-gray-700 leading-snug">{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" icon={<Briefcase size={14} />} color={color}>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-2 p-2 border-l-4 border-gradient-to-r from-orange-400 to-red-500 bg-orange-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between">
                    <h4 className="text-xs font-semibold text-gray-900">{exp.title}</h4>
                    <span className="text-xxs text-gray-500">{exp.from} - {exp.to || 'Present'}</span>
                  </div>
                  <p className="text-xxs text-gray-700 font-medium mt-0.5">{exp.company}</p>
                  {exp.description && <p className="text-xxs text-gray-600 mt-0.5">{exp.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" icon={<GraduationCap size={14} />} color={color}>
              {education.map((edu, i) => (
                <div key={i} className="mb-2 p-2 border-l-4 border-gradient-to-r from-red-400 to-orange-500 bg-red-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-gray-900">{edu.degree}</span>
                    <span className="text-xxs text-gray-500">{edu.from} - {edu.to}</span>
                  </div>
                  <p className="text-xxs text-gray-700 mt-0.5">{edu.institution}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" icon={<Folder size={14} />} color={color}>
              {projects.map((proj, i) => (
                <div key={i} className="mb-2 p-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <p className="text-xs font-semibold text-gray-900 mb-0.5">{proj.name}</p>
                  {proj.description && <p className="text-xxs text-gray-700 mb-0.5">{proj.description}</p>}
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xxs underline">{proj.link}</a>}
                </div>
              ))}
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ title, icon, children, color }) {
  return (
    <div>
      <h3 className="text-xs font-bold flex items-center gap-1 mb-2" style={{ color }}>{icon} {title}</h3>
      {children}
    </div>
  );
}

function Item({ icon, text }) {
  return <p className="flex items-center gap-1 text-xxs text-gray-800">{icon} {text}</p>;
}
