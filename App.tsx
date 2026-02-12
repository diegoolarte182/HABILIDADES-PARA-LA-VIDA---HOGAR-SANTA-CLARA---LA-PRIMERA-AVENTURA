// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

const yesNo = (v: boolean | null) => (v === true ? "Sí" : v === false ? "No" : "");
const toStrNum = (v: any) => {
  const n = Number(v);
  return Number.isNaN(n) ? "" : String(n);
};

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    const payload: Record<string, string> = {
      // Nivel 1
      nombre: data.fullName ?? "",
      nombre_preferido: data.preferredName ?? "",
      edad: data.age ?? "",
      genero: data.gender ? String(data.gender) : "",
      genero_otro: data.genderDescription ?? "",
      origen: data.origin ?? "",
      contacto_familia: data.familyContact ? String(data.familyContact) : "",

      // Nivel 2
      tratamiento_medico: yesNo(data.medicalTreatment),
      cual_medico: data.medicalTreatmentDesc ?? "",
      tratamiento_psicologico: yesNo(data.psychSupport),
      cual_psicologico: data.psychSupportDesc ?? "",
      apoyo_habitos: yesNo(data.substanceSupport),
      cual_habitos: data.substanceSupportDesc ?? "",

      // Nivel 3 (duplicado por bloque)
      temor_futuro: toStrNum(data.scaleTemores),
      inseguridad: toStrNum(data.scaleTemores),

      suenos: toStrNum(data.scaleEsperanzas),
      lograr_cosas: toStrNum(data.scaleEsperanzas),

      oportunidades: toStrNum(data.scaleOportunidades),
      aprendizaje: toStrNum(data.scaleOportunidades),

      tranquilidad: toStrNum(data.scaleBienestar),
      bienestar_personal: toStrNum(data.scaleBienestar),

      // Nivel 4 (en tu types.ts se llama dream)
      sueno: data.dream ?? "",
    };

    console.log("📤 Payload FINAL (a Sheets):", payload);

    const formBody = new URLSearchParams(payload);

    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: formBody,
    });

    return true;
  } catch (error) {
    console.error("❌ Error submitting data:", error);
    return false;
  }
};

