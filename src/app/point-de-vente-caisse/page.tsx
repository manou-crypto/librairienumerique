import React from 'react';
import AppLayout from '@/components/AppLayout';
import POSTerminal from './components/POSTerminal';

export default function PointDeVentePage() {
  return (
    <AppLayout currentPath="/point-de-vente-caisse">
      <POSTerminal />
    </AppLayout>
  );
}