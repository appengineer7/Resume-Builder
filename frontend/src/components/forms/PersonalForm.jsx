import React from "react";
import { motion } from "framer-motion";
import { Upload, Mail, Phone, MapPin, User, Briefcase, FileText } from "lucide-react";

export default function PersonalForm({ data, onChange }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => onChange({ profileImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const containerVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const fields = [
    { label: "Full Name", key: "fullName", placeholder: "e.g. Poul Marphy", icon: User },
    { label: "Title / Role", key: "title", placeholder: "e.g. Full Stack Developer", icon: Briefcase },
    { label: "Email", key: "email", type: "email", placeholder: "e.g. poul.m@example.com", icon: Mail },
    { label: "Phone", key: "phone", placeholder: "e.g. +1 98765 43210", icon: Phone },
    { label: "Location", key: "location", placeholder: "e.g. San, Francisco", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <motion.div
        className="w-full max-w-58 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
          <motion.h1
            className="text-2xl font-bold flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <User className="w-6 h-6" />
            Personal Information
          </motion.h1>
          <motion.p
            className="text-blue-100 mt-1 opacity-90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Complete your professional profile
          </motion.p>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Profile Image Upload */}
          <motion.div variants={fieldVariant} className="flex flex-col items-center text-center">
            <label className="block font-semibold text-lg mb-4 text-gray-800">Profile Image</label>
            <div className="relative group cursor-pointer">
              {data.profileImage ? (
                <motion.img
                  key={data.profileImage}
                  src={data.profileImage}
                  alt="Profile Preview"
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white/50 shadow-xl ring-2 ring-blue-200/50 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 ease-out"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ) : (
                <motion.div
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-blue-400 transition-all duration-300 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div variants={iconVariants} className="mb-2">
                    <Upload className="text-gray-400 group-hover:text-blue-500" size={32} />
                  </motion.div>
                  <span className="text-xs text-gray-500 font-medium">Click to upload</span>
                </motion.div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Recommended: 400x400px, JPG or PNG</p>
          </motion.div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <motion.div key={field.key} variants={fieldVariant} className="relative">
                <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <field.icon className="w-4 h-4 text-blue-500" />
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white shadow-sm transition-all duration-200 hover:border-gray-300"
                  value={data[field.key] || ""}
                  onChange={(e) => onChange({ [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div variants={fieldVariant} className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Professional Summary
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white shadow-sm transition-all duration-200 min-h-[120px] resize-vertical hover:border-gray-300"
              value={data.summary || ""}
              onChange={(e) => onChange({ summary: e.target.value })}
              placeholder="Tell us about your professional background, key skills, and what you're passionate about. Keep it concise yet compelling."
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">Max 500 characters recommended</p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="bg-gray-50 px-8 py-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        ></motion.div>
      </motion.div>
    </div>
  );
}
