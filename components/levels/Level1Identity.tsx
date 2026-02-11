import React from 'react';
import { MapPin } from 'lucide-react';
import { LevelContainer } from '../ui/LevelContainer';
import { Button } from '../ui/Button';
import { FormData, Gender, FamilyContact } from '../../types';

interface Level1Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
}

export const Level1Identity: React.FC<Level1Props> = ({ data, onChange, onNext }) => {
  const isFormValid = 
    data.fullName.trim() !== '' &&
    data.age.trim() !== '' &&
    data.gender !== '' &&
    (data.gender !== Gender.DESCRIBE || data.genderDescription.trim() !== '') &&
    data.origin.trim() !== '' &&
    data.familyContact !== '';

  return (
    <LevelContainer 
      title="Puerta de Entrada: Tu Identidad" 
      icon={<MapPin size={28} />}
    >
      <div className="space-y-5">
        
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">1. ¿Cómo te llamas?</label>
          <input 
            type="text" 
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Preferred Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">2. ¿Cómo te gusta que te llamen?</label>
          <input 
            type="text" 
            value={data.preferredName}
            onChange={(e) => onChange('preferredName', e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            placeholder="Tu apodo o nombre preferido"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">3. ¿Cuántos años tienes?</label>
          <input 
            type="number" 
            value={data.age}
            onChange={(e) => onChange('age', e.target.value)}
            className="w-full p-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            placeholder="Ej: 15"
          />
        </div>

        {/* Gender Identity */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">4. Identidad de género</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.values(Gender).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange('gender', g)}
                className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                  data.gender === g 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}
              >
                {g}
              