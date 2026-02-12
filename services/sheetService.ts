// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

const yesNo = (v: boolean | null) => (v === true ? "Sí" : v === false ? "No" : "");

const toNum = (v: any) => {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  return Number.isNaN(n) ? "" : n;
};

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    const payload = {
      // Nivel 1 (FormData real)
      nombre: data.fullName || "",
      nombre_preferido: data.preferredName || "",
      edad: data.age || "",
      genero: data.gender || "",
      genero_otro: data.genderDescription || "",
      origen: data.origin || "",
      contacto_familia: data.familyContact || "",

      // Nivel 2 (FormData real)
      tratamiento_medico: yesNo(data.medicalTreatment),
      cual_medico: data.medicalTreatmentDesc || "",
      tratamiento_psicologico: yesNo(data.psychSupport),
      cual_psicologico: data.psychSupportDesc || "",
      apoyo_habitos: yesNo(data.substanceSupport),
      cual_habitos: data.substanceSupportDesc || "",

      // Nivel 3 (duplicamos cada escala para las 2 columnas del bloque)
      temor_futuro: toNum(data.scaleTemores),
      inseguridad: toNum(data.scaleTemores),

      suenos: toNum(data.scaleEsperanzas),
      lograr_cosas: toNum(data.scaleEsperanzas),

      oportunidades: toNum(data.scaleOportunidades),
      aprendizaje: toNum(data.scaleOportunidades),

      tranquilidad: toNum(data.scaleBienestar),
      bienestar_personal: toNum(data.scaleBienestar),

      // Nivel 4 (en tu types.ts se llama dream)
      sueno: data.dream || "",
    };

    // Debug (opcional)
    console.log("📤 Payload a Sheets (ES):", payload);

    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error("Error submitting data to Google Sheet:", error);
    return false;
  }
};



