import React from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function PersonalForm({ data, onChange }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onChange({ profileImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, ease: "easeOut" } },
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="
        w-full                /* ✅ Take full width */
        p-4 sm:p-6 md:p-8
        bg-white rounded-none sm:rounded-2xl 
        shadow-2xl backdrop-blur-md border border-gray-100
      "
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Image Upload */}
      <motion.div variants={fieldVariant} className="flex flex-col items-center mb-6">
        <label className="block font-semibold text-lg mb-2 text-gray-800">
          Profile Image
        </label>
        <div className="relative group">
          {data.profileImage ? (
            <motion.img
              key={data.profileImage}
              src={data.profileImage}
              alt="Profile Preview"
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full 
                         border-4 border-blue-500 shadow-lg 
                         group-hover:scale-105 transition-transform duration-200"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          ) : (
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-100 
                            flex items-center justify-center border-2 border-dashed 
                            border-gray-300 group-hover:border-blue-400 
                            transition-colors duration-200">
              <Upload className="text-gray-400 group-hover:text-blue-500" size={28} />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </motion.div>

      {/* Input Fields */}
      <motion.div className="space-y-5 w-full" variants={containerVariant}>
        {[
          { label: "Full Name", value: data.fullName, key: "fullName" },
          { label: "Title / Role", value: data.title, key: "title" },
          { label: "Email", value: data.email, key: "email", type: "email" },
          { label: "Phone", value: data.phone, key: "phone" },
          { label: "Location", value: data.location, key: "location" },
        ].map((field) => (
          <motion.div key={field.key} variants={fieldVariant}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              className="
                w-full border border-gray-300 p-3 rounded-xl 
                shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                outline-none transition-all
              "
              value={field.value}
              onChange={(e) => onChange({ [field.key]: e.target.value })}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </motion.div>
        ))}

        {/* Summary */}
        <motion.div variants={fieldVariant}>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Summary
          </label>
          <textarea
            className="
              w-full border border-gray-300 p-3 rounded-xl 
              shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
              outline-none transition-all min-h-[100px]
            "
            value={data.summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            placeholder="Write a short professional summary..."
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
