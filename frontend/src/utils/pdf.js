// src/utils/pdf.js
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generatePDFFromElement(element, filename = "resume.pdf") {
  try {
    // Store original styles
    const originalStyles = {
      backgroundColor: element.style.backgroundColor,
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      width: element.style.width,
      height: element.style.height,
      padding: element.style.padding,
      margin: element.style.margin,
      boxShadow: element.style.boxShadow,
      transform: element.style.transform,
      overflow: element.style.overflow
    };

    // Set clean styles for PDF generation
    Object.assign(element.style, {
      backgroundColor: "#ffffff",
      position: "absolute",
      left: "-9999px",
      top: "0",
      width: "732px", // A4 width in pixels
      height: "1123px", // A4 height in pixels
      padding: "0px",
      margin: "0",
      boxShadow: "none",
      transform: "none",
      overflow: "visible",
      zIndex: -1
    });

    // Force reflow
    element.offsetHeight;

    const canvas = await html2canvas(element, {
      scale: 2, // Balanced quality vs performance
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 732,
      height: 1032,
      scrollX: 0,
      scrollY: 0
    });

    // Restore original styles
    Object.assign(element.style, originalStyles);
    element.offsetHeight; // Force reflow

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = {
      width: pdfWidth,
      height: (canvas.height * pdfWidth) / canvas.width,
    };

    let heightLeft = imgProps.height;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgProps.width, imgProps.height);
    heightLeft -= pdfHeight;

    // Add more pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgProps.height;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgProps.width, imgProps.height);
      heightLeft -= pdfHeight;
    }

    // Ensure filename has .pdf extension
    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    
    // Trigger download
    pdf.save(finalFilename);
    
    return { success: true, filename: finalFilename };
  } catch (error) {
    console.error("PDF generation failed:", error);
    
    // Restore original styles on error
    if (originalStyles) {
      Object.assign(element.style, originalStyles);
    }
    
    throw new Error(`PDF generation failed: ${error.message}`);
  }
}

// Enhanced version with better error handling
export async function downloadResumePDF(element, data, options = {}) {
  const {
    filename = null,
    quality = 'high', // 'low', 'medium', 'high'
    format = 'a4'
  } = options;

  try {
    // Generate smart filename
    let smartFilename = filename || `Resume-${data.personal?.fullName || 'Professional'}`;
    smartFilename = smartFilename.replace(/[^a-zA-Z0-9_-]/g, '_'); // Sanitize filename
    
    const scale = quality === 'high' ? 2 : quality === 'medium' ? 1.5 : 1;
    
    const result = await generatePDFFromElement(element, smartFilename, {
      scale,
      format
    });
    
    return result;
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
}

// Simple success/error notification helper
export const showDownloadNotification = (status, filename) => {
  if (typeof window !== 'undefined' && window.notify) {
    const message = status === 'success' 
      ? `✅ Resume downloaded successfully! "${filename}"`
      : `❌ Download failed. Please try again.`;
    
    window.notify(message, status);
  }
};