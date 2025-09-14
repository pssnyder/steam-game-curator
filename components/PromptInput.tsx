import React, { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit(prompt.trim());
    }
  };

  const quickPrompts = [
    "Something relaxing, not too challenging.",
    "A game with deep strategy like chess.",
    "A visually stunning game with vibrant colors.",
    "An educational game about programming.",
    "A good candidate to test a machine learning model.",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="flex flex-wrap gap-2 mb-4">
        {quickPrompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPrompt(p)}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-cyan-800/80 rounded-full text-cyan-300 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., 'I want a relaxing game with vivid colors that isn't too repetitive' or 'Suggest a game to test a decision-making AI model'"
        className="w-full h-24 p-3 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !prompt.trim()}
        className="w-full flex items-center justify-center px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-md hover:from-cyan-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Get Recommendation
      </button>
    </form>
  );
};

export default PromptInput;
