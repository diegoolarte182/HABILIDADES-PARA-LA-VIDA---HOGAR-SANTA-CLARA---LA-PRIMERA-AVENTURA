import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

const yesNo = (v: boolean | null) => (v === true ? "Sí" : v === false ? "No" : "");
const num = (v: any) => (v === null || v === undefined ? "" : String(v));

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    const payload: Record<string, string> = {
      nombre: data.fullName || "",
      nombre_preferido: data.preferredName || "",
      edad: data.age || "",
      genero: data.gender ? String(data.gender) : "",
      genero_otro: data.genderDescription || "",
      origen: data.origin || "",
      contacto_familia: data.familyContact ? String(data.familyContact) : "",

      tratamiento_medico: yesNo(data.medicalTreatment),
      cual_medico: data.medicalTreatmentDesc || "",
      tratamiento_psicologico: yesNo(data.psychSupport),
      cual_psicologico: data.psychSupportDesc || "",
      apoyo_habitos: yesNo(data.substanceSupport),
      cual_habitos: data.substanceSupportDesc || "",

      // Level 3 (duplicado por bloque como definiste columnas)
      temor_futuro: num(data.scaleTemores),
      inseguridad: num(data.scaleTemores),
      suenos: num(data.scaleEsperanzas),
      lograr_cosas: num(data.scaleEsperanzas),
      oportunidades: num(data.scaleOportunidades),
      aprendizaje: num(data.scaleOportunidades),
      tranquilidad: num(data.scaleBienestar),
      bienestar_personal: num(data.scaleBienestar),

      sueno: data.dream || "",
    };

    console.log("📤 Enviando a Sheets:", payload);

    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(payload),
    });

    return true;
  } catch (err) {
    console.error("❌ submitDataToSheet error:", err);
    return false;
  }
};



