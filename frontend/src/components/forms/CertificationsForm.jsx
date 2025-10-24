import React from "react";

export default function CertificationsForm({ certifications, onChange }) {
  const updateItem = (id, changes) => {
    const newArr = certifications.map((item) =>
      item.id === id ? { ...item, ...changes } : item
    );
    onChange(newArr);
  };

  const addItem = () => {
    onChange([
      ...certifications,
      { id: Date.now(), name: "", issuer: "", date: "" },
    ]);
  };

  const removeItem = (id) => {
    onChange(certifications.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Certifications</h3>
        <button
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-md transition-all duration-300"
          onClick={addItem}
        >
          + Add
        </button>
      </div>

      {certifications.map((cert) => (
        <div
          key={cert.id}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Certification Name */}
            <div>
              <label
                htmlFor={`name-${cert.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Certification Name
              </label>
              <input
                id={`name-${cert.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., AWS Certified Solutions Architect"
                value={cert.name}
                onChange={(e) => updateItem(cert.id, { name: e.target.value })}
              />
            </div>

            {/* Issuer */}
            <div>
              <label
                htmlFor={`issuer-${cert.id}`}
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Issuer
              </label>
              <input
                id={`issuer-${cert.id}`}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                placeholder="e.g., Amazon Web Services"
                value={cert.issuer}
                onChange={(e) => updateItem(cert.id, { issuer: e.target.value })}
              />
            </div>

            {/* Date and Remove */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label
                  htmlFor={`date-${cert.id}`}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Date (YYYY-MM)
                </label>
                <input
                  id={`date-${cert.id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
                  placeholder="e.g., 2023-06"
                  value={cert.date}
                  onChange={(e) => updateItem(cert.id, { date: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 hover:text-red-700 transition-all duration-300"
                  onClick={() => removeItem(cert.id)}
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