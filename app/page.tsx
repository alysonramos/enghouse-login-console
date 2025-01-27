"use client";
import { useFormik } from 'formik';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import InitialScreenPhoto from '../public/images/initial-screen.webp';
import Logo from '../public/images/logo.png';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Nome de usuário ou e-mail é obrigatório')
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const CustomButton = ({ label, onClick, className = '', icon, severity = 'primary' }) => (
  <Button
    label={label}
    onClick={onClick}
    className={`w-full justify-center p-3 ${className} rounded-md`}
    severity={severity}
    icon={icon}
    pt={{
      root: { className: 'border border-[#05539D]' },
    }}
  />
);

const PRODUCT_SCREEN = ({ setStep }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cards = [
    { id: 1, title: 'Navita EMM', content: 'Gestor de Dispositivos Móveis Android e IOS. Controle, aplique politicas e distribua aplicativos remotamente' },
    { id: 2, title: 'Navita 360', content: 'Solução de gestão e controle de custos para economizar dinheiro, aumentar a eficiência e impulsinar o sucesso' },
    { id: 3, title: 'Produto 3', content: 'Produto 3 Descrição', isBlocked: true },
  ];

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flex flex-col space-y-4">
      <small className="text-center mb-4">Bem-vindo Guilherme a Navita, este é seu menu de produtos.
      Escolha abaixo qual produto você deseja acessar ou acesse sua conta para configurar.</small>

      <div className="relative flex items-center justify-center p-5">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-30 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <ChevronLeft />
        </button>

        <div className="flex overflow-hidden w-[600px] h-[300px] relative cursor-pointer">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`h-[75%] absolute w-[180px] p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between ${
                index === currentCardIndex
                  ? 'left-1/2 transform -translate-x-1/2 scale-105 z-20'
                  : index === (currentCardIndex + 1) % cards.length
                  ? 'left-3/4 transform -translate-x-1/2 scale-95 z-10 opacity-80 filter blur-[2px]'
                  : index === (currentCardIndex - 1 + cards.length) % cards.length
                  ? 'left-1/4 transform -translate-x-1/2 scale-95 z-10 opacity-80 filter blur-[2px]'
                  : 'hidden'
              }`}
            >
              <h3 className="text-md font-semibold mb-2">{card.title}</h3>
              <small className="text-sm text-gray-600 mt-5">{card.content}</small>
              {card.isBlocked && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <small className="text-gray-700 mx-3">Pagamento necessário para acessar</small>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-4 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-8">
        <CustomButton
          label="Acessar minha empresa"
          onClick={() => setStep('ENTERPRISE')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Sair"
          onClick={() => setStep('LOGIN')}
          className="text-[#05539D] hover:bg-gray-100"
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actualStep, setStep] = useState('LOGIN');
  const toast = useRef<Toast>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Login values:', values);
        toast.current?.show({
          severity: 'success',
          summary: `Bem-vindo, ${values.username}!`,
          life: 3000,
        });
      } catch (error) {
        toast.current?.show({
          severity: 'error',
          summary: 'Ocorreu um erro ao fazer login. Tente novamente.',
          life: 3000,
        });
      } finally {
        setIsSubmitting(false);
        setStep('PRODUCT_SCREEN');
      }
    },
  });

  const STEP_COMPONENTS = {
    LOGIN: (
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
          />
          <CustomButton
            label="Continuar com Microsoft"
            icon="pi pi-microsoft"
            className="text-[#05539D] hover:bg-gray-50"
          />
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
            Ajuda
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
            Privacidade
          </a>
        </div>
      </form>
    ),
    PRODUCT_SCREEN: <PRODUCT_SCREEN setStep={setStep}/>,
    ENTERPRISE: (
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Empresa</h2>
        <p className="text-semibold text-center">Selecione uma das opções abaixo</p>
        <CustomButton
          label="Dados Organizacionais"
          onClick={() => setStep('ORGANIZATION')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Endereço"
          onClick={() => setStep('ADDRESS')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Controle de Contas"
          onClick={() => setStep('ACCOUNT_MANAGER')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Voltar"
          onClick={() => setStep('PRODUCT_SCREEN')}
          className="text-[#05539D] hover:bg-gray-100"
        />
      </div>
    ),
    ORGANIZATION: (
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Dados Organizacionais</h2>
        <CustomButton
          label="Salvar"
          onClick={() => alert('Dados salvos!')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Voltar"
          onClick={() => setStep('ENTERPRISE')}
          className="text-[#05539D] hover:bg-gray-100"
        />
      </div>
    ),
    ADDRESS: (
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Endereço</h2>
        <CustomButton
          label="Salvar"
          onClick={() => alert('Endereço salvo!')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Voltar"
          onClick={() => setStep('ENTERPRISE')}
          className="text-[#05539D] hover:bg-gray-100"
        />
      </div>
    ),
    ACCOUNT_MANAGER: (
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Controle de Contas</h2>
        <CustomButton
          label="Salvar"
          onClick={() => alert('Conta salva!')}
          className="bg-[#05539D] hover:bg-[#1e5991] text-white"
        />
        <CustomButton
          label="Voltar"
          onClick={() => setStep('ENTERPRISE')}
          className="text-[#05539D] hover:bg-gray-100"
        />
      </div>
    ),
  };

  return (
    <div className="min-h-screen flex flex-row">
      <Toast ref={toast} />

      <div className="hidden md:block w-1/3 h-screen relative">
        <Image
          src={InitialScreenPhoto}
          alt="Navita Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="w-full md:w-2/3 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl shadow-lg p-8">
          <Image
            src={Logo}
            alt="Navita Logo"
            className="mx-auto py-5"
            width={160}
          />
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Bem-vindo a Navita</h1>

          {STEP_COMPONENTS[actualStep]}
        </div>
      </div>
    </div>
  );
}