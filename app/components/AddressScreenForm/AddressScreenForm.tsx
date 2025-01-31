import axios from "axios";
import { City, Country, State } from "country-state-city";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CustomButton } from "../CustomButton/CustomButton";

type AddressFormProps = {
  setStep: (step: string) => void;
};

const AddressScreenForm: React.FC<AddressFormProps> = ({ setStep }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);


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
      setStep("ENTERPRISE");
    },
  });


  const handlePostalCodeBlur = async () => {
    if (selectedCountry?.isoCode === "BR" && formik.values.postalCode) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${formik.values.postalCode}/json/`
        );
        const { logradouro } = response.data;

        formik.setFieldValue("street", logradouro || "");
        } catch (error) {
          console.error("Error fetching postal code data:", error);
        } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <p className="font-semibold">Endereço</p>
      <div className="flex">
      <Dropdown
        value={selectedCountry}
        options={Country.getAllCountries()}
        optionLabel="name"
        placeholder="País"
        onChange={(e) => setSelectedCountry(e.value)}
        filter
        showClear
        className="w-5/12 mr-auto border"
      />
      <Dropdown
        value={selectedState}
        options={State?.getStatesOfCountry(selectedCountry?.isoCode) || []}
        optionLabel="name"
        placeholder="Estado"
        onChange={(e) => setSelectedState(e.value)}
        filter
        showClear
        disabled={!selectedCountry}
        className="w-7/12 ml-auto border"
      />
      </div>
      <div className="flex">
        <Dropdown
          value={selectedCity}
          options={City.getCitiesOfState(selectedState?.countryCode, selectedState?.isoCode) || []}
          optionLabel="name"
          placeholder="Cidade"
          onChange={(e) => setSelectedCity(e.value)}
          filter
          showClear
          disabled={!selectedState}
          className="w-7/12 mr-auto border"
        />

        <div className="w-4/12 flex flex-col">
          <InputText
            id="number"
            name="number"
            type="text"
            placeholder="Número"
            className="w-full p-2 border rounded"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.number && formik.errors.number ? (
            <div className="text-red-500 text-sm">{formik.errors.number}</div>
          ) : null}
        </div>

      </div>

      <div className="w-full">
          <InputText
            disabled={isLoading}
            id="postalCode"
            name="postalCode"
            type="text"
            placeholder="Código Postal"
            className="w-full p-2 border rounded"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={handlePostalCodeBlur}
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="text-red-500 text-sm">{formik.errors.postalCode}</div>
          ) : null}
      </div>

      <div>
        <InputText
          id="street"
          name="street"
          type="text"
          placeholder="Logradouro"
          className="w-full p-2 border rounded"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.street && formik.errors.street ? (
          <div className="text-red-500 text-sm">{formik.errors.street}</div>
        ) : null}
      </div>

      <CustomButton
          label="Salvar"
          onClick={() => setStep('ENTERPRISE')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
            label="Voltar"
            onClick={() => setStep('PRODUCT_SCREEN')}
            className="text-[#05539D] hover:bg-gray-100"
        />
    </form>
  );
};

export default AddressScreenForm;
