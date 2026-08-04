// Moved to src/app/(erp)/caisses/page.tsx
export {};

type CaisseStatut = 'ouverte' | 'fermee' | 'en_cloture';

interface Caisse {
  id: number;
  nom: string;
  caissier: string;
  statut: CaisseStatut;
  soldeOuverture: number;
  totalVentes: number;
  nbTransactions: number;
  heureOuverture: string;
  heureFermeture?: string;
}

const CAISSES: Caisse[] = [
  { id: 1, nom: 'Caisse 1', caissier: 'Karim Hadj', statut: 'ouverte', soldeOuverture: 5000, totalVentes: 48500, nbTransactions: 32, heureOuverture: '08:00' },
  { id: 2, nom: 'Caisse 2', caissier: 'Fatima Zerrouki', statut: 'fermee', soldeOuverture: 5000, totalVentes: 31200, nbTransactions: 21, heureOuverture: '08:00', heureFermeture: '14:00' },
  { id: 3, nom: 'Caisse 3', caissier: 'Non assigné', statut: 'fermee', soldeOuverture: 0, totalVentes: 0, nbTransactions: 0, heureOuverture: '-' },
];

const STATUT_CONFIG: Record<CaisseStatut, { label: string; className: string; icon: string }> = {
  ouverte: { label: 'Ouverte', className: 'badge-active', icon: 'CheckCircle' },
  fermee: { label: 'Fermée', className: 'badge-hidden', icon: 'XCircle' },
  en_cloture: { label: 'En clôture', className: 'badge-alert', icon: 'Clock' },
};

interface ClotureModal {
  caisse: Caisse | null;
  open: boolean;
}

export {};
