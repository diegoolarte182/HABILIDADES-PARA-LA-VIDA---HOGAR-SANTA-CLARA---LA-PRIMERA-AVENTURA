// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

const pick = (...values: any[]) => {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
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

    // Nivel 2 (dejo varios alias por si tu app usa otros nombres)
    tratamiento_medico: pick(data.tratamiento_medico, data.medicalTreatment, data.medical_treatment),
    cual_medico: pick(data.cual_medico, data.whichMedical, data.medicalTreatmentWhich),
    tratamiento_psicologico: pick(data.tratamiento_psicologico, data.psychTreatment, data.psychological_treatment),
    cual_psicologico: pick(data.cual_psicologico, data.whichPsych, data.psychTreatmentWhich),
    apoyo_habitos: pick(data.apoyo_habitos, data.habitsSupport, data.habits_support),
    cual_habitos: pick(data.cual_habitos, data.whichHabits, data.habitsSupportWhich),

    // Nivel 3 (Likert)
    temor_futuro: pick(data.temor_futuro, data.fearFuture, data.fear_future),
    inseguridad: pick(data.inseguridad, data.insecurity),
    suenos: pick(data.suenos, data.dreams),
    lograr_cosas: pick(data.lograr_cosas, data.achieveThings, data.achieve_things),
    oportunidades: pick(data.oportunidades, data.opportunities),
    aprendizaje: pick(data.aprendizaje, data.learning),
    tranquilidad: pick(data.tranquilidad, data.calm),
    bienestar_personal: pick(data.bienestar_personal, data.personalWellbeing, data.personal_wellbeing),

    // Nivel 4 (sueño abierto)
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
