import React, { useEffect, useState } from 'react';
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
  const [currentLevel, setCurrentLevel] = useState(0); // 0 = Welcome, 5 = Final
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Debug: confirmar que este App.tsx se está ejecutando
  useEffect(() => {
    console.log('🔥 App.tsx MONTADO (si ves esto, este App.tsx es el activo)');
  }, []);

  const handleFieldChange = (field: keyof FormData, value: any) => {
    console.log('🧩 handleFieldChange:', field, value);
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      console.log('🧠 formData actualizado:', updated);
      return updated;
    });
  };

  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // ✅ Debug: ver el formData completo antes de enviar
      console.log('📤 ENVIANDO FORMDATA COMPLETO:', formData);

      const success = await submitDataToSheet(formData);
      console.log('✅ submitDataToSheet success:', success);
    } catch (err) {
      console.error('❌ Error en handleSubmit:', err);
    } finally {
      setIsSubmitting(false);
      nextLevel();
    }
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

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400" />
    </div>
  );
};

export default App;

