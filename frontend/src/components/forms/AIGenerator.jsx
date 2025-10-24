import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const AIGenerateDescription = ({ title, company, onGenerate }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title || !company) {
      toast.error("Please enter Job Title and Company first.", { position: "top-right", autoClose: 3000 });
      return;
    }

    setIsGenerating(true);
    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Or 'gpt-3.5-turbo' for cost efficiency
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume writer. Generate 3-5 concise, achievement-oriented bullet points for a job experience. Use action verbs, quantify impacts where possible, and keep each under 2 lines.'
            },
            {
              role: 'user',
              content: `Generate bullet points for the role of "${title}" at "${company}". Focus on key responsibilities, skills, and accomplishments relevant to the position.`
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const generated = data.choices[0].message.content.trim();

      onGenerate(generated);
      toast.success("AI suggest description added!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      console.error("AI suggest description error:", error);
      toast.error("Failed to AI suggest description and try again.", { position: "top-right", autoClose: 3000 });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isGenerating ? 'animate-pulse' : ''}`}
    >
      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
      {isGenerating ? 'Generating...' : 'AI Suggest Description'}
    </button>
  );
};

export default AIGenerateDescription;