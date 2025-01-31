import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton/CustomButton';

type FormValues = {
  fantasyName: string;
  document: string;
  administratorName: string;
  email: string;
};

type OrganizationScreenFormProps = {
  setStep: (step: string) => void;
};

const organizationSchema = Yup.object().shape({
  fantasyName: Yup.string()
    .required('Fantasy Name is required')
    .min(3, 'Fantasy Name must be at least 3 characters long'),
  document: Yup.string()
    .required('Document is required')
    .matches(/^\d{11}$|^\d{14}$/, 'Document must be a valid CPF (11 digits) or CNPJ (14 digits)'),
  administratorName: Yup.string()
    .required('Administrator Name is required')
    .min(3, 'Administrator Name must be at least 3 characters long'),
  email: Yup.string().required('Email is required').email('Invalid email address'),
});

const OrganizationScreenForm: React.FC<OrganizationScreenFormProps> = ({ setStep }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      fantasyName: '',
      document: '',
      administratorName: '',
      email: '',
    },
    validationSchema: organizationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Fantasy Name Field */}
      <div className="flex flex-col">
        <InputText
          id="fantasyName"
          name="fantasyName"
          placeholder='Nome Fantasia'
          value={formik.values.fantasyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.fantasyName && formik.errors.fantasyName ? 'p-invalid  p-2 border rounded' : 'p-2 border rounded'}
        />
        {formik.touched.fantasyName && formik.errors.fantasyName && (
          <small className="text-red-500">{formik.errors.fantasyName}</small>
        )}
      </div>

      {/* Document Field */}
      <div className="flex flex-col">
        <InputText
          id="document"
          name="document"
          placeholder='CNPJ ou CPF'
          value={formik.values.document}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.document && formik.errors.document ? 'p-invalid  p-2 border rounded' : 'p-2 border rounded'}
        />
        {formik.touched.document && formik.errors.document && (
          <small className="text-red-500">{formik.errors.document}</small>
        )}
      </div>

      {/* Administrator Name Field */}
      <div className="flex flex-col">
        <InputText
          placeholder='CNPJ ou CPF'
          id="administratorName"
          name="administratorName"
          value={formik.values.administratorName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.administratorName && formik.errors.administratorName ? 'p-invalid p-2 border rounded' : ' p-2 border rounded'}
        />
        {formik.touched.administratorName && formik.errors.administratorName && (
          <small className="text-red-500">{formik.errors.administratorName}</small>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col">
        <InputText
          id="email"
          name="email"
          placeholder='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.email && formik.errors.email ? 'p-invalid  p-2 border rounded' : 'p-2 border rounded'}
        />
        {formik.touched.email && formik.errors.email && (
          <small className="text-red-500">{formik.errors.email}</small>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <CustomButton label="Submit" type="submit" className="bg-[#05539D] text-white" />
        <CustomButton label="Voltar" onClick={() => setStep('PRODUCT_SCREEN')} className="text-[#05539D] hover:bg-gray-100" />
      </div>
    </form>
  );
};

export default OrganizationScreenForm;