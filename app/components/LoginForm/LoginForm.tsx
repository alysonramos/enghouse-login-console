'use client';

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton/CustomButton';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Nome de usuário ou e-mail é obrigatório')
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
  isSubmitting: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Nome de usuário ou e-mail
        </label>
        <InputText
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full ${formik.touched.username && formik.errors.username ? 'p-invalid' : ''}`}
          aria-describedby="username-error"
          pt={{
            root: { 
              className: 'w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
            }
          }}
        />
        {formik.touched.username && formik.errors.username && (
          <small id="username-error" className="text-red-500">
            {formik.errors.username}
          </small>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Senha
        </label>
        <InputText
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full ${formik.touched.password && formik.errors.password ? 'p-invalid' : ''}`}
          aria-describedby="password-error"
          pt={{
            root: { 
              className: 'w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
            }
          }}
        />
        {formik.touched.password && formik.errors.password && (
          <small id="password-error" className="text-red-500">
            {formik.errors.password}
          </small>
        )}
        <a href="#" className="text-sm text-end text-blue-600 hover:underline mt-2 block">
          Esqueceu sua senha?
        </a>
      </div>

      <CustomButton
        label={isSubmitting ? 'Enviando...' : 'Entrar'}
        onClick={formik.handleSubmit}
        className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        disabled={isSubmitting || !formik.isValid}
        icon={isSubmitting ? 'pi pi-spinner pi-spin' : undefined}
      />

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-3 shrink-0 text-sm text-gray-500">Ou faça login com</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="space-y-4">
        <CustomButton
          label="Continuar com Enghouse SSO"
          icon="pi pi-key"
          className="text-[#05539D] hover:bg-gray-50"
          onClick={() => {console.log('SSO click')}}
        />
        <CustomButton
          label="Continuar com Microsoft"
          icon="pi pi-microsoft"
          className="text-[#05539D] hover:bg-gray-50"
          onClick={() => {console.log('Microsoft click')}}
        />
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <a href="#" className="text-sm text-gray-600 hover:text-gray-800 flex">
          <i className="pi pi-question-circle my-auto mx-2"></i> 
          <p className='my-auto'>Ajuda</p>
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-gray-800 flex">
          <i className="pi pi-shield my-auto mx-2"></i> 
          <p className="">Privacidade</p>
        </a>
      </div>
    </form>
  );
};