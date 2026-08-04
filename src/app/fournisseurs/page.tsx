// Moved to src/app/(erp)/fournisseurs/page.tsx
export {};

import { Star } from 'lucide-react';

interface Fournisseur {
  id: number;
  nom: string;
  contact: string;
  email: string;
  telephone: string;
  adresse: string;
  categorie: string;
  note: number;
  totalAchats: number;
  derniereCommande: string;
  statut: 'actif' | 'inactif';
}

const FOURNISSEURS: Fournisseur[] = [
  { id: 1, nom: 'Éditions Casbah', contact: 'Rachid Bensalem', email: 'contact@casbah-editions.dz', telephone: '+213 21 63 45 78', adresse: 'Alger, Algérie', categorie: 'Livres', note: 4.5, totalAchats: 285000, derniereCommande: '2026-08-01', statut: 'actif' },
  { id: 2, nom: 'Distri-Info Algérie', contact: 'Nadia Hamidi', email: 'nadia@distri-info.dz', telephone: '+213 23 45 67 89', adresse: 'Oran, Algérie', categorie: 'Informatique', note: 4.8, totalAchats: 520000, derniereCommande: '2026-07-28', statut: 'actif' },
  { id: 3, nom: 'Papeterie Centrale', contact: 'Mourad Kaci', email: 'mourad@papeterie-centrale.dz', telephone: '+213 25 12 34 56', adresse: 'Constantine, Algérie', categorie: 'Fournitures', note: 4.2, totalAchats: 145000, derniereCommande: '2026-07-25', statut: 'actif' },
  { id: 4, nom: 'TechDist Algérie', contact: 'Amira Bouzid', email: 'amira@techdist.dz', telephone: '+213 21 98 76 54', adresse: 'Alger, Algérie', categorie: 'Informatique', note: 3.9, totalAchats: 380000, derniereCommande: '2026-07-15', statut: 'actif' },
  { id: 5, nom: 'Librairie Nationale', contact: 'Youcef Mansouri', email: 'youcef@lib-nationale.dz', telephone: '+213 21 55 44 33', adresse: 'Alger, Algérie', categorie: 'Livres', note: 4.0, totalAchats: 95000, derniereCommande: '2026-06-20', statut: 'inactif' },
];

function StarRating({ note }: { note: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.floor(note) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{note}</span>
    </div>
  );
}

export {};
