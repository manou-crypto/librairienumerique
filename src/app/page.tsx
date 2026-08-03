import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import DashboardBentoGrid from './components/DashboardBentoGrid';
import DashboardChartsRow from './components/DashboardChartsRow';
import DashboardBottomRow from './components/DashboardBottomRow';
import DashboardStockAlerts from './components/DashboardStockAlerts';

export default function AdminDashboardPage() {
  return (
    <AppLayout currentPath="/">
      <Topbar
        title="Tableau de bord"
        subtitle="Dimanche 3 août 2026 — Données en temps réel"
      />
      <div className="px-6 xl:px-8 2xl:px-10 py-6 max-w-screen-2xl mx-auto space-y-6">
        <DashboardBentoGrid />
        <DashboardChartsRow />
        <DashboardBottomRow />
        <DashboardStockAlerts />
      </div>
    </AppLayout>
  );
}