import React from 'react';
import Badge from '@/components/ui/Badge';

const topProducts = [
  {
    id: 'prod-001',
    rank: 1,
    name: 'Le Petit Prince — Antoine de Saint-Exupéry',
    category: 'Livres',
    vendu: 23,
    ca: 436.77,
    marge: 34.2,
    stock: 45,
  },
  {
    id: 'prod-002',
    rank: 2,
    name: 'Cahier grand format 200 pages Clairefontaine',
    category: 'Fournitures',
    vendu: 87,
    ca: 391.50,
    marge: 42.1,
    stock: 312,
  },
  {
    id: 'prod-003',
    rank: 3,
    name: 'Stylo bille BIC 4 couleurs (lot de 12)',
    category: 'Fournitures',
    vendu: 65,
    ca: 318.50,
    marge: 51.8,
    stock: 8,
  },
  {
    id: 'prod-004',
    rank: 4,
    name: 'Clé USB SanDisk 64GB USB 3.0',
    category: 'Informatique',
    vendu: 12,
    ca: 287.40,
    marge: 28.6,
    stock: 0,
  },
  {
    id: 'prod-005',
    rank: 5,
    name: 'Dictionnaire Larousse 2026 — Complet',
    category: 'Livres',
    vendu: 9,
    ca: 251.10,
    marge: 31.4,
    stock: 22,
  },
];

function getStockBadge(stock: number) {
  if (stock === 0) return <Badge variant="rupture">Rupture</Badge>;
  if (stock < 10) return <Badge variant="alert">Alerte</Badge>;
  return <Badge variant="active">OK</Badge>;
}

export default function TopProductsTable() {
  return (
    <div className="card-base overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Top 5 produits vendus</h3>
        <span className="text-xs text-muted-foreground">Aujourd&apos;hui</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-8">#</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Produit</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Catégorie</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">Qté vendue</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">CA (€)</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">Marge</th>
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.id} className="table-row-hover border-b border-border last:border-0">
                <td className="px-5 py-3">
                  <span className="text-xs font-bold text-muted-foreground w-5 h-5 rounded-md bg-muted flex items-center justify-center">
                    {p.rank}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground text-xs truncate max-w-[200px]">{p.name}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground">{p.category}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold tabular-nums text-foreground text-xs">{p.vendu}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-bold tabular-nums text-foreground text-xs">
                    {p.ca.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-xs font-semibold tabular-nums ${p.marge > 40 ? 'text-green-600' : p.marge > 30 ? 'text-blue-600' : 'text-amber-600'}`}>
                    {p.marge}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {getStockBadge(p.stock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}