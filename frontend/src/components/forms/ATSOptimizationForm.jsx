// src/components/forms/ATSOptimizationForm.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Zap,
  Search,
  FileText,
  Shield,
  Lightbulb,
  Bot,
  AlertTriangle,
  Sparkles,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// ATS configuration constants
const ATS_CONFIG = {
  FRIENDLY_FONTS: [
    "Arial",
    "Calibri",
    "Helvetica",
    "Times New Roman",
    "Verdana",
    "Georgia",
    "Trebuchet MS",
    "Tahoma",
    "Open Sans",
    "Lato",
  ],
  SIMPLE_TEMPLATES: [
    "classic",
    "modern",
    "minimal-elegance",
    "professionals",
  ],
  COMPLEX_TEMPLATES: [
    "creative",
    "modern-sidebar",
    "ProTwoColumnResume",
    "UniqueDesignerResume",
  ],
  CHECKLIST_WEIGHTS: {
    font: 0.2,
    template: 0.2,
    keywords: 0.4,
    sections: 0.1,
    contact: 0.1,
    length: 0.1,
  },
  MAX_JOB_DESC_LENGTH: 5000,
  MAX_SKILLS: 20,
  MAX_EXPERIENCES: 5,
};

export default function ATSOptimizationForm({
  data = {},
  onUpdate,
  selectedFont = "Arial",
  template = "classic",
  selectedColor = "#2563eb",
  setStep,
}) {
  const [jobDescription, setJobDescription] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const prevScore = useRef(0);
  const hasFiredConfetti = useRef(false);

  const personal = data.personal || {};
  const experiences = Array.isArray(data.experiences) ? data.experiences : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const font = ATS_CONFIG.FRIENDLY_FONTS.includes(selectedFont)
    ? selectedFont
    : "Arial";

  const isSimpleTemplate = ATS_CONFIG.SIMPLE_TEMPLATES.includes(template);

  // Checklist
  const atsBestPractices = [
    {
      id: "font",
      title: "ATS-Friendly Font",
      description: "Use Arial, Calibri, or similar fonts.",
      icon: <Shield size={18} className="text-green-600" />,
      checked: ATS_CONFIG.FRIENDLY_FONTS.includes(font),
    },
    {
      id: "template",
      title: "Simple Layout",
      description: "Avoid sidebars, graphics, or columns.",
      icon: <FileText size={18} className="text-green-600" />,
      checked: isSimpleTemplate,
    },
    {
      id: "keywords",
      title: "Job Keywords",
      description: "Match terms from the job description.",
      icon: <Search size={18} className="text-yellow-600" />,
      checked: suggestions.length > 0,
    },
    {
      id: "sections",
      title: "Standard Headings",
      description: "Include Experience, Education, Skills.",
      icon: <Zap size={18} className="text-green-600" />,
      checked: experiences.length > 0 || education.length > 0 || skills.length > 0,
    },
    {
      id: "contact",
      title: "Contact at Top",
      description: "Include name, email, and phone.",
      icon: <CheckCircle size={18} className="text-green-600" />,
      checked: !!(
        personal.fullName?.trim() &&
        (personal.email?.trim() || personal.phone?.trim())
      ),
    },
    {
      id: "length",
      title: "1–2 Pages",
      description: "Keep it concise and focused.",
      icon: <Lightbulb size={18} className="text-yellow-600" />,
      checked:
        experiences.length <= ATS_CONFIG.MAX_EXPERIENCES &&
        skills.length <= ATS_CONFIG.MAX_SKILLS,
    },
  ];

  const atsScore = useMemo(() => {
    let score = Object.keys(ATS_CONFIG.CHECKLIST_WEIGHTS).reduce((sum, key) => {
      const item = atsBestPractices.find((i) => i.id === key);
      return sum + (item.checked ? ATS_CONFIG.CHECKLIST_WEIGHTS[key] : 0);
    }, 0);
    return Math.round(Math.min(100, score * 100));
  }, [atsBestPractices]);

  // Confetti
  useEffect(() => {
    if (atsScore >= 90 && !hasFiredConfetti.current) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#6ee7b7"],
        scalar: 0.6,
      });
      hasFiredConfetti.current = true;
    } else if (atsScore < 90) {
      hasFiredConfetti.current = false;
    }
  }, [atsScore]);

  // OpenAI API for keyword extraction
  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      toast.error("Paste a job description first.", toastConfig);
      return;
    }
    if (jobDescription.length > ATS_CONFIG.MAX_JOB_DESC_LENGTH) {
      toast.error(`Job description exceeds ${ATS_CONFIG.MAX_JOB_DESC_LENGTH} characters.`, toastConfig);
      return;
    }
    setIsOptimizing(true);
    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an expert ATS resume analyzer. Extract the top 10–15 most important technical and soft skill keywords (e.g., React.js, Node.js, MongoDB, API integration, leadership) from the given job description. Return them as a comma-separated list only.",
            },
            {
              role: "user",
              content: jobDescription,
            },
          ],
          max_tokens: 200,
          temperature: 0.3,
        }),
      });

      if (!response.ok) throw new Error("OpenAI API failed");

      const data = await response.json();
      const content = data.choices[0].message.content;
      const extractedKeywords = content
        .split(",")
        .map((kw) => kw.trim())
        .filter((kw) => kw.length > 0);

      const newSkills = [
        ...skills,
        ...extractedKeywords.filter(
          (kw) => !skills.map((s) => s.toLowerCase()).includes(kw.toLowerCase())
        ),
      ];

      setSuggestions(extractedKeywords);
      onUpdate({ skills: newSkills });
      toast.success("Keywords successfully extracted!", toastConfig);
    } catch (err) {
      console.error(err);
      toast.error("Keyword extraction failed. Try again.", toastConfig);
    } finally {
      setIsOptimizing(false);
    }
  };

  const scoreColor =
    atsScore >= 80 ? "#10b981" : atsScore >= 60 ? "#f59e0b" : "#ef4444";
  const scoreLabel = atsScore >= 85 ? "Excellent" : atsScore >= 70 ? "Good" : atsScore >= 50 ? "Fair" : "Poor";

  // Empty state
  if (!personal.fullName?.trim() && experiences.length === 0 && skills.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 sm:py-16 space-y-6"
        role="alert"
      >
        <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
          <AlertTriangle size={32} className="text-yellow-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">No Data to Optimize</h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Add your <strong>name</strong>, <strong>experience</strong>, or <strong>skills</strong> first.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          aria-label="Go back to previous page"
        >
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto sm:px-6 py-6 sm:py-10"
      role="region"
      aria-label="ATS Optimization Form"
    >
      <div className="text-center mb-6 sm:mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Bot size={24} aria-hidden="true" />
          ATS Optimization
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">Analyze and improve your resume for ATS systems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start sm:px-6">
        {/* === LEFT SIDE === */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6 bg-white/80 backdrop-blur-sm sm:p-6 rounded-2xl border border-gray-200 shadow-sm"
        >
          {/* Score Visualization */}
          <div className="flex justify-center">
            <div className="relative w-[min(16rem,60vw)] h-[min(16rem,60vw)] mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse"></div>
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
                role="img"
                aria-label={`ATS score: ${atsScore}%`}
              >
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={scoreColor}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 283" }}
                  animate={{ strokeDasharray: `${(atsScore / 100) * 283} 283` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="drop-shadow-lg"
                  style={{ filter: `drop-shadow(0 0 12px ${scoreColor}40)` }}
                />
              </svg>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="absolute inset-4 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center p-4 border border-gray-100"
              >
                <div className="text-4xl sm:text-5xl font-black" style={{ color: scoreColor }}>
                  {atsScore}
                  <span className="text-2xl sm:text-3xl">%</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600">
                  {scoreLabel}
                </div>
                {atsScore >= 90 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="mt-2"
                  >
                    <Sparkles size={16} className="text-yellow-500 animate-pulse" aria-hidden="true" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Template & Font Info */}
          <div className="flex justify-center gap-4 sm:gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FileText size={14} aria-hidden="true" /> Template: <strong>{template}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-bold" style={{ fontFamily: font }}>A</span> Font: <strong>{font}</strong>
            </span>
          </div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-5 rounded-2xl border border-purple-200"
          >
            <h4 className="text-base sm:text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <Lightbulb size={18} className="text-yellow-500" aria-hidden="true" />
              Pro ATS Tips
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-700">
              <li>• Use keywords <strong>exactly</strong> as in the job description</li>
              <li>• Avoid tables, text boxes, or headers/footers</li>
              <li>• Spell out acronyms: <em>SEO (Search Engine Optimization)</em></li>
              <li>• Test with free ATS parsers online</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Keyword Extraction Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-md"
          >
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Search size={18} className="text-blue-600" aria-hidden="true" />
              Keyword Extraction
            </h4>
            <div className="relative">
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/50 resize-y"
                rows={5}
                maxLength={ATS_CONFIG.MAX_JOB_DESC_LENGTH}
                placeholder="Paste the Full Stack Developer job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                aria-label="Job description input"
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                {jobDescription.length}/{ATS_CONFIG.MAX_JOB_DESC_LENGTH}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isOptimizing}
              onClick={handleOptimize}
              className={`w-full mt-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                isOptimizing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg"
              }`}
              aria-label={isOptimizing ? "Extracting in progress" : "Extract keywords"}
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" aria-hidden="true" />
                  Extracting...
                </>
              ) : (
                <>
                  <Sparkles size={16} aria-hidden="true" />
                  Extract Keywords
                </>
              )}
            </motion.button>

            {/* Added Keywords */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <p className="text-xs sm:text-sm font-medium text-green-800 mb-2">Extracted Keywords:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {suggestions.map((kw, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {kw}
                        <CheckCircle size={12} aria-hidden="true" />
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Checklist */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-md"
          >
            <button
              onClick={() => setShowChecklist(v => !v)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setShowChecklist(v => !v)}
              className="w-full flex items-center justify-between mb-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={showChecklist}
              aria-controls="ats-checklist"
            >
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Shield size={18} className="text-green-600" aria-hidden="true" />
                ATS Checklist
              </h4>
              <span className={`text-xs sm:text-sm font-medium ${showChecklist ? "text-green-600" : "text-gray-500"}`}>
                {showChecklist ? "Hide" : "Show"} ({atsBestPractices.filter(i => i.checked).length}/{atsBestPractices.length})
              </span>
            </button>

            <AnimatePresence>
              {showChecklist && (
                <motion.div
                  id="ats-checklist"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {atsBestPractices.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-2 sm:gap-3 p-3 rounded-lg transition-colors ${
                        item.checked ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"
                      }`}
                      role="status"
                      aria-label={`${item.title}: ${item.checked ? "Compliant" : "Non-compliant"}`}
                    >
                      <span className={`flex-shrink-0 mt-0.5 ${item.checked ? "text-green-600" : "text-yellow-600"}`}>
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-xs sm:text-sm">{item.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div className={`ml-auto ${item.checked ? "text-green-600" : "text-yellow-600"}`}>
                        {item.checked ? <CheckCircle size={16} aria-hidden="true" /> : <AlertCircle size={16} aria-hidden="true" />}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="mt-6 sm:mt-8 text-center no-print"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(7)}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          aria-label="Go back to preview and customize"
        >
          <ChevronLeft size={16} />
          Back
        </motion.button>
      </motion.div>
    </motion.div>
  );
}