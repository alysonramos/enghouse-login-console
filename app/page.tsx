'use client';

import Image from 'next/image';
import { Toast } from 'primereact/toast';
import { JSX, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import ReactCountryFlag from "react-country-flag";
import InitialScreenPhoto from '../public/images/initial-screen.webp';
import Logo from '../public/images/logo.png';
import AccountManagerScreenForm from './components/AccountManagerScreenForm/AccountManagerScreenForm';
import AddressScreenForm from './components/AddressScreenForm/AddressScreenForm';
import { EnterpriseScreen } from './components/EnterpriseScreen/EnterpriseScreen';
import { LoginForm } from './components/LoginForm/LoginForm';
import OrganizationScreenForm from "./components/OrganizationScreen/OrganizationScreen";
import { ProductScreen } from './components/ProductScreen/ProductScreen';
import TalkToSpecialistScreenForm from './components/TalkToSpecialistScreenForm/TalkToSpecialistScreenForm';
type ElementKey = "LOGIN" | "PRODUCT_SCREEN" | "ENTERPRISE" | "ORGANIZATION" | "ADDRESS" | "ACCOUNT_MANAGER" | "TALK_TO_SPECIALIST";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actualStep, setStep] = useState<ElementKey>('LOGIN');
  const toast = useRef<Toast>(null);

  const handleLoginSubmit = async (values: { username: string; password: string }) => {
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
  };

  const STEP_COMPONENTS: Record<ElementKey, JSX.Element> = {
    LOGIN: <LoginForm onSubmit={handleLoginSubmit} isSubmitting={isSubmitting} />,
    PRODUCT_SCREEN: <ProductScreen setStep={setStep} />,
    ENTERPRISE: <EnterpriseScreen setStep={setStep} />,
    ORGANIZATION: <OrganizationScreenForm setStep={setStep}/>,
    ADDRESS: <AddressScreenForm setStep={setStep}/>,
    ACCOUNT_MANAGER: <AccountManagerScreenForm setStep={setStep}/>,
    TALK_TO_SPECIALIST: <TalkToSpecialistScreenForm setStep={setStep}/>
  };
  // const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex flex-row pt-14">
      <header className='w-full bg-white text-white p-4 shadow-md fixed top-0 left-0 z-50 flex justify-around'>
        <div className='flex justify-between items-center'>
          <Image src={Logo} alt="Navita Logo" width={120}></Image>
          <h1 className='text-lg font-semibold'>Painel de Gestão</h1>
        </div>
        <div className="div flex cursor-pointer">
          <Button>
          <ReactCountryFlag
                className="emojiFlag"
                countryCode="BR"
                style={{
                    fontSize: '1.5em',
                    lineHeight: '1.5em',
                }}
                aria-label="United States"
            />
          </Button>
          <Button>
            <ReactCountryFlag
                className="emojiFlag"
                countryCode="US"
                style={{
                    fontSize: '1.5em',
                    lineHeight: '1.5em',
                }}
                aria-label="United States"
            />
          </Button>
        </div>
      </header>
      <Toast ref={toast} />

      <div className="hidden md:block w-1/3 h-screen relative">
        <Image
          src={InitialScreenPhoto}
          alt="Navita Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw m-0 p-0"
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