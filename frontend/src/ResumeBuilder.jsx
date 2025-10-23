// src/ResumeBuilder.jsx
import React, { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify"; // Added for notifications
import {
  Upload,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Palette,
  Heart,
  LayoutTemplate,
  Eye,
  Type,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Minimize2,
  Printer,
  Download,
  Save
} from "lucide-react";
import domToImage from "dom-to-image";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

import ClassicTemplate from "./components/templates/ClassicTemplate";
import ModernTemplate from "./components/templates/ModernTemplate";
import MinimalEleganceAltTemplate from "./components/templates/MinimalEleganceTemplate.jsx";
import ModernSidebarTemplate from "./components/templates/ModernSidebarTemplate.jsx";
import CreativeTemplate from "./components/templates/CreativeTemplate";
import ProfessionalTemplate from "./components/templates/ProfessionalTemplate.jsx";
import Morden_1 from "./components/templates/Morden_1.jsx";
import Morden_2 from "./components/templates/Morden_2.jsx";
import ProfessionalTwoColumnTemplate from "./components/templates/ProfessionalTwoColumnTemplate.jsx";
import New_temp from "./components/templates/New_Temp.jsx";
import ProTwoColumnResume from "./components/templates/ProTwoColumnResume.jsx";
import ProPolishedResume from "./components/templates/ProfessionalPolishedResume.jsx";
import BoldResume from "./components/templates/BoldResume.jsx";
import CorporateResume from "./components/templates/CorporateResume.jsx";
import ContemporaryResume from "./components/templates/ContemporaryResume.jsx";
import CleanSidebarResume from "./components/templates/CleanSidebarResume.jsx";
import ModernVisualResume from "./components/templates/ModernVisualResume.jsx";
import UniqueDesignerResume from "./components/templates/UniqueDesignerResume.jsx";
import ModernBlueResume from "./components/templates/ModernBlueResume.jsx";

import PersonalForm from "./components/forms/PersonalForm";
import ExperienceForm from "./components/forms/ExperienceForm";
import EducationForm from "./components/forms/EducationForm";
import ProjectsForm from "./components/forms/ProjectsForm";
import SkillsForm from "./components/forms/SkillsForm";
import CertificationsForm from "./components/forms/CertificationsForm";
import HobbiesForm from "./components/forms/HobbiesForm.jsx";
import UploadResume from "./components/UploadResume.jsx";

import resumeData from "./data/resumeData.js";

import classicImg from "./assets/images/template-image/classic.png";
import modernImg from "./assets/images/template-image/morden.png";
import professionalImg from "./assets/images/template-image/professionals.png";
import modernsideImg from "./assets/images/template-image/mordernside.png";
import creativeImg from "./assets/images/template-image/creative.png";
import minimalImg from "./assets/images/template-image/minimal-ele.png";
import mordern_2Img from "./assets/images/template-image/morden-2.png";
import morden_1Img from "./assets/images/template-image/morden-1.png";
import pro_two_col_Img from "./assets/images/template-image/pro-two-col.png";
import protwo_resumeImg from "./assets/images/template-image/ProTwoColumnResume.png";
import propolished_resume from "./assets/images/template-image/ProPolishedResume.png";
import bold_resume from "./assets/images/template-image/bold-resume.png";
import corporate_resume from "./assets/images/template-image/corporate-resume.png";
import contemporary_resume from "./assets/images/template-image/contemporary-resume.png";
import clean_sidebar from "./assets/images/template-image/clean-sidebar.png";
import modern_visual from "./assets/images/template-image/modern-visual.png";
import unique_designer from "./assets/images/template-image/unique-designer.png";
import morderblue_resume from "./assets/images/template-image/morden_blue.png";

// Toast notification configuration
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// Print-friendly wrapper component
const PrintResumeWrapper = forwardRef(({ data, color, font, template }, ref) => {
  const TemplateComponent = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    "modern-sidebar": ModernSidebarTemplate,
    creative: CreativeTemplate,
    professionals: ProfessionalTemplate,
    "minimal-elegance": MinimalEleganceAltTemplate,
    "morden-first": Morden_1,
    "morden-second": Morden_2,
    "pro-two-col-temp": ProfessionalTwoColumnTemplate,
    ProTwoColumnResume: ProTwoColumnResume,
    ProPolishedResume: ProPolishedResume,
    BoldResume: BoldResume,
    CorporateResume: CorporateResume,
    ContemporaryResume: ContemporaryResume,
    CleanSidebarResume: CleanSidebarResume,
    ModernVisualResume: ModernVisualResume,
    UniqueDesignerResume: UniqueDesignerResume,
    MordenBlueResume: ModernBlueResume,
    "new-temp": New_temp,
  }[template] || ClassicTemplate;

  return (
    <div ref={ref} className="print-resume-wrapper">
      <TemplateComponent data={data} color={color} font={font} />
    </div>
  );
});

PrintResumeWrapper.displayName = "PrintResumeWrapper";

export default function ResumeBuilder() {
  const location = useLocation();
  const [step, setStep] = useState(location.state?.step || 0);
  const [template, setTemplate] = useState("classic");
  const [selectedColor, setSelectedColor] = useState("#2563eb");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [previewMode, setPreviewMode] = useState("fit"); // "fit", "full", "print"
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 8;

  useEffect(() => {
    if (!selectedFont) return;

    const existingLinks = document.querySelectorAll("link[data-font='dynamic']");
    existingLinks.forEach((link) => link.remove());

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(
      / /g,
      "+"
    )}:wght@400;500;700&display=swap`;
    link.setAttribute("data-font", "dynamic");
    document.head.appendChild(link);
    link.onload = () => {
      document.body.style.setProperty(
        "--resume-font",
        `${selectedFont}, sans-serif`
      );
    };

    return () => {
      link.remove();
    };
  }, [selectedFont]);

  const [data, setData] = useState(resumeData);
  const previewRef = useRef(null);
  const printRef = useRef(null);

  // Automatically redirect to Upload / Info if Preview & Customize is accessed with empty data
  useEffect(() => {
    if (step === steps.length - 1 && isDataEmpty()) {
      toast.error(
        "Please fill in your resume details before previewing.",
        toastConfig
      );
      setStep(0);
    }
  }, [step, data]);

  const handleParsedResume = (parsedData) => {
    setData((prev) => ({
      ...prev,
      ...parsedData,
      personal: { ...prev.personal, ...parsedData.personal },
    }));
  };

  const handlePersonalChange = (changes) => {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, ...changes } }));
  };

  // Print handling
  useEffect(() => {
    const handleBeforePrint = () => {
      setIsPrinting(true);
    };

    const handleAfterPrint = () => {
      setIsPrinting(false);
      setPreviewMode("fit");
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const handlePrint = () => {
    setPreviewMode("print");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Download as Image handler
  const handleDownloadImage = async () => {
    if (!previewRef.current) return;

    setIsDownloading(true);
    try {
      await document.fonts.ready;
      const node = previewRef.current;
      const images = node.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = resolve;
                img.onerror = resolve;
              }
            })
        )
      );

      const originalStyle = node.style.cssText;
      node.style.width = "210mm";
      node.style.height = "297mm";
      node.style.maxWidth = "210mm";
      node.style.maxHeight = "297mm";
      node.style.padding = "0";
      node.style.margin = "0";
      node.style.overflow = "visible";
      node.style.transform = "none";
      node.style.boxShadow = "none";
      node.style.background = "#ffffff";

      const scale = 2;
      const dataUrl = await domToImage.toPng(node, {
        width: 794 * scale,
        height: 1123 * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${794}px`,
          height: `${1123}px`,
        },
        bgcolor: "#ffffff",
      });

      node.style.cssText = originalStyle;
      const blob = await (await fetch(dataUrl)).blob();
      saveAs(blob, `${data.personal.fullName || "resume"}.png`);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to download image. Please try again.", toastConfig);
    } finally {
      setIsDownloading(false);
    }
  };

  // Download as PDF handler
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    setIsDownloading(true);
    try {
      await document.fonts.ready;
      const node = previewRef.current;
      const images = node.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = resolve;
                img.onerror = resolve;
              }
            })
        )
      );

      const originalStyle = node.style.cssText;
      node.style.width = "210mm";
      node.style.height = "297mm";
      node.style.maxWidth = "210mm";
      node.style.maxHeight = "297mm";
      node.style.padding = "0";
      node.style.margin = "0";
      node.style.overflow = "visible";
      node.style.transform = "none";
      node.style.boxShadow = "none";
      node.style.background = "#ffffff";

      const scale = 3;
      const dataUrl = await domToImage.toPng(node, {
        width: 794 * scale,
        height: 1123 * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `794px`,
          height: `1123px`,
        },
        bgcolor: "#ffffff",
      });

      node.style.cssText = originalStyle;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);
      pdf.save(`${data.personal.fullName || "resume"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF. Please try again.", toastConfig);
    } finally {
      setIsDownloading(false);
    }
  };

  // Template configurations
  const templatesConfig = [
    {
      id: "pro-two-col-temp",
      label: "Professional Two-Column",
      img: pro_two_col_Img,
    },
    { id: "classic", label: "Classic", img: classicImg },
    { id: "modern-sidebar", label: "Modern Sidebar", img: modernsideImg },
    { id: "ProPolishedResume", label: "Professional Polished", img: propolished_resume },
    { id: "modern", label: "Modern", img: professionalImg },
    { id: "professionals", label: "Professional", img: modernImg },
    {
      id: "ProTwoColumnResume",
      label: "Pro Two-Column Resume",
      img: protwo_resumeImg,
    },
    { id: "creative", label: "Creative", img: creativeImg },
    { id: "minimal-elegance", label: "Minimal Elegance", img: minimalImg },
    { id: "morden-first", label: "Modern 1", img: morden_1Img },
    { id: "morden-second", label: "Modern 2", img: mordern_2Img },
    { id: "BoldResume", label: "Bold Resume", img: bold_resume },
    { id: "CorporateResume", label: "Corporate Resume", img: corporate_resume },
    {
      id: "ContemporaryResume",
      label: "Contemporary Resume",
      img: contemporary_resume,
    },
    { id: "CleanSidebarResume", label: "Clean Sidebar Resume", img: clean_sidebar },
    { id: "ModernVisualResume", label: "Modern Visual Resume", img: modern_visual },
    {
      id: "UniqueDesignerResume",
      label: "Unique Designer Resume",
      img: unique_designer,
    },
    { id: "MordenBlueResume", label: "Morden Blue Resume", img: morderblue_resume },
    { id: "new-temp", label: "New Template", img: pro_two_col_Img },
  ];

  // Pagination logic
  const totalPages = Math.ceil(templatesConfig.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const currentTemplates = templatesConfig.slice(
    startIndex,
    startIndex + templatesPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const isDataEmpty = () => {
    const { personal, experiences, education, projects, skills, certifications } = data;
    return (
      !personal?.fullName &&
      !personal?.email &&
      !personal?.phone &&
      experiences?.length === 0 &&
      education?.length === 0 &&
      projects?.length === 0 &&
      skills?.length === 0 &&
      certifications?.length === 0
    );
  };

  const handleNextStep = () => {
    if (step === steps.length - 2 && isDataEmpty()) {
      toast.error(
        "Please fill in at least some resume details before previewing.",
        toastConfig
      );
      setStep(0);
      return;
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const getPreviewStyles = () => {
    switch (previewMode) {
      case "full":
        return {
          width: "100%",
          height: "100vh",
          maxWidth: "none",
          maxHeight: "none",
          overflow: "visible",
          transform: "none",
          padding: "0",
          margin: "0",
        };
      case "print":
        return {
          width: "210mm",
          height: "297mm",
          maxWidth: "210mm",
          maxHeight: "297mm",
          overflow: "visible",
          transform: "none",
          padding: "0",
          margin: "0",
          boxShadow: "none",
        };
      case "fit":
      default:
        return {
          width: "100%",
          maxWidth: "850px",
          height: "auto",
          maxHeight: "90vh",
          overflow: "auto",
          transform: "none",
          padding: "0px",
          margin: "0 auto",
          borderRadius: "8px",
        };
    }
  };

  const renderResumeTemplate = (ref) => (
    <PrintResumeWrapper
      ref={ref}
      data={data}
      color={selectedColor}
      font={selectedFont}
      template={template}
    />
  );

  const steps = [
    {
      label: "Upload / Info",
      icon: <Upload size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 max-w-3xl mx-auto no-print"
        >
          <UploadResume onParsed={handleParsedResume} />
          <PersonalForm data={data.personal} onChange={handlePersonalChange} />
        </motion.div>
      ),
    },
    {
      label: "Experience",
      icon: <Briefcase size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto no-print"
        >
          <ExperienceForm
            experiences={data.experiences}
            onChange={(experiences) =>
              setData((prev) => ({ ...prev, experiences }))
            }
          />
        </motion.div>
      ),
    },
    {
      label: "Education",
      icon: <GraduationCap size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto no-print"
        >
          <EducationForm
            education={data.education}
            onChange={(education) => setData((prev) => ({ ...prev, education }))}
          />
        </motion.div>
      ),
    },
    {
      label: "Projects & Skills",
      icon: <Code size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto no-print"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" /> Projects
              </h3>
              <ProjectsForm
                projects={data.projects}
                onChange={(projects) => setData((prev) => ({ ...prev, projects }))}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" /> Skills
              </h3>
              <SkillsForm
                skills={data.skills}
                onChange={(skills) => setData((prev) => ({ ...prev, skills }))}
              />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      label: "Certifications",
      icon: <Award size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto no-print"
        >
          <CertificationsForm
            certifications={data.certifications}
            onChange={(certifications) =>
              setData((prev) => ({ ...prev, certifications }))
            }
          />
        </motion.div>
      ),
    },
    {
      label: "Hobbies",
      icon: <Heart size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto no-print"
        >
          <HobbiesForm
            hobbies={data.personal.hobbies}
            onChange={(hobbies) =>
              setData((prev) => ({
                ...prev,
                personal: { ...prev.personal, hobbies },
              }))
            }
          />
        </motion.div>
      ),
    },
    {
      label: "Choose Template",
      icon: <LayoutTemplate size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-6xl mx-auto no-print"
        >
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Select Your Perfect Template
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose a design that reflects your professional style and stands out to recruiters
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {currentTemplates.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTemplate(t.id)}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 group border-2 rounded-2xl ${
                    template === t.id
                      ? "border-purple-500 ring-4 ring-purple-200/50 shadow-2xl bg-purple-50"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                  style={{ aspectRatio: "0.7 / 1", height: "auto" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={t.img}
                    alt={t.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p
                      className={`text-sm font-bold transition-all duration-300 ${
                        template === t.id ? "text-purple-300 scale-105" : "text-white"
                      }`}
                    >
                      {t.label}
                    </p>
                  </div>
                  {template === t.id && (
                    <motion.div
                      className="absolute top-3 right-3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Sparkles size={14} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md"
                    }`}
                    aria-label="Previous page"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md"
                    }`}
                    aria-label="Next page"
                  >
                    Next
                  </motion.button>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(page)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-purple-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <motion.div
            className="text-center pt-6 no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-500">
              {templatesConfig.find((t) => t.id === template)?.label} template
              selected ✨
            </p>
          </motion.div>
        </motion.div>
      ),
    },
    {
      label: "Preview & Customize",
      icon: <Eye size={16} />,
      component: (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-7xl mx-auto space-y-8 no-print"
        >
          {isDataEmpty() ? (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                No Resume Data Available
              </h3>
              <p className="text-gray-600">
                You’ve been redirected to the start because no resume details were found. Please fill in your information to continue.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all duration-300"
                onClick={() => setStep(0)}
              >
                Start Filling Details
              </motion.button>
            </div>
          ) : (
            <>
              <motion.div
                className="text-center space-y-2 no-print"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Live Preview & Customization
                </h3>
                <p className="text-gray-600">
                  See your resume come to life and make it uniquely yours
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center gap-2 flex-wrap no-print"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    previewMode === "fit"
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setPreviewMode("fit")}
                >
                  <Maximize2 size={16} />
                  Fit to Screen
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    previewMode === "full"
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setPreviewMode("full")}
                >
                  <Maximize2 size={16} />
                  Full Size
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPrinting || isDownloading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    previewMode === "print" || isPrinting
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handlePrint}
                >
                  {isPrinting ? "Preparing..." : "Print Preview"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isDownloading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isDownloading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handleDownloadImage}
                >
                  <Save size={16} />
                  {isDownloading ? "Please wait..." : "Save as PNG"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isDownloading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isDownloading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handleDownloadPDF}
                >
                  <Download size={16} />
                  {isDownloading ? "Generating..." : "Save as PDF"}
                </motion.button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <motion.div
                  className="md:col-span-1 xl:col-span-2 space-y-6 no-print"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 relative ${
                      previewMode === "full" ? "fixed inset-0 z-50 bg-white/95" : ""
                    }`}
                  >
                    {previewMode === "full" && (
                      <motion.button
                        className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300 no-print"
                        onClick={() => setPreviewMode("fit")}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Minimize2 size={20} />
                      </motion.button>
                    )}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2 no-print">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Eye className="text-purple-600" size={20} />
                        {previewMode === "full" ? "Full Screen Preview" : "Live Preview"}
                      </h4>
                      <div className="text-sm text-gray-500">
                        {previewMode === "full" ? "Full Size" : "Fit View"} • A4 Format
                      </div>
                    </div>

                    <div
                      ref={previewRef}
                      className={`resume-capture transition-all duration-300 ${
                        previewMode === "full" ? "w-full h-full" : "border border-gray-200 rounded-xl"
                      }`}
                      style={getPreviewStyles()}
                    >
                      {renderResumeTemplate(null)}
                    </div>
                  </div>

                  <motion.div
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 no-print"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Sparkles size={20} className="text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">
                            {templatesConfig.find((t) => t.id === template)?.label}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Template selected • {data.personal.fullName || "Your Name"}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300"
                        onClick={() => setStep(6)}
                      >
                        Change Template
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className={`space-y-6 no-print ${previewMode === "full" ? "hidden md:block" : ""}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="sticky top-8 space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2 mb-6">
                        <Palette size={20} /> Personalize
                      </h3>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          🎨 Theme Color
                        </p>
                        <div className="flex gap-2 flex-wrap justify-center">
                          {[
                            { color: "#1f2937", label: "Dark Gray" },
                            { color: "#4b5563", label: "Gray" },
                            { color: "#6b7280", label: "Light Gray" },
                            { color: "#2563eb", label: "Blue" },
                            { color: "#1d4ed8", label: "Dark Blue" },
                            { color: "#0ea5e9", label: "Cyan" },
                            { color: "#14b8a6", label: "Teal" },
                            { color: "#059669", label: "Dark Green" },
                            { color: "#10b981", label: "Green" },
                            { color: "#f97316", label: "Orange" },
                            { color: "#d97706", label: "Amber" },
                            { color: "#9333ea", label: "Purple" },
                            { color: "#8b5cf6", label: "Light Purple" },
                            { color: "#ef4444", label: "Red" },
                            { color: "#b91c1c", label: "Dark Red" },
                          ].map((clr) => (
                            <motion.button
                              key={clr.color}
                              whileHover={{ scale: 1.15, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className={`relative w-10 h-10 rounded-full border-3 shadow-lg overflow-hidden transition-all duration-300 ${
                                selectedColor === clr.color
                                  ? "border-purple-500 ring-4 ring-purple-200/50 scale-110 shadow-purple-500/25"
                                  : "border-gray-300 hover:border-purple-400 hover:scale-105"
                              }`}
                              style={{ backgroundColor: clr.color }}
                              onClick={() => setSelectedColor(clr.color)}
                              title={clr.label}
                            >
                              {selectedColor === clr.color && (
                                <motion.div
                                  className="absolute inset-0 bg-white/20 rounded-full flex items-center justify-center"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <Sparkles size={12} className="text-white" />
                                </motion.div>
                              )}
                              <span className="sr-only">{clr.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                      >
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Type size={16} className="text-purple-600" /> Font Style
                        </p>
                        <select
                          className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200/50 transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                          value={selectedFont}
                          onChange={(e) => setSelectedFont(e.target.value)}
                        >
                          {[
                            { value: "Arial", label: "Arial (Simple & ATS-friendly)" },
                            { value: "Inter", label: "Inter (Modern)" },
                            { value: "Roboto", label: "Roboto (Clean)" },
                            { value: "Poppins", label: "Poppins (Geometric)" },
                            { value: "Merriweather", label: "Merriweather (Serif)" },
                            { value: "Lato", label: "Lato (Professional)" },
                            { value: "Open Sans", label: "Open Sans (Readable)" },
                            { value: "Montserrat", label: "Montserrat (Bold)" },
                            { value: "Raleway", label: "Raleway (Light)" },
                            { value: "Oswald", label: "Oswald (Display)" },
                            { value: "Source Sans Pro", label: "Source Sans Pro (Versatile)" },
                            { value: "Calibri", label: "Calibri (Modern & Readable)" },
                            { value: "Helvetica", label: "Helvetica (Clean & Professional)" },
                            { value: "Verdana", label: "Verdana (Clear & Legible)" },
                            { value: "Tahoma", label: "Tahoma (Readable & Standard)" },
                            { value: "Georgia", label: "Georgia (Serif, Professional)" },
                            { value: "Times New Roman", label: "Times New Roman (Classic ATS-safe)" },
                            { value: "Trebuchet MS", label: "Trebuchet MS (Professional & Clean)" },
                            { value: "Cambria", label: "Cambria (Readable & Professional)" },
                            { value: "Garamond", label: "Garamond (Elegant & ATS-safe)" }
                          ].map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.label}
                            </option>
                          ))}
                        </select>
                      </motion.div>

                      <motion.div
                        className="space-y-3 pt-4 no-print"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isDownloading}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            isDownloading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl hover:shadow-2xl"
                          }`}
                          onClick={handleDownloadPDF}
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Generating PDF...
                            </>
                          ) : (
                            <>
                              <Download size={18} />
                              Save as PDF
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isDownloading}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            isDownloading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl"
                          }`}
                          onClick={handleDownloadImage}
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Please wait...
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              Save as PNG
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isPrinting || isDownloading}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            isPrinting || isDownloading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl hover:shadow-2xl"
                          }`}
                          onClick={handlePrint}
                        >
                          {isPrinting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Preparing Print...
                            </>
                          ) : (
                            <>
                              <Printer size={18} />
                              Print Resume
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                          onClick={() => setStep(step - 1)}
                          disabled={isPrinting || isDownloading}
                        >
                          <ChevronLeft size={18} />
                          Go Back
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stepIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 no-print">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 md:p-8 w-full">
        <motion.div
          className="text-center mb-8 w-full max-w-4xl no-print"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Resume Builder
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Craft your professional story with stunning templates and AI-powered
            insights
          </p>
        </motion.div>

        <motion.div
          className="relative w-full max-w-5xl mb-12 overflow-x-auto no-print"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute top-6 left-0 h-1.5 bg-gradient-to-r from-purple-300 to-pink-300 w-full rounded-full opacity-20" />
          <motion.div
            className="absolute top-6 left-0 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"
            initial={{ width: 0, scaleX: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%`, scaleX: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="flex min-w-max justify-between relative z-10 px-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                variants={stepIconVariants}
                className="flex flex-col items-center min-w-[60px]"
              >
                <motion.button
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 overflow-hidden ${
                    i === step
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl"
                      : i < step
                      ? "bg-emerald-500/80 text-white shadow-lg"
                      : i === steps.length - 1 && isDataEmpty()
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white/60 backdrop-blur-sm text-gray-500 border-2 border-gray-300 shadow-md"
                  }`}
                  onClick={() => {
                    if (i === steps.length - 1 && isDataEmpty()) {
                      toast.error(
                        "Please fill in some resume details before previewing.",
                        toastConfig
                      );
                      setStep(0);
                      return;
                    }
                    setStep(i);
                  }}
                  aria-label={`Go to ${s.label} step`}
                  disabled={isPrinting || isDownloading || (i === steps.length - 1 && isDataEmpty())}
                >
                  {i === step && !isPrinting && !isDownloading && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <div className="relative z-10">{s.icon}</div>
                </motion.button>
                <span
                  className={`text-xs mt-2 font-medium transition-colors text-center px-1 whitespace-nowrap ${
                    i === step
                      ? "text-purple-600"
                      : i < step
                      ? "text-emerald-600"
                      : i === steps.length - 1 && isDataEmpty()
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className={`backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-7xl border border-white/20 relative overflow-hidden ${
            previewMode === "full" ? "rounded-none border-none shadow-none p-0" : ""
          }`}
        >
          <AnimatePresence mode="wait">{steps[step].component}</AnimatePresence>

          {step < steps.length - 1 && previewMode !== "full" && !isPrinting && (
            <motion.div
              className="flex justify-between mt-8 pt-6 border-t border-white/10 flex-col sm:flex-row gap-4 sm:gap-0 no-print"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {step > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPrinting || isDownloading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setStep(step - 1)}
                >
                  <ChevronLeft size={18} />
                  Previous
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                disabled={isPrinting || isDownloading}
                className={`sm:ml-auto flex items-center gap-2 px-8 py-3 rounded-xl shadow-xl font-semibold transition-all duration-300 ${
                  isPrinting || isDownloading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl"
                }`}
                onClick={handleNextStep}
              >
                Next
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {step < steps.length - 1 && previewMode !== "full" && !isPrinting && (
          <motion.div
            className="mt-6 text-center no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg">
              Step {step + 1} of {steps.length} •{" "}
              {Math.round(((step + 1) / steps.length) * 100)}% Complete
            </div>
          </motion.div>
        )}

        {previewMode === "full" && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-white/95 no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/90 flex-wrap gap-4 no-print">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300"
                onClick={() => setStep(step - 1)}
                disabled={step === 0 || isPrinting || isDownloading}
              >
                <ChevronLeft size={20} />
                Back to Editor
              </motion.button>

              <div className="flex items-center gap-2 flex-wrap no-print">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    previewMode === "fit"
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setPreviewMode("fit")}
                >
                  <Minimize2 size={16} />
                  Fit View
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  disabled={isPrinting || isDownloading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isPrinting || isDownloading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handlePrint}
                >
                  <Printer size={16} />
                  {isPrinting ? "Preparing..." : "Print"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  disabled={isDownloading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isDownloading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handleDownloadImage}
                >
                  <Download size={16} />
                  {isDownloading ? "Generating..." : "Download Image"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  disabled={isDownloading}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isDownloading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handleDownloadPDF}
                >
                  <Download size={16} />
                  {isDownloading ? "Generating..." : "Download PDF"}
                </motion.button>
              </div>
            </div>

            <div
              ref={previewRef}
              className="flex-1 w-full overflow-auto"
              style={{
                width: "100%",
                height: "calc(100vh - 80px)",
                fontFamily: `var(--resume-font, ${selectedFont}, sans-serif)`,
              }}
            >
              {renderResumeTemplate(null)}
            </div>
          </motion.div>
        )}

        <div
          ref={printRef}
          className="print-only fixed inset-0 z-50 bg-white hidden print:block print:absolute print:inset-0 print:z-0 print:w-full print:h-auto print:overflow-visible print:pt-0"
          style={getPreviewStyles()}
        >
          {renderResumeTemplate(printRef)}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .resume-capture {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }

        .resume-capture::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .resume-capture::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 4px;
        }

        .resume-capture::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #cbd5e1, #94a3b8);
          border-radius: 4px;
        }

        .resume-capture::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #94a3b8, #64748b);
        }

        .resume-capture[style*="height: 100vh"] {
          padding: 0 !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          background: white !important;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          body,
          html {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
          }

          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
            visibility: visible !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            overflow: hidden !important;
          }

          .print-only *,
          .print-resume-wrapper * {
            visibility: visible !important;
            position: static !important;
            page-break-inside: avoid;
            page-break-after: avoid !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .print-resume-wrapper {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-width: 210mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: row !important;
          }

          .print-resume-wrapper [class*="sidebar"],
          .print-resume-wrapper [class*="left"],
          .print-resume-wrapper [class*="profile"] {
            width: auto !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            break-inside: avoid !important;
            float: left !important;
          }

          .print-resume-wrapper [class*="content"],
          .print-resume-wrapper [class*="right"],
          .print-resume-wrapper main {
            width: auto !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            break-inside: avoid !important;
            overflow: hidden !important;
          }

          .print-resume-wrapper img.profile-image {
            max-width: 100% !important;
            height: auto !important;
            object-fit: cover !important;
            border-radius: 0 !important;
          }

          @page {
            size: A4 portrait;
            margin: 0;
            padding: 0;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            page-break-after: avoid;
          }

          .print-resume-wrapper > * {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .resume-capture {
            max-height: 70vh !important;
          }
        }

        @media (max-width: 640px) {
          .resume-capture {
            padding: 4px !important;
            border-radius: 4px !important;
          }
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}