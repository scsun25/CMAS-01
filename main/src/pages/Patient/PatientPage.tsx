import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../../auth/superbaseClient";
import type { Patient } from "../../types/Patient";
import PatientCreateForm from "./PatientCreateForm";
import { useForm } from "react-hook-form";

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  createdAt?: any;
}

const PatientPage: React.FC = () => {
  //Hook
  const patientAddForm = useForm();

  const [patient, setPatient] = useState<Patient>();
  const [patientList, setPatientList] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  // State and setter for form error
  const [formError, setFormError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  // State for form fields
  const [patientName, setPatientName] = useState<string>("");
  const [patientAge, setPatientAge] = useState<string>("");
  const [patientGender, setPatientGender] = useState<string>("");

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    supabase
      .from("PATIENTS")
      .select("*, PATIENT_CASES!fk_patient(*, PATIENT_CASE_DETAILS(*))")
      .then(({ data }) => {
        console.log("Patient List data", data);

        let result: Patient[] = data as Patient[];
        setPatientList(result);
      });
  }, []);

  return (
    <>
      <div className="p-2 flex ">
        <DataTable
          value={patientList}
          loading={loading}
          paginator
          rows={10}
          className="w-full"
        >
          <Column field="name" header="Name" />
          <Column field="birth" header="Birthday" />
          <Column field="gender" header="Gender" />
          <Column field="main_contact" header="Contact" />
        </DataTable>
        <Card
          className="ml-4 w-1/2"
          style={{
            display: visible ? "" : "none",
            background: "yellow",
            // width: "50%",
          }} // Hide this button
        >
          <div className="w-1/2">kjhkljhlkjh</div>
        </Card>
      </div>
      <div className="my-2 flex flex-row-reverse ...">
        <Button
          className="my-2 ml-4"
          label="Add Patient Record"
          icon="pi pi-plus"
          onClick={() => setShowModal(true)} // Call the function with an empty object
        />
        <Button
          className="my-2 ml-4"
          label="Show Sidebar"
          icon="pi pi-plus"
          onClick={() => setVisible(!visible)}
        />
      </div>
      <Dialog
        header="New Patient"
        visible={showModal}
        style={{ width: "60%" }}
        onHide={() => {
          setShowModal(false);
          setFormError("");
          patientAddForm.reset();
        }}
        modal
      >
        <PatientCreateForm useForm={patientAddForm} setVisible={setShowModal} />
      </Dialog>
    </>
  );
};

export default PatientPage;

// <div className="flex flex-col gap-3">
//   <span className="p-float-label">
//     <InputText
//       id="patient-name"
//       value={patientName}
//       onChange={(e) => setPatientName(e.target.value)}
//       className="w-full"
//     />
//     <label htmlFor="patient-name">Name</label>
//   </span>
//   <span className="p-float-label">
//     <InputText
//       id="patient-age"
//       value={patientAge}
//       onChange={(e) =>
//         setPatientAge(e.target.value.replace(/[^0-9]/g, ""))
//       }
//       className="w-full"
//       key="age-input"
//     />
//     <label htmlFor="patient-age">Age</label>
//   </span>
//   <span className="p-float-label">
//     <Dropdown
//       id="patient-gender"
//       value={patientGender}
//       options={genderOptions}
//       onChange={(e) => setPatientGender(e.value)}
//       placeholder="Select Gender"
//       className="w-full"
//     />
//     <label htmlFor="patient-gender">Gender</label>
//   </span>
//   {formError && (
//     <div className="text-red-600 text-center mt-2">{formError}</div>
//   )}
//   <div className="flex gap-2 justify-end mt-4">
//     <Button
//       label="Cancel"
//       severity="secondary"
//       onClick={() => setShowModal(false)}
//     />
//     {/* <Button label="Add" icon="pi pi-check" onClick={handleAddPatient} /> */}
//   </div>
// </div>
