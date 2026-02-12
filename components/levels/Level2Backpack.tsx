import React from "react";
import { Backpack } from "lucide-react";
import { LevelContainer } from "../ui/LevelContainer";
import { Button } from "../ui/Button";
import { FormData } from "../../types";
import { motion, AnimatePresence } from "framer-motion";

interface Level2Props {
  data: FormData;
  onChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
}

const YesNoQuestion: React.FC<{
  label: string;
  number: number;
  value: boolean | null;
  onChange: (val: boolean) => void;
  descValue: string;
  onDescChange: (val: string) => void;
  descPlaceholder: string;
}> = ({ label, number, value, onChange, descValue, onDescChange, descPlaceholder }) => {
  return (
    <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
      <label className="block text-gray-800 font-semibold mb-3">
        {number}. {label}
      </label>

      <div className="flex gap-3 mb-3">
        <button
          type="button" // ✅ CLAVE
          onClick={() => onChange(true)}
          className={`flex-1 py-2 px-4 rounded-xl font-bold transition-all ${
            value === true
              ? "bg-purple-500 text-white shadow-md transform scale-105"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          Sí
        </button>

        <button
          type="button" // ✅ CLAVE
          onClick={() => onChange(false)}
          className={`flex-1 py-2 px-4 rounded-xl font-bold transition-all ${
            value === false
              ? "bg-pink-500 text-white shadow-md transform scale-105"
              : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          No
        </button>
      </div>

      <AnimatePresence>
        {value === true && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <textarea
              value={descValue}
              onChange={(e) => onDescChange(String(e.target.value))}
              placeholder={descPlaceholder}
              className="w-full p-3 rounded-xl border border-purple-300 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-sm"
              rows={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Level2Backpack: React.FC<Level2Props> = ({ data, onChange, onNext }) => {
  const isValid =
    (data.medicalTreatment === false || (data.medicalTreatment === true && data.medicalTreatmentDesc.trim() !== "")) &&
    (data.psychSupport === false || (data.psychSupport === true && data.psychSupportDesc.trim() !== "")) &&
    (data.substanceSupport === false || (data.substanceSupport === true && data.substanceSupportDesc.trim() !== ""));

  return (
    <LevelContainer title="Mochila de Bienestar" icon={<Backpack size={28} />}>
      <div className="space-y-6">
        <YesNoQuestion
          number={7}
          label="¿Actualmente recibes algún tratamiento médico?"
          value={data.medicalTreatment}
          onChange={(val) => onChange("medicalTreatment", val)}
          descValue={data.medicalTreatmentDesc}
          onDescChange={(val) => onChange("medicalTreatmentDesc", val)}
          descPlaceholder="Indica cuál tratamiento médico."
        />

        <YesNoQuestion
          number={8}
          label="¿Actualmente recibes algún acompañamiento o tratamiento psicológico?"
          value={data.psychSupport}
          onChange={(val) => onChange("psychSupport", val)}
          descValue={data.psychSupportDesc}
          onDescChange={(val) => onChange("psychSupportDesc", val)}
          descPlaceholder="Indica cuál acompañamiento o tratamiento psicológico."
        />

        <YesNoQuestion
          number={9}
          label="¿Has recibido apoyo o tratamiento por hábitos o conductas que afectaban tu bienestar (por ejemplo, consumo de sustancias)?"
          value={data.substanceSupport}
          onChange={(val) => onChange("substanceSupport", val)}
          descValue={data.substanceSupportDesc}
          onDescChange={(val) => onChange("substanceSupportDesc", val)}
          descPlaceholder="Indica cuál apoyo o tratamiento."
        />

        {/* ✅ Mini debug opcional */}
        <div className="text-[11px] text-gray-400 bg-white/50 p-2 rounded-lg border border-purple-100">
          DEBUG medicalTreatment: {JSON.stringify(data.medicalTreatment)} | psychSupport:{" "}
          {JSON.stringify(data.psychSupport)} | substanceSupport: {JSON.stringify(data.substanceSupport)}
        </div>

        <div className="pt-4">
          <Button fullWidth onClick={onNext} disabled={!isValid}>
            Avanzar al siguiente nivel
          </Button>
        </div>
      </div>
    </LevelContainer>
  );
};
