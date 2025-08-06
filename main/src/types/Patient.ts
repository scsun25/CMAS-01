import type { PatientCase } from "./PatientCase";

export type Patient = {
  patient_id: string; // Number(new Date()).toString()
  name: string; // character
  gender: string; // character
  birth: string; // numeric
  main_contact: string; // character

  contact1: string; // character
  contact2: string; // character
  contact3: string; // character
  created_at: string; // timestamp with time zone
  access_uid: string; // text
  last_visit: string; // time without time zone
  PATIENT_CASES: PatientCase[];
};
