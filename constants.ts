// constants.ts

export const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxqJiKOoYKMDn2yW1mWLqVy9to4gN8hqSxiyTH2j9eJtapFaAWB6nUethah58-cxtg1/exec";

export const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const TRANSITION = {
  duration: 0.5,
  ease: "easeInOut"
};
