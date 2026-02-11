// URL real de tu Google Apps Script Web App (backend)
export const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbzTBUzHtSOEIYiknHr68NrJUAZh8iP4-lH9xYhRd9Ifv4p-AfM8cswOJkYN_dTJM3fjuQ/exec';

// Variantes de animación (Framer Motion)
export const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// Transiciones globales
export const TRANSITION = {
  duration: 0.5,
  ease: 'easeInOut',
};
