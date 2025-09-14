import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 animate-fade-in">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
        <p className="text-lg text-cyan-400 font-semibold">AI is curating your next adventure...</p>
    </div>
  );
};

export default Spinner;
