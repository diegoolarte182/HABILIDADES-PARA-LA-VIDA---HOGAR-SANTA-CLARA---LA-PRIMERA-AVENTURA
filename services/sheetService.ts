// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

const yesNo = (v: boolean | null) => (v === true ? "Sí" : v === false ? "No" : "");

const toNum = (v: any) => {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  return Number.isNaN(n) ? "" : String(n);
};

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    // Payload con las MISMAS llaves de tus columnas (español)
    const payload: Record<string, string> = {
      // Nivel 1
      nombre: data.fullName || "",
      nombre_preferido: data.preferredName || "",
      edad: data.age || "",
      genero: data.gender ? String(data.gender) : "",
      genero_otro: data.genderDescription || "",
      origen: data.origin || "",
      contacto_familia: data.familyContact ? String(data.familyContact) : "",

      // Nivel 2
      tratamiento_medico: yesNo(data.medicalTreatment),
      cual_medico: data.medicalTreatmentDesc || "",
      tratamiento_psicologico: yesNo(data.psychSupport),
      cual_psicologico: data.psychSupportDesc || "",
      apoyo_habitos: yesNo(data.substanceSupport),
      cual_habitos: data.substanceSupportDesc || "",

      // Nivel 3 (duplicamos escalas para 2 columnas por bloque)
      temor_futuro: toNum(data.scaleTemores),
      inseguridad: toNum(data.scaleTemores),

      suenos: toNum(data.scaleEsperanzas),
      lograr_cosas: toNum(data.scaleEsperanzas),

      oportunidades: toNum(data.scaleOportunidades),
      aprendizaje: toNum(data.scaleOportunidades),

      tranquilidad: toNum(data.scaleBienestar),
      bienestar_personal: toNum(data.scaleBienestar),

      // Nivel 4 (types.ts usa dream)
      sueno: data.dream || "",
    };

    // ✅ Enviar como FORM (no JSON) => Apps Script lo lee en e.parameter
    const formBody = new URLSearchParams(payload);

    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: formBody,
      // NO pongas headers: el browser decide el Content-Type correctamente
    });

    return true;
  } catch (error) {
    console.error("Error submitting data to Google Sheet:", error);
    return false;
  }
};


