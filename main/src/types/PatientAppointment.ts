export interface PatientAppointment {
  appointment_id: string;
  patient_id: string;
  title: string;
  description: string;
  urgency: string;
  start_time: string; // ISO string
  end_time: string; // ISO string
  created_at: string; // ISO string
  updated_at?: string; // ISO string, optional
  status: "scheduled" | "completed" | "cancelled";
  location?: string;
  doctor?: string;
  notes?: string;
}
