import React, { useState } from 'react';
import { Game, UserPreferences } from './types';
import Header from './components/Header';
import StepProgressBar from './components/StepProgressBar';
import UploadStep from './components/UploadStep';
import PreferencesStep from './components/PreferencesStep';
import MoodStep from './components/MoodStep';

type AppStep = 'upload' | 'preferences' | 'mood';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('upload');
  const [games, setGames] = useState<Game[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [activePreferences, setActivePreferences] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGamesUpload = (content: string) => {
    try {
      const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
      
      // Handle potential CSV header (e.g., "Game", "Game,AppID", etc.)
      if (lines.length > 0 && lines[0].toLowerCase().startsWith('game')) {
        lines.shift();
      }

      // Extract only the game name from each line, assuming it's the first column in a CSV.
      // This handles cases where the file contains extra data like AppIDs.
      const gameNames = lines.map(line => line.split(',')[0].trim()).filter(Boolean);

      setGames(gameNames.map(name => ({ name })));
      setError(null);
    } catch (e) {
      setError('Failed to parse the games file. Please ensure it is a plain text or CSV file with one game per line. If using a CSV, the game name must be in the first column.');
      setGames([]);
    }
  };

  const handlePreferencesUpload = (content: string) => {
    try {
      const parsed: UserPreferences = JSON.parse(content);
      if (Array.isArray(parsed.preferences)) {
        setPreferences(parsed.preferences);
        setError(null);
      } else {
        throw new Error("JSON must have a 'preferences' key with a string array.");
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to parse JSON file. ${errorMessage}`);
      setPreferences([]);
    }
  };

  const handleToPreferencesStep = () => {
    setStep('preferences');
  };
  
  const handleToMoodStep = (currentActivePrefs: string[]) => {
    setActivePreferences(currentActivePrefs);
    setStep('mood');
  };
  
  const handleBackToUpload = () => {
    setStep('upload');
  };

  const handleBackToPreferences = () => {
    setStep('preferences');
  };

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <UploadStep
            onGamesUpload={handleGamesUpload}
            onPreferencesUpload={handlePreferencesUpload}
            onNext={handleToPreferencesStep}
            gamesCount={games.length}
            preferencesCount={preferences.length}
          />
        );
      case 'preferences':
        return (
          <PreferencesStep
            initialPreferences={preferences}
            onBack={handleBackToUpload}
            onNext={handleToMoodStep}
          />
        );
      case 'mood':
        return (
          <MoodStep
            games={games}
            activePreferences={activePreferences}
            onBack={handleBackToPreferences}
          />
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Header />
        
        <div className="my-12 flex justify-center">
          <StepProgressBar currentStep={step} />
        </div>

        <main className="mt-8">
           {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 animate-fade-in" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;