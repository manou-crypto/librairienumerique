// Auth Service — JWT token management and authentication API client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  name: string;
  email: string;
  role: 'super_admin' | 'manager' | 'cashier';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export const authService = {
  /**
   * Authenticate user with email and password
   * POST /api/auth/login
   */
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Authentication failed');
    return response.json();
  },

  /**
   * Logout and invalidate token
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    this.clearSession();
  },

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) throw new Error('Token refresh failed');
    return response.json();
  },

  /** Get stored JWT token */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  },

  /** Get stored user info */
  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  /** Check if user is authenticated */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /** Clear session data */
  clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
  },
};
