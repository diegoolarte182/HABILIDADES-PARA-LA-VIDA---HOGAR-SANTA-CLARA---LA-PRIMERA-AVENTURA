import { FormData } from '../types';
import { GOOGLE_SHEET_URL } from '../constants';

export const submitDataToSheet = async (data: FormData): Promise<boolean> => {
  try {
    // Note: Google Apps Script Web Apps often require 'no-cors' mode if simply firing and forgetting,
    // or handling JSONP. However, adhering strictly to the prompt:
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    // In a real CORS scenario with simple POST to Apps Script, the response might be opaque.
    // We assume success if no network error occurred, or handle the specific response if CORS allows.
    return response.ok;
  } catch (error) {
    console.error("Error submitting data", error);
    // For the sake of the demo, we might want to return true to show the success screen
    // if the URL is just a placeholder, but in prod, return false.
    return false;
  }
};