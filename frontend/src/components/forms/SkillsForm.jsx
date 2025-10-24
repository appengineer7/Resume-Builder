import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const AISuggestSkills = ({ onSuggest, jobTitle = "" }) => {
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSuggest = async () => {
    if (!jobTitle) {
      toast.error("Please enter a job title in Personal Info for better suggestions.", { position: "top-right", autoClose: 3000 });
      return;
    }

    setIsSuggesting(true);
    try {
      // ChatGPT API for skill suggestions
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a career advisor. Suggest 5-7 key technical and soft skills for the given job title, formatted as a comma-separated list.'
            },
            {
              role: 'user',
              content: `Suggest top skills for a ${jobTitle} role. Focus on in-demand skills for 2025.`
            }
          ],
          max_tokens: 150,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const suggested = data.choices[0].message.content.trim().replace(/[\n\r]/g, ', ').split(',').map(s => s.trim()).filter(s => s);

      onSuggest(suggested);
      toast.success("AI Skills Added Successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      console.error("AI Skills Added error:", error);
      toast.error("Failed to add AI skills.", { position: "top-right", autoClose: 3000 });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <button
      onClick={handleSuggest}
      disabled={isSuggesting}
      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isSuggesting ? 'animate-pulse' : ''}`}
    >
      {isSuggesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
      {isSuggesting ? 'Suggesting...' : 'AI Suggest Skills'}
    </button>
  );
};

export default function SkillsForm({ skills, onChange, jobTitle = "" }) { 
  const addSkill = () => {
    onChange([...skills, ""]);
  };

  const updateSkill = (index, value) => {
    const newArr = [...skills];
    newArr[index] = value;
    onChange(newArr);
  };

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleAISuggest = (suggested) => {
    onChange([...skills, ...suggested.slice(0, 5)]); // Add up to 5 new skills
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Skills</h3>
        <div className="flex gap-2">
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-md transition-all duration-300"
            type="button"
            onClick={addSkill}
          >
            + Add
          </button>
          <AISuggestSkills onSuggest={handleAISuggest} jobTitle={jobTitle} />
        </div>
      </div>

      {skills.map((skill, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center gap-2 sm:gap-3"
        >
          <div className="flex-1">
            <label
              htmlFor={`skill-${index}`}
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Skill
            </label>
            <input
              id={`skill-${index}`}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/50"
              placeholder="e.g., JavaScript"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
            />
          </div>
          <button
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-red-100 text-red-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 hover:text-red-700 transition-all duration-300"
            type="button"
            onClick={() => removeSkill(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}