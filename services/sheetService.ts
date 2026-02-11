// services/sheetService.ts
import { FormData } from "../types";
import { GOOGLE_SHEET_URL } from "../constants";

/**
 * Envía los datos a Google Sheets usando un Apps Script Web App.
 * Usamos mode:"no-cors" para evitar bloqueos típicos de CORS en el navegador.
 * Nota: con "no-cors" no podemos leer la respuesta del servidor; si no hay error de red,
 * asumimos que el envío fue exitoso.
 */
export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Si no hubo error de red, asumimos éxito
    return true;
  } catch (error) {
    console.error("Error submitting data to Google Sheet:", error);
    return false;
  }
};
