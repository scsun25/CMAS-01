import { useEffect, useState } from "react";
import AppCalendar from "./AppCalendar";
import { supabase } from "../../auth/superbaseClient";
import { useAuth } from "../../context/authProvider";

const AppointmentPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    supabase
      .from("PATIENT_CASES")
      .select("*")
      .then(({ data }) => {
        console.log("Patient List", data);
        console.log("Current user id:", user?.id);
      });
  }, []);

  return (
    <>
      <AppCalendar />
    </>
  );
};

export default AppointmentPage;
