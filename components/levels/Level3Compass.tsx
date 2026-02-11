import React from 'react';
import { Compass, Frown, Smile } from 'lucide-react';
import { LevelContainer } from '../ui/LevelContainer';
import { Button } from '../ui/Button';
import { FormData } from '../../types';

interface Level3Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
}

const SliderQuestion: React.FC<{
  title: string;
  statement1: string;
  statement2: string;
  value: number;
  onChange: (val: number) => void;
  gradientFrom: string;
  gradientTo: string;
}> = ({ title, statement1, statement2, value, onChange, gradientFrom, gradientTo }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      <div className="text-sm text-gray-600 italic mb-4 space-y-1">
        <p>"{statement1}"</p>
        <p>"{statement2}"</p>
      </div>
      
      <div className="relative pt-6 pb-2 px-2">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-gray-100 rounded-full -translate-y-1/2 overflow-hidden">
             <div 
               className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-300`}
               style={{ width: `${((value - 1) / 4) * 100}%` }}
             />
        </div>

        {/* Custom Range Input (invisible but clickable) */}
        <input 
          type="range" 
          min="1" 
          max="5" 
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-8 opacity-0 cursor-pointer z-10"
        />

        {/* Thumb Indicator */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-purple-500 rounded-full shadow-md pointer-events-none transition-all duration-300 flex items-center justify-center text-xs font-bold text-purple-700"
            style={{ left: `calc(${((value - 1) / 4) * 100}% - 16px)` }}
        >
            {value}
        </div>
      </div>
      
      <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
        <div className="flex items-center gap-1"><Frown size={14}/> Poco</div>
        <div className="flex items-center gap-1">Mucho <Smile size={14}/></div>
      </div>
    </div>
  );
};

export const Level3Compass: React.FC<Level3Props> = ({ data, onChange, onNext }) => {
  return (
    <LevelContainer 
      title="Brújula Interior: ¿Cómo te sientes hoy?" 
      icon={<Compass size={28} />}
    >
      <div className="mb-6 bg-blue-50 text-blue-800 p-4 rounded-xl text-center text-sm">
        Mueve el medidor y elige lo que más se parezca a ti.
      </div>

      <div className="space-y-2">
        
        <SliderQuestion
            title="Temores"
            statement1="Cuando pienso en mi futuro, a veces me preocupo."
            statement2="En algunos momentos me siento insegura o con miedo."
            value={data.scaleTemores}
            onChange={(val) => onChange('scaleTemores', val)}
            gradientFrom="from-orange-200"
            gradientTo="to-orange-400"
        />

        <SliderQuestion
            title="Esperanzas"
            statement1="Tengo sueños y metas que me motivan."
            statement2="Creo que puedo lograr cosas importantes."
            value={data.scaleEsperanzas}
            onChange={(val) => onChange('scaleEsperanzas', val)}
            gradientFrom="from-green-200"
            gradientTo="to-green-400"
        />

        <SliderQuestion
            title="Oportunidades"
            statement1="Siento que tengo oportunidades para salir adelante."
            statement2="Estoy aprendiendo cosas útiles para mi vida."
            value={data.scaleOportunidades}
            onChange={(val) => onChange('scaleOportunidades', val)}
            gradientFrom="from-blue-200"
            gradientTo="to-blue-400"
        />

        <SliderQuestion
            title="Bienestar"
            statement1="Me siento tranquila y segura en mi entorno."
            statement2="En general, me siento bien conmigo misma."
            value={data.scaleBienestar}
            onChange={(val) => onChange('scaleBienestar', val)}
            gradientFrom="from-pink-200"
            gradientTo="to-pink-400"
        />

        <div className="pt-4">
          <Button fullWidth onClick={onNext}>
            Última etapa
          </Button>
        </div>
      </div>
    </LevelContainer>
  );
};