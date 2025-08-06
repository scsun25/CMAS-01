import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import type { Patient } from "../../types/Patient";
import { supabase } from "../../auth/superbaseClient";

type PatientCreateFormProps = {
  useForm: any;
  setVisible: any;
};

const PatientCreateForm = ({ useForm, setVisible }: PatientCreateFormProps) => {
  const { register, handleSubmit, reset } = useForm;
  //   const [submitData, setSubmitData] = useState<Patient>();

  const [date, setDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>();

  const categoryOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer not to say", value: "N/A" },
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB"); // "en-GB" 會輸出 dd/mm/yyyy
  };

  const handleAddPatient = async (input: Patient) => {
    console.log("Adding patient...", input, Number(new Date()).toString());

    await supabase
      .from("PATIENTS")
      .insert([
        {
          patient_id: Number(new Date()).toString(),
          name: input.name,
          birth: formatDate(date), // 直接用 state 的 date
          gender: gender,
          main_contact: input.main_contact,
        },
      ])
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error adding patient:", error);
          return;
        }
        setVisible(false);
        reset();
        // Reset form fields after successful submission
      });
  };

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log("Input data:", data);
        let input = data as Patient;
        ((input.patient_id = Number(new Date()).toString()),
          handleAddPatient(input));
      })}
      className="std-layout"
    >
      <InputText
        id="name"
        placeholder="Name"
        {...register("name", { required: true })}
        className="my-2 w-full"
      />
      <Calendar
        placeholder="Birthday"
        className="pure my-2 w-full"
        value={date}
        onChange={(e) => setDate(e.value ?? null)}
        dateFormat="dd/mm/yy"
        showIcon
      />
      <Dropdown
        value={gender}
        id="gender"
        options={categoryOptions}
        optionLabel="label"
        placeholder="Gender"
        className="pure my-2 w-full"
        {...register("gender", { required: true })}
        onChange={(e) => setGender(e.value)}
      />
      <InputTextarea
        id="contact"
        placeholder="Main Contact"
        {...register("main_contact", { required: true })}
        className="pure w-full"
        rows={3}
        maxLength={100}
      />
      <Button type="submit" label="Submit" className="w-full" />
    </form>
  );
};

export default PatientCreateForm;
