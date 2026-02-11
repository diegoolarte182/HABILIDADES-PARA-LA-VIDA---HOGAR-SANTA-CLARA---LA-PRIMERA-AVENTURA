import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 p-6 bg-white rounded-full shadow-2xl shadow-purple-200"
      >
        <Sparkles size={64} className="text-yellow-400 fill-yellow-200" />
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
        Habilidades para la Vida
        <br />
        <span className="text-purple-600 text-2xl md:text-3xl block mt-2">Hogar Santa Clara</span>
      </h1>

      <p className="text-xl text-gray-600 mb-10 max-w-md leading-relaxed">
        “Tu historia importa. Vamos paso a paso en esta pequeña aventura.”
      </p>

      <Button onClick={onStart} className="text-xl px-10 py-4 shadow-xl shadow-purple-300/50">
        Registrarte para iniciar <ArrowRight className="ml-2" />
      </Button>
      
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <Sparkles size={32} className="text-pink-400" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
        <Sparkles size={48} className="text-blue-400" />
      </div>
    </motion.div>
  );
};