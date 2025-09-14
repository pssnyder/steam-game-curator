import React from 'react';
import FileUpload from './FileUpload';

interface UploadStepProps {
  onGamesUpload: (content: string) => void;
  onPreferencesUpload: (content: string) => void;
  onNext: () => void;
  gamesCount: number;
  preferencesCount: number;
}

const UploadStep: React.FC<UploadStepProps> = ({ onGamesUpload, onPreferencesUpload, onNext, gamesCount, preferencesCount }) => {
  const canProceed = gamesCount > 0;

  return (
    <section id="data-upload" className="w-full bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Provide Your Data</h2>
      <p className="text-gray-400 mb-6">
        First, upload your game library. You can also provide a JSON file of your general gaming preferences to give the AI more context, but this is optional.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FileUpload
          id="games-csv"
          label="Upload Game Library (CSV)"
          onFileUpload={onGamesUpload}
          fileType=".csv"
          fileCount={gamesCount}
          description="A simple text or CSV file with one game title per line. This is required."
        />
        <FileUpload
          id="metadata-json"
          label="Upload Preferences (JSON)"
          onFileUpload={onPreferencesUpload}
          fileType=".json"
          fileCount={preferencesCount}
          description="Optional: A JSON file with an array of your general preference statements."
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 font-bold text-lg text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-md hover:from-cyan-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100 shadow-lg"
        >
          Next: Set Preferences &rarr;
        </button>
      </div>
    </section>
  );
};

export default UploadStep;
