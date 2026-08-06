// Ventes Service — Sales/transactions API client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface LigneVente {
  produitId: string;
  nom: string;
  reference: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

export interface Vente {
  id: string;
  reference: string;
  date: string;
  heure: string;
  caissier: string;
  caisseId: string;
  caisse: string;
  lignes: LigneVente[];
  sousTotal: number;
  tva: number;
  total: number;
  modePaiement: 'especes' | 'carte' | 'cheque';
  montantRecu?: number;
  monnaie?: number;
}

export interface CreateVentePayload {
  caisseId: string;
  lignes: Array<{ produitId: string; quantite: number }>;
  modePaiement: 'especes' | 'carte' | 'cheque';
  montantRecu?: number;
}

export interface VentesFilters {
  dateDebut?: string;
  dateFin?: string;
  caisseId?: string;
  modePaiement?: string;
  page?: number;
  pageSize?: number;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? (localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token'))
    : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const ventesService = {
  /**
   * Get paginated sales list
   * GET /api/ventes
   */
  async getAll(filters?: VentesFilters): Promise<{ data: Vente[]; total: number }> {
    const params = new URLSearchParams();
    if (filters?.dateDebut) params.set('dateDebut', filters.dateDebut);
    if (filters?.dateFin) params.set('dateFin', filters.dateFin);
    if (filters?.caisseId) params.set('caisseId', filters.caisseId);
    if (filters?.modePaiement) params.set('modePaiement', filters.modePaiement);
    if (filters?.page) params.set('page', String(filters.page));
    if (filters?.pageSize) params.set('pageSize', String(filters.pageSize));

    const response = await fetch(`${API_BASE_URL}/ventes?${params}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch sales');
    return response.json();
  },

  /**
   * Get single sale by ID
   * GET /api/ventes/:id
   */
  async getById(id: string): Promise<Vente> {
    const response = await fetch(`${API_BASE_URL}/ventes/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Sale ${id} not found`);
    return response.json();
  },

  /**
   * Create a new sale (POS transaction)
   * POST /api/ventes
   */
  async create(payload: CreateVentePayload): Promise<Vente> {
    const response = await fetch(`${API_BASE_URL}/ventes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create sale');
    return response.json();
  },

  /**
   * Get daily summary for a caisse
   * GET /api/ventes/summary/:caisseId
   */
  async getDailySummary(caisseId: string, date: string): Promise<{ total: number; count: number; byMode: Record<string, number> }> {
    const response = await fetch(`${API_BASE_URL}/ventes/summary/${caisseId}?date=${date}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch daily summary');
    return response.json();
  },
};
