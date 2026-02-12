import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Level1Identity } from './components/levels/Level1Identity';
import { Level2Backpack } from './components/levels/Level2Backpack';
import { Level3Compass } from './components/levels/Level3Compass';
import { Level4Treasure } from './components/levels/Level4Treasure';
import { FinalScreen } from './components/FinalScreen';
import { ProgressBar } from './components/ProgressBar';
import { INITIAL_DATA, FormData } from './types';
import { submitDataToSheet } from './services/sheetService';

const TOTAL_LEVELS = 4;

const App: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0); // 0 = Welcome, 5 = Success
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // ✅ DEBUG 1: ver formData completo ANTES de enviar
    console.log('✅ FORMDATA COMPLETO (antes de enviar):', formData);

    const success = await submitDataToSheet(formData);

    // ✅ DEBUG 2: ver si "envió" (en no-cors esto casi siempre será true si no hubo error de red)
    console.log('✅ submitDataToSheet success:', success);

    setIsSubmitting(false);
    nextLevel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 font-sans selection:bg-purple-200">
      <ProgressBar currentLevel={currentLevel} totalLevels={TOTAL_LEVELS} />

      <main className="container mx-auto px-4 pt-20 pb-12 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentLevel === 0 && (
            <WelcomeScreen key="welcome" onStart={nextLevel} />
          )}

          {currentLevel === 1 && (
            <Level1Identity
              key="level1"
              data={formData}
              onChange={handleFieldChange}
              onNext={nextLevel}
            />
          )}

          {currentLevel === 2 && (
            <Level2Backpack
              key="level2"
              data={formData}
              onChange={handleFieldChange}
              onNext={nextLevel}
            />
          )}

          {currentLevel === 3 && (
            <Level3Compass
              key="level3"
              data={formData}
              onChange={handleFieldChange}
              onNext={nextLevel}
            />
          )}

          {currentLevel === 4 && (
            <Level4Treasure
              key="level4"
              data={formData}
              onChange={handleFieldChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {currentLevel === 5 && (
            <FinalScreen key="final" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer background decor */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400" />
    </div>
  );
};

export default App;
