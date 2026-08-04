// Moved to src/app/(erp)/notifications/page.tsx
import { AlertTriangle, Info, CheckCircle, ShoppingBag, Package, CreditCard, Users } from 'lucide-react';
import React from 'react';

export {};



type NotifType = 'alerte' | 'info' | 'succes' | 'vente' | 'stock' | 'caisse' | 'utilisateur';

interface Notification {
  id: number;
  type: NotifType;
  titre: string;
  message: string;
  date: string;
  lue: boolean;
}

const NOTIFS_INIT: Notification[] = [
  { id: 1, type: 'stock', titre: 'Stock faible', message: 'Le produit "Cahier 200 pages" est en dessous du seuil minimum (5 unités restantes).', date: '2026-08-03 14:45', lue: false },
  { id: 2, type: 'vente', titre: 'Vente enregistrée', message: 'Vente #VNT-2026-0842 de 12 500 DA enregistrée sur Caisse 1 par Karim Hadj.', date: '2026-08-03 14:30', lue: false },
  { id: 3, type: 'caisse', titre: 'Caisse 2 clôturée', message: 'La Caisse 2 a été clôturée par Fatima Zerrouki. Total encaissé : 31 200 DA.', date: '2026-08-03 14:00', lue: false },
  { id: 4, type: 'alerte', titre: 'Tentative de connexion échouée', message: '3 tentatives de connexion échouées détectées pour le compte admin@librairie.dz.', date: '2026-08-03 11:20', lue: false },
  { id: 5, type: 'utilisateur', titre: 'Nouveau compte créé', message: 'Le compte utilisateur "Yacine Boudali" (Gestionnaire) a été créé avec succès.', date: '2026-08-03 09:00', lue: true },
  { id: 6, type: 'succes', titre: 'Sauvegarde réussie', message: 'La sauvegarde automatique des données a été effectuée avec succès.', date: '2026-08-03 08:00', lue: true },
  { id: 7, type: 'stock', titre: 'Rupture de stock', message: '"Clé USB 32GB Kingston" est en rupture de stock. Pensez à passer une commande.', date: '2026-08-02 17:30', lue: true },
  { id: 8, type: 'info', titre: 'Mise à jour disponible', message: 'Une nouvelle version du système est disponible. Contactez votre administrateur.', date: '2026-08-02 10:00', lue: true },
  { id: 9, type: 'vente', titre: 'Objectif mensuel atteint', message: 'Félicitations ! L\'objectif de ventes mensuel de 500 000 DA a été atteint.', date: '2026-08-01 18:00', lue: true },
];

const TYPE_CONFIG: Record<NotifType, { icon: React.ElementType; className: string; bg: string }> = {
  alerte: { icon: AlertTriangle, className: 'text-negative', bg: 'bg-negative/10' },
  info: { icon: Info, className: 'text-primary', bg: 'bg-primary/10' },
  succes: { icon: CheckCircle, className: 'text-positive', bg: 'bg-positive/10' },
  vente: { icon: ShoppingBag, className: 'text-primary', bg: 'bg-primary/10' },
  stock: { icon: Package, className: 'text-warning', bg: 'bg-warning/10' },
  caisse: { icon: CreditCard, className: 'text-foreground', bg: 'bg-muted' },
  utilisateur: { icon: Users, className: 'text-primary', bg: 'bg-primary/10' },
};

type FilterTab = 'toutes' | 'non_lues' | 'alertes' | 'ventes' | 'stock';

export {};
