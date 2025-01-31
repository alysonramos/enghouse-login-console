'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';

interface ProductScreenProps {
  setStep: (step: string) => void;
}

export const ProductScreen: React.FC<ProductScreenProps> = ({ setStep }) => {
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

        <div className="flex overflow-hidden w-[600px] h-[300px] relative cursor-pointer pt-5">
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
              <small className="text-sm text-gray-600 mt-5 text-center">{card.content}</small>
              {card.isBlocked && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <small className="text-gray-700 mx-3 text-center">Pagamento necessário para acessar</small>
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