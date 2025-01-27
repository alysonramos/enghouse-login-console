'use client';

import { PrimeReactProvider } from 'primereact/api';
import { type ReactNode } from 'react';

export default function PrimeReactWrapper({ children }: { children: ReactNode }) {
  return <PrimeReactProvider value={{ unstyled: false }} >{children}</PrimeReactProvider>;
}