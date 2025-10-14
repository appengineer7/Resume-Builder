// src/components/forms/HobbiesForm.jsx
import React from "react";

export default function HobbiesForm({ hobbies = [], onChange }) {
  const updateItem = (index, value) => {
    const newArr = [...hobbies];
    newArr[index] = value;
    onChange(newArr);
  };

  const addItem = () => {
    onChange([...hobbies, ""]);
  };

  const removeItem = (index) => {
    onChange(hobbies.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Hobbies</h3>
        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-md transition-all duration-300"
          type="button"
          onClick={addItem}
        >
          + Add
        </button>
      </div>

      {hobbies.map((hobby, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center gap-2 sm:gap-3"
        >
          <div className="flex-1">
            <label
              htmlFor={`hobby-${index}`}
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Hobby
            </label>
            <input
              id={`hobby-${index}`}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
              placeholder="e.g., Photography"
              value={hobby}
              onChange={(e) => updateItem(index, e.target.value)}
            />
          </div>
          <button
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 hover:text-red-700 transition-all duration-300"
            type="button"
            onClick={() => removeItem(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}