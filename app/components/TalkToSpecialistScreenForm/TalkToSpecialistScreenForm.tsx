import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import * as Yup from "yup";
import { CustomButton } from "../CustomButton/CustomButton";

type TalkToSpecialistScreenFormProps = {
  setStep: (step: string) => void;
};

const TalkToSpecialistScreenForm: React.FC<TalkToSpecialistScreenFormProps> = ({ setStep }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "Gestão de Consumo", value: "gestao_consumo" },
    { label: "Gestão de Notebook", value: "gestao_notebook" },
    { label: "Gestão de Aparelhos (MDM)", value: "gestao_aparelhos" },
    { label: "Gestão de TI e Telecom (TEM)", value: "gestao_ti_telecom" },
    { label: "Gestão de Browser", value: "gestao_browser" },
    { label: "Gestão de Bloqueio de Chip", value: "gestao_bloqueio_chip" }
  ];

  const formik = useFormik({
    initialValues: {
      country: "",
      state: "",
      city: "",
      postalCode: "",
      street: "",
      number: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      postalCode: Yup.string()
        .required("Postal code is required")
        .matches(/^\d{5}-?\d{3}$/, "Invalid CEP format (00000-000)"),
      street: Yup.string().required("Street is required"),
      number: Yup.string().required("Number is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      setStep('PRODUCT_SCREEN');
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
        <p className="font-semibold">Fale com um especialista</p>
        <Dropdown
            value={selectedOption}
            options={options}
            onChange={(e) => setSelectedOption(e.value)}
            placeholder="Escolha uma opção"
            className="border border-[#05539D] w-full text-[#05539D]"
        />
        <InputTextarea
            className="w-full h-100 border border-[#05539D] text-[#05539D] p-5 h-[200px]"
        >
        </InputTextarea>
        <CustomButton
            label="Voltar"
            onClick={() => setStep('PRODUCT_SCREEN')}
            className="text-[#05539D] hover:bg-gray-100"
        />
    </form>
  );
};

export default TalkToSpecialistScreenForm;
