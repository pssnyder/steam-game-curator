import React, { useState, useCallback } from 'react';
import { Game, Recommendation } from '../types';
import { getGameRecommendation } from '../services/geminiService';
import PromptInput from './PromptInput';
import RecommendationCard from './RecommendationCard';
import Spinner from './Spinner';

interface MoodStepProps {
  games: Game[];
  activePreferences: string[];
  onBack: () => void;
}

const MoodStep: React.FC<MoodStepProps> = ({ games, activePreferences, onBack }) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getGameRecommendation(games, activePreferences, prompt);
      setRecommendation(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get recommendation from AI: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [games, activePreferences]);

  const handleReset = () => {
    setRecommendation(null);
    setError(null);
  };

  if (recommendation) {
    return (
      <section id="recommendation-result" className="w-full animate-fade-in-up">
        <RecommendationCard recommendation={recommendation} />
        <div className="mt-8 flex justify-center gap-4">
            <button onClick={onBack} className="px-6 py-3 font-bold text-gray-300 bg-gray-700/50 rounded-md hover:bg-gray-600/50 transition-colors">
              &larr; Change Preferences
            </button>
            <button onClick={handleReset} className="px-8 py-3 font-bold text-lg text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-md hover:from-cyan-600 hover:to-violet-700 transition-all transform hover:scale-105 shadow-lg">
              Ask Again
            </button>
        </div>
      </section>
    );
  }

  return (
    <section id="ai-interaction" className="w-full bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. What are you in the mood for?</h2>
      <p className="text-gray-400 mb-6">
        Describe what kind of game you want to play right now. Be as specific as you like! The AI will use this, your preferences, and your game list to find the perfect match.
      </p>
      
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <PromptInput onSubmit={handleGetRecommendation} disabled={isLoading} />
      )}
      
      <div className="mt-8 flex justify-start">
        <button onClick={onBack} className="px-6 py-3 font-bold text-gray-300 bg-gray-700/50 rounded-md hover:bg-gray-600/50 transition-colors">
          &larr; Back to Preferences
        </button>
      </div>
    </section>
  );
};

export default MoodStep;
