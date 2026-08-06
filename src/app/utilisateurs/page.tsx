// Moved to src/app/(erp)/utilisateurs/page.tsx
export {};

type Role = 'super_admin' | 'manager' | 'cashier';

interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  role: Role;
  statut: 'actif' | 'inactif';
  derniereConnexion: string;
  dateCreation: string;
}

const UTILISATEURS_INIT: Utilisateur[] = [
  { id: 1, nom: 'Ahmed Mansouri', email: 'admin@librairie.dz', role: 'super_admin', statut: 'actif', derniereConnexion: '2026-08-03 14:30', dateCreation: '2025-01-15' },
  { id: 2, nom: 'Sara Benali', email: 'manager@librairie.dz', role: 'manager', statut: 'actif', derniereConnexion: '2026-08-03 09:15', dateCreation: '2025-03-20' },
  { id: 3, nom: 'Karim Hadj', email: 'caissier@librairie.dz', role: 'cashier', statut: 'actif', derniereConnexion: '2026-08-03 08:00', dateCreation: '2025-06-01' },
  { id: 4, nom: 'Fatima Zerrouki', email: 'fatima@librairie.dz', role: 'cashier', statut: 'inactif', derniereConnexion: '2026-07-15 16:45', dateCreation: '2025-07-10' },
  { id: 5, nom: 'Yacine Boudali', email: 'yacine@librairie.dz', role: 'manager', statut: 'actif', derniereConnexion: '2026-08-02 17:00', dateCreation: '2025-09-05' },
];

const ROLE_CONFIG: Record<Role, { label: string; className: string }> = {
  super_admin: { label: 'Super Admin', className: 'badge-draft' },
  manager: { label: 'Gestionnaire', className: 'badge-active' },
  cashier: { label: 'Caissier', className: 'badge-alert' },
};

interface UserForm {
  nom: string;
  email: string;
  role: Role;
  password: string;
}

export {};
