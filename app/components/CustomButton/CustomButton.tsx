import { Button } from 'primereact/button';
import React from 'react';

interface CustomButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
    icon?: string;
    severity?: 'success' | 'info' | 'secondary' | 'contrast' | 'warning' | 'help' | 'danger';
    disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className = '', icon, severity = 'primary', disabled}) => {
    const mappedSeverity = severity === 'primary' ? 'contrast' : severity;
  
    return (
      <Button
        disabled={disabled}
        label={label}
        onClick={onClick}
        className={`w-full justify-center p-3 ${className} rounded-md font-light`}
        severity={mappedSeverity as 'success' | 'info' | 'secondary' | 'contrast' | 'warning' | 'help' | 'danger'}
        icon={icon}
        pt={{
          root: { className: 'border border-[#05539D]' },
        }}
      />
    );
};