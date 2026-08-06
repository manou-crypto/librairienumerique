// Produits Service — Product catalogue API client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface Produit {
  id: string;
  name: string;
  reference: string;
  categoryId: string;
  categoryName: string;
  prixAchat: number;
  prixVente: number;
  stock: number;
  seuilAlerte: number;
  status: 'actif' | 'masque' | 'brouillon';
  visible: boolean;
  description: string;
  imageUrl?: string;
}

export interface ProduitsFilters {
  search?: string;
  categoryId?: string;
  status?: string;
  stockFilter?: 'ok' | 'alerte' | 'rupture';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? (localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token'))
    : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const produitsService = {
  /**
   * Get paginated product list with filters
   * GET /api/produits
   */
  async getAll(filters?: ProduitsFilters): Promise<PaginatedResponse<Produit>> {
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.categoryId) params.set('categoryId', filters.categoryId);
    if (filters?.status) params.set('status', filters.status);
    if (filters?.stockFilter) params.set('stockFilter', filters.stockFilter);
    if (filters?.page) params.set('page', String(filters.page));
    if (filters?.pageSize) params.set('pageSize', String(filters.pageSize));

    const response = await fetch(`${API_BASE_URL}/produits?${params}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  /**
   * Get single product by ID
   * GET /api/produits/:id
   */
  async getById(id: string): Promise<Produit> {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Product ${id} not found`);
    return response.json();
  },

  /**
   * Create new product
   * POST /api/produits
   */
  async create(produit: Omit<Produit, 'id'>): Promise<Produit> {
    const response = await fetch(`${API_BASE_URL}/produits`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(produit),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  /**
   * Update existing product
   * PUT /api/produits/:id
   */
  async update(id: string, produit: Partial<Produit>): Promise<Produit> {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(produit),
    });
    if (!response.ok) throw new Error(`Failed to update product ${id}`);
    return response.json();
  },

  /**
   * Delete product
   * DELETE /api/produits/:id
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to delete product ${id}`);
  },
};
