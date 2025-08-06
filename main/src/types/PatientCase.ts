import type { PatientCaseDetail } from "./PatientCaseDetail";

export type PatientCase = {
  patient_id: string; //  Number(new Date()).toString()
  created_at: string; // timestamp with time zone
  case_id: string; // text
  urgency: string; // character
  remark: string; // character
  access_uid: string; // character
  PATIENT_CASE_DETAILS: PatientCaseDetail[];
};
