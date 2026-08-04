// lib/index.ts — Utility exports (Axios instance, formatters, helpers)

// ─── Number & Currency Formatters ───────────────────────────────────────────

/**
 * Format a number as Algerian Dinar currency
 * @example formatDZD(12500) → "12 500 DA"
 */
export function formatDZD(amount: number): string {
  return `${amount.toLocaleString('fr-DZ')} DA`;
}

/**
 * Format a number as Euro currency
 * @example formatEUR(127.5) → "127,50 €"
 */
export function formatEUR(amount: number): string {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

/**
 * Format a percentage value
 * @example formatPercent(34.2) → "34.2%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ─── Date Formatters ─────────────────────────────────────────────────────────

/**
 * Format a date string to French locale
 * @example formatDate("2026-08-03") → "03/08/2026"
 */
export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Format a datetime string to French locale
 * @example formatDateTime("2026-08-03T14:32:00") → "03/08/2026 à 14:32"
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${d}/${m}/${y} à ${h}:${min}`;
}

// ─── String Utilities ────────────────────────────────────────────────────────

/**
 * Get initials from a full name
 * @example getInitials("Ahmed Mansouri") → "AM"
 */
export function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

/**
 * Truncate a string to a max length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}…`;
}

// ─── API Helpers ─────────────────────────────────────────────────────────────

/**
 * Build authorization headers from stored JWT token
 */
export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Base API URL from environment
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
