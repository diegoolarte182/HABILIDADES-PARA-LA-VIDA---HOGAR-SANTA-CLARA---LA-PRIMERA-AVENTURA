// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

const pick = (...values: any[]) => {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return "";
};

const boolToSiNo = (v: any) => {
  if (v === true) return "Sí";
  if (v === false) return "No";
  return "";
};

function mapToSheetPayload(data: any) {
  return {
    // Nivel 1 (tu app usa estos nombres)
    nombre: pick(data.fullName, data.nombre, data.name),
    nombre_preferido: pick(data.preferredName, data.nombre_preferido, data.nickname),
    edad: pick(data.age, data.edad),
    genero: pick(data.gender, data.genero),
    genero_otro: pick(data.genderDescription, data.genero_otro),
    origen: pick(data.origin, data.origen),
    contacto_familia: pick(data.familyContact, data.contacto_familia),

    // ✅ Nivel 2 (mapa EXACTO desde tus campos reales)
    tratamiento_medico: pick(data.tratamiento_medico, boolToSiNo(data.medicalTreatment)),
    cual_medico: pick(data.cual_medico, data.medicalTreatmentDesc),

    tratamiento_psicologico: pick(data.tratamiento_psicologico, boolToSiNo(data.psychSupport)),
    cual_psicologico: pick(data.cual_psicologico, data.psychSupportDesc),

    apoyo_habitos: pick(data.apoyo_habitos, boolToSiNo(data.substanceSupport)),
    cual_habitos: pick(data.cual_habitos, data.substanceSupportDesc),

    // Nivel 3 (Likert) - lo afinamos cuando me pegues Level3
    temor_futuro: pick(data.temor_futuro, data.fearFuture),
    inseguridad: pick(data.inseguridad, data.insecurity),
    suenos: pick(data.suenos, data.dreams),
    lograr_cosas: pick(data.lograr_cosas, data.achieveThings),
    oportunidades: pick(data.oportunidades, data.opportunities),
    aprendizaje: pick(data.aprendizaje, data.learning),
    tranquilidad: pick(data.tranquilidad, data.calm),
    bienestar_personal: pick(data.bienestar_personal, data.personalWellbeing),

    // Nivel 4 (abierta)
    sueno: pick(data.sueno, data.dreamGoal, data.dream_goal),
  };
}

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    const payload = mapToSheetPayload(data);

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

