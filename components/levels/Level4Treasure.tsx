import React from "react";
import { Gem } from "lucide-react";
import { LevelContainer } from "../ui/LevelContainer";
import { Button } from "../ui/Button";
import { FormData } from "../../types";

interface Level4Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Level4Treasure: React.FC<Level4Props> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting,
}) => {
  const isValid = data.dream.trim().length > 0;

  return (
    <LevelContainer
      title="El Tesoro: Tu Sueño"
      icon={<Gem size={28} className="text-amber-500" />}
    >
      <div className="space-y-6">
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-center">
          <h3 className="text-xl font-bold text-amber-800 mb-2">
            ¿Cuál es tu mayor sueño o meta en la vida?
          </h3>
          <p className="text-amber-700/70 text-sm mb-4">
            No hay límites. Escribe lo que tu corazón desea.
          </p>

          <textarea
            value={data.dream}
            onChange={(e) => onChange("dream", String(e.target.value))}
            className="w-full p-4 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:ring-0 outline-none text-gray-700 min-h-[150px] text-lg bg-white"
            placeholder="Mi sueño es..."
            autoComplete="off"
          />
        </div>

        {/* ✅ Mini debug opcional (borra después) */}
        <div className="text-[11px] text-gray-400 bg-white/50 p-2 rounded-lg border border-amber-100">
          DEBUG dream: {JSON.stringify(data.dream)}
        </div>

        <div className="pt-4">
          <Button
            fullWidth
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Guardando tu historia..." : "¡Aventura completada!"}
          </Button>
        </div>
      </div>
    </LevelContainer>
  );
};
