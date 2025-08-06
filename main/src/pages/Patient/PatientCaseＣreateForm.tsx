import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Patient } from "../../types/Patient";
import type { PatientCase } from "../../types/PatientCase";
import "./PatientCaseTab.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format } from "date-fns";

interface PatientCaseTabProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  patient: Patient | undefined;
}

const PatientCaseTabe = ({
  visible,
  setVisible,
  patient,
}: PatientCaseTabProps) => {
  return (
    <>
      <Card
        className="ml-4 w-1/2"
        style={{
          display: visible ? "" : "none",
          background: "var(--highlight-bg)",
          border: "var(--highlight-text-color) solid 0.25rem",
          width: "50%",
        }}
      >
        <div className="flex">
          <Button
            className=" mr-auto"
            icon="pi pi-plus"
            // onClick={() => setShowModal(true)}
          />
          <Button
            text
            className="w-full"
            label={patient?.name}
            disabled
            style={{ fontSize: "1.25rem", fontWeight: 600, padding: 0 }}
          />
          <Button
            icon="pi pi-times"
            rounded
            text
            onClick={() => setVisible(false)}
          />
        </div>

        <div className="pt-5">
          <DataTable
            value={patient?.PATIENT_CASES}
            loading={false} // wait for loading state to control
            scrollable
            scrollHeight="100%"
            onRowClick={(e) => {
              console.log("Row clicked:", e.data);
              let rowPatientData = e.data as PatientCase;
              console.log("Selected case:", rowPatientData);
            }}
            rowClassName={() => "hoverable-row"}
          >
            <Column field="urgency" header="**" />
            <Column field="case_id" header="ID" />
            <Column field="remark" header="Description" />
            <Column
              field="created_at"
              header="Date"
              body={(rowData) =>
                rowData.created_at
                  ? format(new Date(rowData.created_at), "dd/MM/yyyy")
                  : ""
              }
            />
          </DataTable>
        </div>
      </Card>
    </>
  );
};

export default PatientCaseTabe;
