import React from 'react';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900/80 rounded-xl p-6 shadow-2xl border border-violet-500/30 animate-fade-in-up space-y-4">
        <h2 className="text-2xl font-bold text-gray-200">The AI Recommends:</h2>
        <div className="relative p-6 bg-gray-900/70 rounded-lg border border-gray-700/50">
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                {recommendation.gameName}
            </h3>
        </div>
        <div>
            <h4 className="font-semibold text-lg text-gray-300 mb-2">Here's why:</h4>
            <p className="text-gray-400 leading-relaxed">
                {recommendation.reason}
            </p>
        </div>
    </div>
  );
};

export default RecommendationCard;
