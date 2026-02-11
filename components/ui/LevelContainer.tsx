import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, TRANSITION } from '../../constants';

interface LevelContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const LevelContainer: React.FC<LevelContainerProps> = ({ title, icon, children }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={TRANSITION}
      className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-xl border border-white/50"
    >
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="text-purple-500">{icon}</div>}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};