import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { Search, Download, Eye, ShoppingBag } from 'lucide-react';


// Moved to src/app/(erp)/ventes/page.tsx
export {};

interface Vente {
  id: number;
  reference: string;
  date: string;
  heure: string;
  caissier: string;
  caisse: string;
  articles: number;
  montant: number;
  modePaiement: 'especes' | 'carte' | 'cheque';
}

const VENTES: Vente[] = [
  { id: 1, reference: 'VNT-2026-0892', date: '2026-08-03', heure: '14:32', caissier: 'Karim Hadj', caisse: 'Caisse 1', articles: 3, montant: 4250, modePaiement: 'especes' },
  { id: 2, reference: 'VNT-2026-0891', date: '2026-08-03', heure: '13:15', caissier: 'Fatima Zerrouki', caisse: 'Caisse 2', articles: 1, montant: 850, modePaiement: 'carte' },
  { id: 3, reference: 'VNT-2026-0890', date: '2026-08-03', heure: '11:48', caissier: 'Karim Hadj', caisse: 'Caisse 1', articles: 5, montant: 12800, modePaiement: 'especes' },
  { id: 4, reference: 'VNT-2026-0889', date: '2026-08-03', heure: '10:22', caissier: 'Fatima Zerrouki', caisse: 'Caisse 2', articles: 2, montant: 3200, modePaiement: 'cheque' },
  { id: 5, reference: 'VNT-2026-0888', date: '2026-08-02', heure: '17:05', caissier: 'Karim Hadj', caisse: 'Caisse 1', articles: 4, montant: 6750, modePaiement: 'especes' },
  { id: 6, reference: 'VNT-2026-0887', date: '2026-08-02', heure: '15:30', caissier: 'Fatima Zerrouki', caisse: 'Caisse 2', articles: 2, montant: 1700, modePaiement: 'carte' },
  { id: 7, reference: 'VNT-2026-0886', date: '2026-08-02', heure: '12:10', caissier: 'Karim Hadj', caisse: 'Caisse 1', articles: 6, montant: 18500, modePaiement: 'especes' },
  { id: 8, reference: 'VNT-2026-0885', date: '2026-08-01', heure: '16:45', caissier: 'Fatima Zerrouki', caisse: 'Caisse 2', articles: 1, montant: 3500, modePaiement: 'carte' },
];

const MODE_CONFIG = {
  especes: { label: 'Espèces', className: 'badge-active' },
  carte: { label: 'Carte', className: 'badge-draft' },
  cheque: { label: 'Chèque', className: 'badge-alert' },
};

function VentesPage() {
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const filtered = VENTES.filter((v) => {
    const matchSearch = v.reference.toLowerCase().includes(search.toLowerCase()) || v.caissier.toLowerCase().includes(search.toLowerCase());
    const matchDate = !filterDate || v.date === filterDate;
    const matchMode = filterMode === 'all' || v.modePaiement === filterMode;
    return matchSearch && matchDate && matchMode;
  });

  const totalJour = VENTES.filter(v => v.date === '2026-08-03').reduce((s, v) => s + v.montant, 0);
  const totalMois = VENTES.reduce((s, v) => s + v.montant, 0);

  return (
    <AppLayout currentPath="/ventes">
      <Topbar title="Historique des ventes" subtitle="Toutes les transactions enregistrées" />
      <div className="px-6 py-6 max-w-screen-2xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="kpi-card-info">
            <p className="text-xs text-muted-foreground mb-1">CA aujourd'hui</p>
            <p className="text-xl font-bold text-foreground tabular-nums">{totalJour.toLocaleString('fr-DZ')} DA</p>
            <p className="text-xs text-muted-foreground mt-1">{VENTES.filter(v => v.date === '2026-08-03').length} ventes</p>
          </div>
          <div className="kpi-card-positive">
            <p className="text-xs text-muted-foreground mb-1">CA total (période)</p>
            <p className="text-xl font-bold text-foreground tabular-nums">{totalMois.toLocaleString('fr-DZ')} DA</p>
            <p className="text-xs text-muted-foreground mt-1">{VENTES.length} transactions</p>
          </div>
          <div className="kpi-card-neutral">
            <p className="text-xs text-muted-foreground mb-1">Panier moyen</p>
            <p className="text-xl font-bold text-foreground tabular-nums">
              {Math.round(totalMois / VENTES.length).toLocaleString('fr-DZ')} DA
            </p>
          </div>
          <div className="kpi-card-warning">
            <p className="text-xs text-muted-foreground mb-1">Articles vendus</p>
            <p className="text-xl font-bold text-warning tabular-nums">
              {VENTES.reduce((s, v) => s + v.articles, 0)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="card-base overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Référence, caissier..."
                className="input-field pl-9 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="input-field text-sm w-auto"
              />
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="input-field text-sm w-auto"
              >
                <option value="all">Tous modes</option>
                <option value="especes">Espèces</option>
                <option value="carte">Carte</option>
                <option value="cheque">Chèque</option>
              </select>
              <button className="btn-secondary flex items-center gap-1.5 text-sm py-2">
                <Download size={14} /> Exporter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Référence</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Date & Heure</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Caissier</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Caisse</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Articles</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Montant</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground">Paiement</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((vente, idx) => (
                  <tr key={vente.id} className={`border-b border-border table-row-hover ${idx % 2 === 0 ? '' : 'bg-muted/20'}`}>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{vente.reference}</td>
                    <td className="px-5 py-3 text-foreground">
                      <p className="text-sm">{vente.date}</p>
                      <p className="text-xs text-muted-foreground">{vente.heure}</p>
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground">{vente.caissier}</td>
                    <td className="px-5 py-3 text-muted-foreground">{vente.caisse}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{vente.articles}</td>
                    <td className="px-5 py-3 text-right tabular-nums font-bold text-foreground">
                      {vente.montant.toLocaleString('fr-DZ')} DA
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={MODE_CONFIG[vente.modePaiement].className}>
                        {MODE_CONFIG[vente.modePaiement].label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        <Eye size={12} /> Détail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <ShoppingBag size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Aucune vente trouvée</p>
            </div>
          )}

          <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground">
            {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export {};
