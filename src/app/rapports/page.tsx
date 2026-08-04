'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { Download, TrendingUp, ShoppingBag, Package, DollarSign, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const caData = [
  { mois: 'Jan', ca: 420000, benefice: 95000 },
  { mois: 'Fév', ca: 380000, benefice: 82000 },
  { mois: 'Mar', ca: 510000, benefice: 118000 },
  { mois: 'Avr', ca: 475000, benefice: 105000 },
  { mois: 'Mai', ca: 530000, benefice: 122000 },
  { mois: 'Jun', ca: 490000, benefice: 110000 },
  { mois: 'Jul', ca: 560000, benefice: 135000 },
  { mois: 'Aoû', ca: 610000, benefice: 148000 },
];

const categoryData = [
  { name: 'Livres', value: 42, color: '#2563eb' },
  { name: 'Fournitures', value: 28, color: '#3b82f6' },
  { name: 'Informatique', value: 18, color: '#60a5fa' },
  { name: 'Bureautique', value: 12, color: '#93c5fd' },
];

const topProducts = [
  { nom: 'Cahier 200 pages', categorie: 'Fournitures', ventes: 342, ca: 51300 },
  { nom: 'Stylo BIC x10', categorie: 'Fournitures', ventes: 289, ca: 28900 },
  { nom: 'Dictionnaire Larousse', categorie: 'Livres', ventes: 201, ca: 80400 },
  { nom: 'Clé USB 32GB', categorie: 'Informatique', ventes: 178, ca: 71200 },
  { nom: 'Ramette A4 500f', categorie: 'Bureautique', ventes: 156, ca: 46800 },
];

const ventesJour = [
  { jour: 'Lun', ventes: 45 },
  { jour: 'Mar', ventes: 62 },
  { jour: 'Mer', ventes: 38 },
  { jour: 'Jeu', ventes: 71 },
  { jour: 'Ven', ventes: 89 },
  { jour: 'Sam', ventes: 95 },
  { jour: 'Dim', ventes: 28 },
];

type Period = 'semaine' | 'mois' | 'trimestre' | 'annee';

function RapportsPage() {
  const [period, setPeriod] = useState<Period>('mois');

  const periodLabels: Record<Period, string> = {
    semaine: 'Cette semaine',
    mois: 'Ce mois',
    trimestre: 'Ce trimestre',
    annee: 'Cette année',
  };

  return (
    <AppLayout currentPath="/rapports">
      <Topbar title="Rapports" subtitle="Analyses et statistiques de performance" />
      <div className="px-6 py-6 max-w-screen-2xl mx-auto space-y-6">

        {/* Header actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-muted-foreground" />
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {(['semaine', 'mois', 'trimestre', 'annee'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    period === p ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {periodLabels[p]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-1.5 text-sm py-2">
              <Download size={14} /> Exporter PDF
            </button>
            <button className="btn-secondary flex items-center gap-1.5 text-sm py-2">
              <Download size={14} /> Exporter Excel
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="kpi-card-info">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Chiffre d'affaires</p>
              <DollarSign size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">610 000 DA</p>
            <p className="text-xs text-positive mt-1">↑ +8.9% vs mois dernier</p>
          </div>
          <div className="kpi-card-positive">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Bénéfice net</p>
              <TrendingUp size={16} className="text-positive" />
            </div>
            <p className="text-2xl font-bold text-positive tabular-nums">148 000 DA</p>
            <p className="text-xs text-positive mt-1">↑ +9.6% vs mois dernier</p>
          </div>
          <div className="kpi-card-neutral">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Ventes totales</p>
              <ShoppingBag size={16} className="text-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">1 265</p>
            <p className="text-xs text-muted-foreground mt-1">transactions ce mois</p>
          </div>
          <div className="kpi-card-warning">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Marge moyenne</p>
              <Package size={16} className="text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning tabular-nums">24.3%</p>
            <p className="text-xs text-muted-foreground mt-1">sur tous les produits</p>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CA Area Chart */}
          <div className="lg:col-span-2 card-base p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">Évolution CA & Bénéfice</h3>
                <p className="text-xs text-muted-foreground">8 derniers mois</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={caData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mois" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString('fr-DZ')} DA`} />
                <Area type="monotone" dataKey="ca" stroke="#2563eb" strokeWidth={2} fill="url(#colorCA)" name="CA" />
                <Area type="monotone" dataKey="benefice" stroke="#22c55e" strokeWidth={2} fill="url(#colorBen)" name="Bénéfice" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie */}
          <div className="card-base p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-foreground">Répartition par catégorie</h3>
              <p className="text-xs text-muted-foreground">Part des ventes (%)</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ventes par jour */}
          <div className="card-base p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-foreground">Ventes par jour de la semaine</h3>
              <p className="text-xs text-muted-foreground">Nombre de transactions</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ventesJour} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="jour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="ventes" fill="#2563eb" radius={[4, 4, 0, 0]} name="Ventes" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top products */}
          <div className="card-base overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">Top 5 produits</h3>
              <p className="text-xs text-muted-foreground">Par nombre de ventes ce mois</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">#</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Produit</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Ventes</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">CA (DA)</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p, idx) => (
                    <tr key={idx} className={`border-b border-border table-row-hover ${idx % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <td className="px-5 py-3 text-xs font-bold text-muted-foreground">{idx + 1}</td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-foreground text-sm">{p.nom}</p>
                        <p className="text-xs text-muted-foreground">{p.categorie}</p>
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-foreground tabular-nums">{p.ventes}</td>
                      <td className="px-5 py-3 text-right font-semibold text-primary tabular-nums">{p.ca.toLocaleString('fr-DZ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// This file has been moved to src/app/(erp)/rapports/page.tsx
