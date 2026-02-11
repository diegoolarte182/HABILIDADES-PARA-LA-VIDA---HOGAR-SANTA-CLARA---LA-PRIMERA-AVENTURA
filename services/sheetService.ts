// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

function pick(...values: any[]) {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return "";
}

function mapToSheet(data: any) {
  return {
    nombre: pick(data.nombre, data.name),
    nombre_preferido: pick(data.nombre_preferido, data.nombrePreferido, data.nickname),
    edad: pick(data.edad, data.age),
    genero: pick(data.genero, data.gender),
    genero_otro: pick(data.genero_otro, data.generoOtro, data.gender_other),

    origen: pick(data.origen, data.origin),
    contacto_familia: pick(data.contacto_familia, data.contactoFamilia, data.family_contact),

    tratamiento_medico: pick(data.tratamiento_medico, data.tratamientoMedico, data.medical_treatment),
    cual_medico: pick(data.cual_medico, data.cualMedico, data.which_medical),

    tratamiento_psicologico: pick(data.tratamiento_psicologico, data.tratamientoPsicologico, data.psychological_treatment),
    cual_psicologico: pick(data.cual_psicologico, data.cualPsicologico, data.which_psychological),

    apoyo_habitos: pick(data.apoyo_habitos, data.apoyoHabitos, data.habits_support),
    cual_habitos: pick(data.cual_habitos, data.cualHabitos, data.which_habits),

    temor_futuro: pick(data.temor_futuro, data.fear_future),
    inseguridad: pick(data.inseguridad, data.insecurity),
    suenos: pick(data.suenos, data.dreams),
    lograr_cosas: pick(data.lograr_cosas, data.achieve),
    oportunidades: pick(data.oportunidades, data.opportunities),
    aprendizaje: pick(data.aprendizaje, data.learning),
    tranquilidad: pick(data.tranquilidad, data.calm),
    bienestar_personal: pick(data.bienestar_personal, data.personal_wellbeing),

    sueno: pick(data.sueno, data.dream_goal, data.dream),
  };
}

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    const payload = mapToSheet(data);

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


