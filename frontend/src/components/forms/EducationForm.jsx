// src/components/forms/EducationForm.jsx
import React from "react";

export default function EducationForm({ education, onChange }) {
  const updateItem = (id, changes) => {
    const newArr = education.map((item) =>
      item.id === id ? { ...item, ...changes } : item
    );
    onChange(newArr);
  };

  const addItem = () => {
    onChange([
      ...education,
      { id: Date.now(), degree: "", institution: "", from: "", to: "", grade: "" },
    ]);
  };

  const removeItem = (id) => {
    onChange(education.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Education</h3>
        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-md transition-all duration-300"
          onClick={addItem}
        >
          + Add
        </button>
      </div>

      {education.map((edu) => (
        <div
          key={edu.id}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Degree */}
            <div>
              <label htmlFor={`degree-${edu.id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                id={`degree-${edu.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => updateItem(edu.id, { degree: e.target.value })}
              />
            </div>

            {/* Institution */}
            <div>
              <label
                htmlFor={`institution-${edu.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Institution
              </label>
              <input
                id={`institution-${edu.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., University of Example"
                value={edu.institution}
                onChange={(e) => updateItem(edu.id, { institution: e.target.value })}
              />
            </div>

            {/* From, To, Grade, and Remove */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3">
              <div>
                <label htmlFor={`from-${edu.id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  id={`from-${edu.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., 2018"
                  value={edu.from}
                  onChange={(e) => updateItem(edu.id, { from: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor={`to-${edu.id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  id={`to-${edu.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., 2022"
                  value={edu.to}
                  onChange={(e) => updateItem(edu.id, { to: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor={`grade-${edu.id}`} className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <input
                  id={`grade-${edu.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., 3.8 GPA"
                  value={edu.grade}
                  onChange={(e) => updateItem(edu.id, { grade: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 hover:text-red-700 transition-all duration-300"
                  onClick={() => removeItem(edu.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}