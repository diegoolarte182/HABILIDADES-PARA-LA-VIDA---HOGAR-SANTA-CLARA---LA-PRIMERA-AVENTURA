export enum Gender {
  FEMALE = "Femenino",
  MALE = "Masculino",
  NON_BINARY = "No binario",
  TRANSGENDER = "Transgénero",
  DESCRIBE = "Prefiero describirlo",
  PREFER_NOT_TO_SAY = "Prefiero no responder",
}

export enum FamilyContact {
  FREQUENT = "Mantengo contacto frecuente",
  OCCASIONAL = "Contacto ocasional",
  NONE = "No tengo contacto actualmente",
}

export interface FormData {
  // ✅ Level 1
  fullName: string;
  preferredName: string;
  age: string; // siempre string (importantísimo)
  gender: Gender | "";
  genderDescription: string;
  origin: string;
  familyContact: FamilyContact | "";

  // ✅ Level 2
  medicalTreatment: boolean | null;
  medicalTreatmentDesc: string;

  psychSupport: boolean | null;
  psychSupportDesc: string;

  substanceSupport: boolean | null;
  substanceSupportDesc: string;

  // ✅ Level 3
  scaleTemores: number;
  scaleEsperanzas: number;
  scaleOportunidades: number;
  scaleBienestar: number;

  // ✅ Level 4
  dream: string;
}

export const INITIAL_DATA: FormData = {
  // Level 1
  fullName: "",
  preferredName: "",
  age: "",
  gender: "",
  genderDescription: "",
  origin: "",
  familyContact: "",

  // Level 2
  medicalTreatment: null,
  medicalTreatmentDesc: "",

  psychSupport: null,
  psychSupportDesc: "",

  substanceSupport: null,
  substanceSupportDesc: "",

  // Level 3
  scaleTemores: 3,
  scaleEsperanzas: 3,
  scaleOportunidades: 3,
  scaleBienestar: 3,

  // Level 4
  dream: "",
};
