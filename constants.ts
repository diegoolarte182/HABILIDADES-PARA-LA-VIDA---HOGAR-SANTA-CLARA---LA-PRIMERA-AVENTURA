// Placeholder for the Google Apps Script Web App URL.
// The user needs to replace this with their deployed script URL.
export const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx_PLACEHOLDER_FOR_YOUR_SCRIPT_ID/exec'; 

export const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const TRANSITION = { duration: 0.5, ease: "easeInOut" };