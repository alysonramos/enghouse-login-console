import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { CustomButton } from "../CustomButton/CustomButton";

type AddressFormProps = {
  setStep: (step: string) => void;
};

const AddressScreenForm: React.FC<AddressFormProps> = ({ setStep }) => {
  const [isBrazil, setIsBrazil] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setIsBrazil(selectedCountry === "Brazil");
    formik.setFieldValue("country", selectedCountry);

    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("postalCode", "");
    formik.setFieldValue("street", "");
  };

  const handlePostalCodeBlur = async () => {
    if (isBrazil && formik.values.postalCode) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${formik.values.postalCode}/json/`
        );
        const { logradouro, localidade, uf } = response.data;

        formik.setFieldValue("street", logradouro || "");
        formik.setFieldValue("city", localidade || "");
        formik.setFieldValue("state", uf || "");
        } catch (error) {
          console.error("Error fetching postal code data:", error);
        } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
        <CustomButton
            label="Voltar"
            onClick={() => setStep('PRODUCT_SCREEN')}
            className="text-[#05539D] hover:bg-gray-100"
        />
    </form>
  );
};

export default AddressScreenForm;
