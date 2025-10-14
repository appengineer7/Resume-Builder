import React from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Linkedin, Globe, Folder, Palette, Star } from "lucide-react";

export default function ColorfulResume({
  data,
  font = "Poppins",
}) {
  const { personal = {}, experiences = [], education = [], skills = [], projects = [], certifications = [], portfolioImages = [] } = data;

  return (
    <div className="max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden" style={{ 
        width: "732px",
        height: "1120px",
        fontFamily: `${font}, sans-serif`,
        background: "#fff",
        overflow: "hidden",
     }}>
      {/* HEADER */}
      <header className="p-4 text-center relative bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 text-white">
        <div className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden border-4 border-white w-32 h-32 mb-4 shadow-lg">
            {personal.profileImage ? (
              <img src={personal.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-200 text-sm bg-gray-500">No Photo</div>
            )}
          </div>
          <h1 className="text-4xl font-extrabold drop-shadow-md">{personal.fullName || 'Your Name'}</h1>
          <p className="text-lg mt-1 opacity-90">{personal.title || 'Creative Professional'}</p>
        </div>
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </header>

      {/* MAIN CONTENT */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <aside className="space-y-8 md:col-span-1">
          {/* Contact */}
          <Section title="Contact" color="text-white bg-teal-500">
            {personal.phone && <Item icon={<Phone size={14} />} text={personal.phone} />}
            {personal.email && <Item icon={<Mail size={14} />} text={personal.email} />}
            {personal.location && <Item icon={<MapPin size={14} />} text={personal.location} />}
            {personal.linkedin && <Item icon={<Linkedin size={14} />} text={personal.linkedin} />}
            {personal.website && <Item icon={<Globe size={14} />} text={personal.website} />}
          </Section>

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills" color="text-white bg-purple-500">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-semibold transform hover:scale-105 transition-transform duration-300">{skill.name || skill}</span>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" color="text-white bg-pink-500">
              {certifications.map((cert, i) => (
                <p key={i} className="text-sm text-white">{cert.name} {cert.date && `(${cert.date})`}</p>
              ))}
            </Section>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className="md:col-span-2 space-y-8">
          {/* Profile Summary */}
          {personal.summary && (
            <Section title="Profile" icon={<Star size={16} />} color="text-teal-600">
              <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Experience" icon={<Briefcase size={16} />} color="text-purple-600">
              {experiences.map((exp, i) => (
                <div key={i} className="mb-3 p-4 border-l-4 border-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-xs text-gray-500">{exp.from} - {exp.to || 'Present'}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium mt-1">{exp.company}</p>
                  {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" icon={<GraduationCap size={16} />} color="text-pink-600">
              {education.map((edu, i) => (
                <div key={i} className="mb-3 p-4 border-l-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-gray-900">{edu.degree}</span>
                    <span className="text-xs text-gray-500">{edu.from} - {edu.to}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{edu.institution}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" icon={<Folder size={16} />} color="text-indigo-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-white shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    <p className="text-sm font-bold text-gray-900 mb-2">{proj.name}</p>
                    {proj.description && <p className="text-xs text-gray-700 mb-1">{proj.description}</p>}
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">{proj.link}</a>}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Portfolio Visuals */}
          {portfolioImages.length > 0 && (
            <Section title="Portfolio" icon={<Palette size={16} />} color="text-pink-600">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioImages.map((img, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300">
                    <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-36 object-cover" />
                  </div>
                ))}
              </div>
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
      <h3 className={`text-sm font-bold flex items-center gap-2 mb-3`} style={{ color }}>{icon} {title}</h3>
      {children}
    </div>
  );
}

function Item({ icon, text }) {
  return <p className="flex items-center gap-2 text-xs text-gray-800">{icon} {text}</p>;
}
