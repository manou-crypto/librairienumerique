// usePosCart — Custom hook for POS cart state management
'use client';

import { useState, useCallback } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  reference: string;
  category: string;
  prixVente: number;
  stock: number;
}

export interface CartItem extends CartProduct {
  qty: number;
  lineTotal: number;
}

interface UsePosCartReturn {
  cart: CartItem[];
  totalItems: number;
  subtotal: number;
  tva: number;
  total: number;
  addToCart: (product: CartProduct) => boolean;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, delta: number) => boolean;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

const TVA_RATE = 0.20;

export function usePosCart(): UsePosCartReturn {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: CartProduct): boolean => {
    if (product.stock === 0) return false;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1, lineTotal: (i.qty + 1) * i.prixVente }
            : i
        );
      }
      return [...prev, { ...product, qty: 1, lineTotal: product.prixVente }];
    });
    return true;
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, delta: number): boolean => {
    let success = true;
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id !== productId) return i;
          const newQty = i.qty + delta;
          if (newQty > i.stock) { success = false; return i; }
          return { ...i, qty: newQty, lineTotal: newQty * i.prixVente };
        })
        .filter((i) => i.qty > 0)
    );
    return success;
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isInCart = useCallback((productId: string): boolean => {
    return cart.some((i) => i.id === productId);
  }, [cart]);

  const getCartItem = useCallback((productId: string): CartItem | undefined => {
    return cart.find((i) => i.id === productId);
  }, [cart]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.lineTotal, 0);
  const tva = subtotal * TVA_RATE;
  const total = subtotal + tva;

  return { cart, totalItems, subtotal, tva, total, addToCart, removeFromCart, updateQty, clearCart, isInCart, getCartItem };
}
