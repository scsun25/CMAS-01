import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  createdAt?: any;
}

const PatientPage: React.FC = () => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(false);
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

  const handleAddPatient = async () => {
    console.log("Adding patient...");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="max-w-2xl w-full mx-auto shadow-2xl border border-gray-200 rounded-xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
        <DataTable
          value={patients}
          loading={loading}
          paginator
          rows={10}
          className="w-full"
        >
          <Column field="name" header="Name" />
          <Column field="age" header="Age" />
          <Column field="gender" header="Gender" />
          <Column
            field="createdAt"
            header="Created At"
            body={(rowData) =>
              rowData.createdAt
                ? new Date(rowData.createdAt.seconds * 1000).toLocaleString()
                : ""
            }
          />
        </DataTable>
      </Card>
      <Button
        label="Add Patient Record"
        icon="pi pi-plus"
        onClick={() => setShowModal(true)}
      />

      <Dialog
        header="Add Patient Record"
        visible={showModal}
        style={{ width: "400px" }}
        onHide={() => {
          setShowModal(false);
          setFormError("");
        }}
        modal
      >
        <div className="flex flex-col gap-3">
          <span className="p-float-label">
            <InputText
              id="patient-name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full"
            />
            <label htmlFor="patient-name">Name</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="patient-age"
              value={patientAge}
              onChange={(e) =>
                setPatientAge(e.target.value.replace(/[^0-9]/g, ""))
              }
              className="w-full"
              key="age-input"
            />
            <label htmlFor="patient-age">Age</label>
          </span>
          <span className="p-float-label">
            <Dropdown
              id="patient-gender"
              value={patientGender}
              options={genderOptions}
              onChange={(e) => setPatientGender(e.value)}
              placeholder="Select Gender"
              className="w-full"
            />
            <label htmlFor="patient-gender">Gender</label>
          </span>
          {formError && (
            <div className="text-red-600 text-center mt-2">{formError}</div>
          )}
          <div className="flex gap-2 justify-end mt-4">
            <Button
              label="Cancel"
              severity="secondary"
              onClick={() => setShowModal(false)}
            />
            <Button label="Add" icon="pi pi-check" onClick={handleAddPatient} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PatientPage;
