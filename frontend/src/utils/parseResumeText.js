// Extract Email
export function extractEmail(text) {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/);
  return match ? match[0] : "";
}

// Extract Phone
export function extractPhone(text) {
  const match = text.match(/(\+?\d{1,3})?[-.\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}/);
  if (match) {
    return match[0].replace(/\s|-/g, "");
  }
  return "";
}

// Extract Name
export function extractName(text) {
  const firstLine = text.split("\n")[0] || "";
  const cleaned = firstLine
    .replace(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/, "")
    .replace(/(\+?\d{1,3}[-.\s]?)?\d{3}[-\s]?\d{3}[-\s]?\d{4}/, "")
    .trim();
  return cleaned.split(" ").slice(0, 2).join(" ") || "Full Name";
}

// Extract Title
export function extractTitle(text) {
  const topLines = text.split("\n").slice(0, 10).join(" ");
  const match = topLines.match(
    /(Software Engineer|Full Stack Developer|Frontend Developer|Backend Developer|Web Developer|Data Scientist|Machine Learning Engineer|UI\/UX Designer|Project Manager|QA Engineer|DevOps Engineer|Intern|iOS Developer|Android Developer|Mobile Developer|Flutter Developer|React Native Developer|Backend Developer|Frontend Engineer|Cloud Engineer)/i
  );
  return match ? match[0] : "Full Stack Developer";
}

// Extract Location
export function extractLocation(text) {
  const match = text.match(
    /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)[, ]+(?:[A-Z][a-z]+|India|USA|UK|Canada|Australia|Germany|France)\b/
  );
  return match ? match[0] : "";
}

// Extract Summary
export function extractSummary(text) {
  const match = text.match(/(SUMMARY|Profile|About Me)([\s\S]*?)(EXPERIENCE|EDUCATION|SKILLS|PROJECTS)/i);
  if (match) return match[2].replace(/\n+/g, " ").trim();
  const lines = text.split("\n").filter((l) => l.trim().length > 10);
  return lines.slice(1, 4).join(" ").trim();
}

// Extract Skills
export function extractSkills(text) {
  const match = text.match(/(Skills|Technical Skills|Core Competencies)([\s\S]*?)(Experience|Projects|Education|Certifications)/i);
  if (!match) return [];
  return match[2].split(/[,•\n]/).map((s) => s.trim()).filter((s) => s.length > 1);
}

// Extract Experience
export function extractExperiences(text) {
  const match = text.match(/(Experience|Work Experience)([\s\S]*?)(Education|Projects|Skills|Certifications|Languages)/i);
  if (!match) return [];
  const expText = match[2].trim();
  const jobs = expText.split(/\n{2,}|•/);
  return jobs.map((job, i) => {
    const titleMatch = job.match(/(Developer|Engineer|Manager|Intern|Lead|Consultant)/i);
    const companyMatch = job.match(/([A-Z][A-Za-z0-9& ]+(Technologies|Solutions|Inc|Ltd|LLC|Company))/);
    const dateMatch = job.match(/([A-Za-z]{3,9}\s?\d{4})\s*[-–]\s*([A-Za-z]{3,9}\s?\d{4}|Present)/);
    return {
      id: i,
      title: titleMatch ? titleMatch[0] : "Job Title",
      company: companyMatch ? companyMatch[0] : "",
      from: dateMatch ? dateMatch[1] : "",
      to: dateMatch ? dateMatch[2] : "Present",
      description: job.trim(),
    };
  }).filter((job) => job.description.length > 15);
}

// Extract Education
export function extractEducation(text) {
  const match = text.match(/(Education|Qualifications)([\s\S]*?)(Experience|Projects|Skills|Certifications)/i);
  if (!match) return [];
  const eduLines = match[2].split("\n").filter((l) => l.trim());
  return eduLines.map((line, i) => {
    const degreeMatch = line.match(/(Bachelor|Master|B\.Tech|M\.Tech|BSc|MSc|MBA|Diploma|Certificate)/i);
    const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/g);
    return {
      id: i,
      degree: degreeMatch ? degreeMatch[0] : "Degree",
      institution: line.replace(degreeMatch, "").replace(yearMatch, "").trim(),
      from: yearMatch?.[0] || "",
      to: yearMatch?.[1] || "",
    };
  });
}

// Extract Projects
export function extractProjects(text) {
  const match = text.match(/(Projects|Personal Projects)([\s\S]*?)(Experience|Education|Skills|Certifications)/i);
  if (!match) return [];
  return match[2].split(/\n{2,}|•/).map((proj, i) => ({
    id: i,
    name: proj.split(":")[0].trim(),
    description: proj.trim(),
    technologies: proj.includes(":") ? proj.split(":")[1].trim() : "",
    link: proj.match(/https?:\/\/\S+/)?.[0] || "",
  })).filter((p) => p.name.length > 3);
}

// Extract Certifications
export function extractCertifications(text) {
  const match = text.match(/(Certifications|Courses)([\s\S]*?)(Experience|Education|Projects|Skills|Languages)/i);
  if (!match) return [];
  return match[2].split(/\n|•/).map((c, i) => ({
    id: i,
    name: c.trim(),
    issuer: "", // optionally parse issuer if available
    date: "",   // optionally parse date if available
  })).filter((c) => c.name.length > 3);
}
