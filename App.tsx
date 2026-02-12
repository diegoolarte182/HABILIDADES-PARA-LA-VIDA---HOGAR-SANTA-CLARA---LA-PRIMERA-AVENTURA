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
  const [currentLevel, setCurrentLevel] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Confirmar que ESTE App.tsx está montado
  useEffect(() => {
    console.log('🔥 App.tsx NUEVO MONTADO');
  }, []);

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      alert("🚀 Voy a enviar a Google Sheets ahora");

      console.log("📦 FORMDATA COMPLETO:", formData);

      const success = await submitDataToSheet(formData);

      console.log("✅ Resultado submitDataToSheet:", success);

      alert("✅ Envío ejecutado. Revisa el Google Sheet.");
    } catch (err) {
      console.error("❌ Error en handleSubmit:", err);
      alert("❌ Ocurrió un error (mira consola)");
    } finally {
      setIsSubmitting(false);
      nextLevel();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 font-sans selection:bg-purple-200">
      
      {/* ✅ MARCA VISUAL — prueba de Vercel */}
      <div style={{
        position: "fixed",
        top: 10,
        left: 10,
        zIndex: 99999,
        background: "black",
        color: "white",
        padding: "6px 10px",
        borderRadius: "8px",
        fontSize: "12px"
      }}>
        APP NUEVO ✅ 12-02
      </div>

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


