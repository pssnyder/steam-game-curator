import React, { useState, useEffect } from 'react';

interface PreferencesStepProps {
  initialPreferences: string[];
  onBack: () => void;
  onNext: (activePreferences: string[]) => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ initialPreferences, onBack, onNext }) => {
  const [preferences, setPreferences] = useState<string[]>(initialPreferences);
  const [activePreferences, setActivePreferences] = useState<Record<string, boolean>>({});
  const [newPreference, setNewPreference] = useState('');

  useEffect(() => {
    const initialActiveState = initialPreferences.reduce((acc, pref) => {
      acc[pref] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setActivePreferences(initialActiveState);
  }, [initialPreferences]);

  const handleToggle = (preference: string) => {
    setActivePreferences(prev => ({ ...prev, [preference]: !prev[preference] }));
  };

  const handleAddPreference = () => {
    if (newPreference.trim()) {
      const updatedPreference = newPreference.trim();
      if (!preferences.includes(updatedPreference)) {
        setPreferences(prev => [...prev, updatedPreference]);
        setActivePreferences(prev => ({ ...prev, [updatedPreference]: true }));
      }
      setNewPreference('');
    }
  };

  const handleSave = () => {
    const data = { preferences };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_preferences.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNext = () => {
    const selected = Object.entries(activePreferences)
      .filter(([, isActive]) => isActive)
      .map(([pref]) => pref);
    onNext(selected);
  };
  
  const handleRemovePreference = (prefToRemove: string) => {
    setPreferences(prefs => prefs.filter(p => p !== prefToRemove));
    setActivePreferences(currentActive => {
        const newActive = {...currentActive};
        delete newActive[prefToRemove];
        return newActive;
    });
  };

  return (
    <section id="preferences-step" className="w-full bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. Set Your Preferences</h2>
      <p className="text-gray-400 mb-6">
        Select which of your general preferences should apply for this session. You can also add new preferences or save your updated list for next time.
      </p>

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {preferences.length > 0 ? (
          preferences.map((pref, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-md border border-gray-700/50">
              <label className="flex items-center space-x-3 cursor-pointer select-none flex-grow">
                <input
                  type="checkbox"
                  checked={!!activePreferences[pref]}
                  onChange={() => handleToggle(pref)}
                  className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600"
                />
                <span className="text-gray-300">{pref}</span>
              </label>
               <button onClick={() => handleRemovePreference(pref)} className="ml-4 text-gray-500 hover:text-red-400 transition-colors p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No preferences loaded. Add one below to get started!</p>
        )}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          value={newPreference}
          onChange={(e) => setNewPreference(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddPreference()}
          placeholder="Add a new preference..."
          className="flex-grow p-3 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        />
        <button
          onClick={handleAddPreference}
          className="px-6 py-3 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 font-bold text-gray-300 bg-gray-700/50 rounded-md hover:bg-gray-600/50 transition-colors w-full sm:w-auto"
        >
          &larr; Back
        </button>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            onClick={handleSave}
            disabled={preferences.length === 0}
            className="flex-1 px-6 py-3 font-bold text-white bg-violet-600 rounded-md hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save to File
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-8 py-3 font-bold text-lg text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-md hover:from-cyan-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default PreferencesStep;
