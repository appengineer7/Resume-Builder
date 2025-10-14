// src/components/forms/ProjectsForm.jsx
import React from "react";

export default function ProjectsForm({ projects, onChange }) {
  const updateItem = (id, changes) => {
    const newArr = projects.map((item) =>
      item.id === id ? { ...item, ...changes } : item
    );
    onChange(newArr);
  };

  const addItem = () => {
    onChange([
      ...projects,
      { id: Date.now(), name: "", description: "", technologies: "", link: "" },
    ]);
  };

  const removeItem = (id) => {
    onChange(projects.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Projects</h3>
        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-md transition-all duration-300"
          onClick={addItem}
        >
          + Add
        </button>
      </div>

      {projects.map((proj) => (
        <div
          key={proj.id}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Project Name */}
            <div>
              <label
                htmlFor={`name-${proj.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Project Name
              </label>
              <input
                id={`name-${proj.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., Personal Portfolio Website"
                value={proj.name}
                onChange={(e) => updateItem(proj.id, { name: e.target.value })}
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor={`description-${proj.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id={`description-${proj.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                rows={4}
                placeholder="e.g., Built a responsive portfolio website using React and Tailwind CSS"
                value={proj.description}
                onChange={(e) => updateItem(proj.id, { description: e.target.value })}
              />
            </div>

            {/* Technologies */}
            <div>
              <label
                htmlFor={`technologies-${proj.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Technologies (comma-separated)
              </label>
              <input
                id={`technologies-${proj.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., React, Node.js, MongoDB"
                value={proj.technologies}
                onChange={(e) => updateItem(proj.id, { technologies: e.target.value })}
              />
            </div>

            {/* Project Link */}
            <div>
              <label
                htmlFor={`link-${proj.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Project Link
              </label>
              <input
                id={`link-${proj.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., https://github.com/username/project"
                value={proj.link}
                onChange={(e) => updateItem(proj.id, { link: e.target.value })}
              />
            </div>

            {/* Remove Button */}
            <div className="flex justify-end">
              <button
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 hover:text-red-700 transition-all duration-300"
                onClick={() => removeItem(proj.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}