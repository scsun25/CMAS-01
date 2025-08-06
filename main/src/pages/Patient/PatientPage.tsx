import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";

import { useEffect, useState } from "react";
import { supabase } from "../../auth/superbaseClient";
import type { Patient } from "../../types/Patient";
import PatientCreateForm from "./PatientCreateForm";
import { useForm } from "react-hook-form";
import PatientCaseTabe from "./PatientCaseTab";
import "./PatientPage.css";

const PatientPage: React.FC = () => {
  //Hook
  const patientAddForm = useForm();

  const [patient, setPatient] = useState<Patient>();
  const [patientList, setPatientList] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(7);
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
      <div className="p-2 flex flex-col" style={{ height: "80vh" }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="mt-3 mb-4 flex flex-row">
            <Button
              className="my-2 ml-4"
              label="Patient"
              icon="pi pi-plus"
              onClick={() => setShowModal(true)}
            />
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DataTable
              value={patientList.slice(first, first + rows)}
              loading={loading}
              className="w-full h-full"
              scrollable
              scrollHeight="100%"
              onRowClick={(e) => {
                let rowPatientData = e.data as Patient;
                setPatient(rowPatientData);
                setVisible(true);
              }}
              rowClassName={() => "hoverable-row"}
            >
              <Column field="name" header="Name" />
              <Column field="main_contact" header="Contact" />
              <Column field="birth" header="Birthday" />
              <Column field="gender" header="Gender" />
            </DataTable>
          </div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={patientList.length}
            rowsPerPageOptions={[7, 10, 20, 50]}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
            className="mt-2"
          />
        </div>
        <PatientCaseTabe
          visible={visible}
          patient={patient}
          setVisible={setVisible}
        />
      </div>

      {/* Modal for adding new patient */}
      <Dialog
        header="New Patient"
        visible={showModal}
        style={{ width: "60%" }}
        onHide={() => {
          setShowModal(false);
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
