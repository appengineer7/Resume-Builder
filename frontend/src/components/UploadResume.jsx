// src/components/UploadResume.jsx
import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { parseDocx } from "../utils/parseDocx";

import {
  extractEmail,
  extractPhone,
  extractName,
  extractSummary,
  extractSkills,
  extractExperiences,
  extractEducation,
  extractProjects,
  extractCertifications,
  extractTitle,
  extractLocation,
} from "../utils/parseResumeText";

import { motion } from "framer-motion";
import { Upload, FileEdit, Loader } from "lucide-react";

// ✅ configure pdfjs worker
GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function UploadResume({ onParsed }) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("upload"); // upload | manual
  const [preview, setPreview] = useState(null); // Parsed data preview

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setPreview(null);

    try {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = async function () {
          const typedArray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let fullText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str || "").join(" ");
            fullText += pageText + "\n";
          }
          // console.log("Extracted PDF text:", fullText);
          processText(fullText);
        };
        reader.readAsArrayBuffer(file);

      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        reader.onload = async function () {
          const { text, images } = await parseDocx(this.result);
          // console.log("Extracted DOCX text:", text);
          processText(text, images);
        };
        reader.readAsArrayBuffer(file);

      } else {
        alert("Unsupported file type. Please upload PDF or DOCX.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error reading file:", err);
      setLoading(false);
    }
  };

  const processText = (text, images = []) => {
    if (!text || text.trim().length === 0) {
      alert("Failed to extract text from resume. Please try another file.");
      setLoading(false);
      return;
    }

    const parsedData = {
      personal: {
        fullName: extractName(text),
        title: extractTitle(text),
        email: extractEmail(text),
        phone: extractPhone(text),
        location: extractLocation(text),
        summary: extractSummary(text),
        hobbies: [], // no extractHobbies yet
        profileImage: images[0] || "", // use first image if available
      },
      education: extractEducation(text),
      experiences: extractExperiences(text),
      projects: extractProjects(text),
      skills: extractSkills(text),
      certifications: extractCertifications(text),
      images,
    };

    // console.log("Parsed Data:", parsedData);
    setPreview(parsedData);
    setLoading(false);
  };

  const handleConfirm = () => {
    if (preview) {
      onParsed(preview);
      setPreview(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toggle between Upload & Manual */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`flex-1 py-2 rounded-xl border text-center shadow ${
            mode === "upload" ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white"
          }`}
          onClick={() => setMode("upload")}
        >
          <Upload size={18} className="inline mr-2" />
          Upload Resume
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`flex-1 py-2 rounded-xl border text-center shadow ${
            mode === "manual" ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white"
          }`}
          onClick={() => setMode("manual")}
        >
          <FileEdit size={18} className="inline mr-2" />
          Fill Manually
        </motion.button>
      </div>

      {/* Upload Box */}
      {mode === "upload" && (
        <motion.div
          key="upload-box"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-dashed rounded-xl p-4 text-center"
        >
          <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} />
          {loading && (
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
              <Loader className="animate-spin" size={16} /> Processing...
            </div>
          )}

          {/* Preview parsed data */}
          {preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-lg bg-gray-50 border text-left"
            >
              <h3 className="font-bold text-gray-700 mb-2">Parsed Preview</h3>
              <p><b>Name:</b> {preview.personal.fullName || "—"}</p>
              <p><b>Email:</b> {preview.personal.email || "—"}</p>
              <p><b>Title:</b> {preview.personal.title || "—"}</p>
              <p><b>Skills:</b> {preview.skills.length ? preview.skills.join(", ") : "—"}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                onClick={handleConfirm}
              >
                Use This Data
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Manual Entry Info */}
      {mode === "manual" && (
        <motion.div
          key="manual-box"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-gray-50 border text-gray-700"
        >
          You can fill out your personal information manually below.
        </motion.div>
      )}
    </div>
  );
}
