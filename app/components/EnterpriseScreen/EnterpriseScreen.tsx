'use client';

import { CustomButton } from '../CustomButton/CustomButton';

interface EnterpriseScreenProps {
  setStep: (step: string) => void;
}

export const EnterpriseScreen: React.FC<EnterpriseScreenProps> = ({ setStep }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Empresa</h2>
      <p className="text-semibold text-center">Selecione uma das opções abaixo</p>
      <CustomButton
        label="Dados Organizacionais"
        onClick={() => setStep('ORGANIZATION')}
        className="text-[#05539D]"
      />
      <CustomButton
        label="Endereço"
        onClick={() => setStep('ADDRESS')}
        className="text-[#05539D] text-bold"
      />
      <CustomButton
        label="Controle de Contas"
        onClick={() => setStep('ACCOUNT_MANAGER')}
        className="text-[#05539D] "
      />

      <CustomButton
        label="Fale com um especialista"
        onClick={() => setStep('TALK_TO_SPECIALIST')}
        className="hover:bg-[#1e5991] bg-[#05539D] text-white"
      />
            <CustomButton
        label="Voltar"
        onClick={() => setStep('PRODUCT_SCREEN')}
        className="text-[#05539D] hover:bg-gray-100"
      />
    </div>
  );
};