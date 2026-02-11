import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentLevel: number;
  totalLevels: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentLevel, totalLevels }) => {
  // If we are on welcome screen (0) or final screen (5), hide or adjust logic.
  // Assuming levels 1-4 are the main form.
  if (currentLevel < 1 || currentLevel > totalLevels) return null;

  const percentage = (currentLevel / totalLevels) * 100;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-4">
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            <div className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full whitespace-nowrap">
                Nivel {currentLevel} de {totalLevels}
            </div>
        </div>
    </div>
  );
};