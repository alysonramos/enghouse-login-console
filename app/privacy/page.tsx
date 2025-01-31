'use client'
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

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
      <div>
        <label htmlFor="country">País</label>
        <select
          id="country"
          name="country"
          className="w-full p-2 border rounded"
          value={formik.values.country}
          onChange={handleCountryChange}
        >
          <option value="">Selecione um país</option>
          <option value="Brazil">Brasil</option>
          <option value="United States">Estados Unidos</option>
        </select>
        {formik.touched.country && formik.errors.country ? (
          <div className="text-red-500 text-sm">{formik.errors.country}</div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="state">Estado</label>
          <input
            disabled={isLoading}
            id="state"
            name="state"
            type="text"
            className="w-full p-2 border rounded"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="text-red-500 text-sm">{formik.errors.state}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="city">Cidade</label>
          <input
            disabled={isLoading}
            id="city"
            name="city"
            type="text"
            className="w-full p-2 border rounded"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalCode">Código Postal (CEP)</label>
          <input
            disabled={isLoading}
            id="postalCode"
            name="postalCode"
            type="text"
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
          <label htmlFor="number">Número</label>
          <input
            id="number"
            name="number"
            type="text"
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

      <div>
        <label htmlFor="street">Logradouro</label>
        <input
          id="street"
          name="street"
          type="text"
          className="w-full p-2 border rounded"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.street && formik.errors.street ? (
          <div className="text-red-500 text-sm">{formik.errors.street}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
        <button
            label="Voltar"
            onClick={() => setStep('PRODUCT_SCREEN')}
            className="text-[#05539D] hover:bg-gray-100"
        />
    </form>
  );
};

export default AddressScreenForm;
