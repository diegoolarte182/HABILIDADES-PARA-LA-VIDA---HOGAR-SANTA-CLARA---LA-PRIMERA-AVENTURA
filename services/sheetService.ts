// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

/**
 * Mapea (traduce) las llaves del formulario a las llaves esperadas por Google Sheets / Apps Script.
 * Ajusta aquí si tus nombres en FormData son diferentes.
 */
function mapToSheetPayload(data: any) {
  return {
    // Demográficos
    nombre: data.nombre ?? data.name ?? "",
    nombre_preferido: data.nombre_preferido ?? data.nickname ?? data.nombrePreferido ?? "",
    edad: data.edad ?? data.age ?? "",
    genero: data.genero ?? data.gender ?? "",
    genero_otro: data.genero_otro ?? data.gender_other ?? data.generoOtro ?? "",
    origen: data.origen ?? data.origin ?? "",
    contacto_familia: data.contacto_familia ?? data.family_contact ?? data.contactoFamilia ?? "",

    // Nivel 2 (Sí/No + cuál)
    tratamiento_medico: data.tratamiento_medico ?? data.medical_treatment ?? data.tratamientoMedico ?? "",
    cual_medico: data.cual_medico ?? data.which_medical ?? data.cualMedico ?? "",
    tratamiento_psicologico: data.tratamiento_psicologico ?? data.psychological_treatment ?? data.tratamientoPsicologico ?? "",
    cual_psicologico: data.cual_psicologico ?? data.which_psychological ?? data.cualPsicologico ?? "",
    apoyo_habitos: data.apoyo_habitos ?? data.habits_support ?? data.apoyoHabitos ?? "",
    cual_habitos: data.cual_habitos ?? data.which_habits ?? data.cualHabitos ?? "",

    // Likert (1–5)
    temor_futuro: data.temor_futuro ?? data.fear_future ?? "",
    inseguridad: data.inseguridad ?? data.insecurity ?? "",
    suenos: data.suenos ?? data.dreams ?? "",
    lograr_cosas: data.lograr_cosas ?? data.achieve ?? "",
    oportunidades: data.oportunidades ?? data.opportunities ?? "",
    aprendizaje: data.aprendizaje ?? data.learning ?? "",
    tranquilidad: data.tranquilidad ?? data.calm ?? "",
    bienestar_personal: data.bienestar_personal ?? data.personal_wellbeing ?? "",
  };
}

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    const payload = mapToSheetPayload(data);

    // (para debug) puedes ver qué va a mandar
    console.log("PAYLOAD FINAL A SHEET:", payload);

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

