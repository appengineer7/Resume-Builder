import React from "react";
import AIGenerateDescription from "./AIGenerator";

export default function ExperienceForm({ experiences, onChange }) {
  const updateItem = (id, changes) => {
    const newArr = experiences.map((item) =>
      item.id === id ? { ...item, ...changes } : item
    );
    onChange(newArr);
  };

  const addItem = () => {
    onChange([
      ...experiences,
      { id: Date.now(), title: "", company: "", from: "", to: "", description: "" },
    ]);
  };

  const removeItem = (id) => {
    onChange(experiences.filter((x) => x.id !== id));
  };

  const handleAIDescription = (id, generated) => {
    updateItem(id, { description: generated });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Experience</h3>
        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-md transition-all duration-300"
          onClick={addItem}
        >
          + Add
        </button>
      </div>

      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Title and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label
                  htmlFor={`title-${exp.id}`}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Job Title
                </label>
                <input
                  id={`title-${exp.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., Software Engineer"
                  value={exp.title}
                  onChange={(e) => updateItem(exp.id, { title: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor={`company-${exp.id}`}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Company
                </label>
                <input
                  id={`company-${exp.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., Tech Corp"
                  value={exp.company}
                  onChange={(e) => updateItem(exp.id, { company: e.target.value })}
                />
              </div>
            </div>

            {/* From, To, and Remove */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div>
                <label
                  htmlFor={`from-${exp.id}`}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  From
                </label>
                <input
                  id={`from-${exp.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., 2020"
                  value={exp.from}
                  onChange={(e) => updateItem(exp.id, { from: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor={`to-${exp.id}`}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  To
                </label>
                <input
                  id={`to-${exp.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., Present"
                  value={exp.to}
                  onChange={(e) => updateItem(exp.id, { to: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 hover:text-red-700 transition-all duration-300"
                  onClick={() => removeItem(exp.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            {/* AI Suggest Button for Description */}
            {(exp.title || exp.company) && (
              <div className="flex justify-center">
                <AIGenerateDescription
                  title={exp.title}
                  company={exp.company}
                  onGenerate={(generated) => handleAIDescription(exp.id, generated)}
                />
              </div>
            )}
            {/* Description */}
            <div>
              <label
                htmlFor={`description-${exp.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id={`description-${exp.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                rows={4}
                placeholder="e.g., Developed web applications using React and Node.js"
                value={exp.description}
                onChange={(e) => updateItem(exp.id, { description: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}