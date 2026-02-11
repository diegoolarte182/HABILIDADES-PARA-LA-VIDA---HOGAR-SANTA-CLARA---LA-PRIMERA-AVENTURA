import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Heart } from 'lucide-react';
import { Button } from './ui/Button';

export const FinalScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 max-w-lg mx-auto"
    >
      <motion.div 
        initial={{ rotate: -10, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="mb-8 p-8 bg-white rounded-full shadow-2xl shadow-pink-200"
      >
        <PartyPopper size={64} className="text-pink-500" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        ¡Aventura completada!
      </h1>

      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white mb-10 shadow-lg">
        <div className="flex justify-center mb-4 text-pink-500">
            <Heart fill="currentColor" size={32} />
        </div>
        <p className="text-xl text-gray-700 font-medium leading-relaxed italic">
          “Recuerda: tu historia, tus sueños y tu voz tienen un valor enorme. Nunca dejes de creer en ti.”
        </p>
      </div>

      <Button onClick={() => window.location.reload()} variant="outline">
        Finalizar
      </Button>
    </motion.div>
  );
};