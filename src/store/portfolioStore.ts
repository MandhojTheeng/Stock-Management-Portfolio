import { create } from 'zustand';
import type { PortfolioStock } from '../types';

const STORAGE_KEY = 'my_portfolio';

interface PortfolioState {
  portfolio: PortfolioStock[];
  addStock: (stock: PortfolioStock) => void;
  updateStock: (stock: PortfolioStock) => void;
  deleteStock: (id: string) => void;
  loadPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolio: [],
  addStock: (stock) => {
    const updated = [...get().portfolio, stock];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ portfolio: updated });
  },
  updateStock: (stock) => {
    const updated = get().portfolio.map(p => p.id === stock.id ? stock : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ portfolio: updated });
  },
  deleteStock: (id) => {
    const updated = get().portfolio.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ portfolio: updated });
  },
  loadPortfolio: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) set({ portfolio: JSON.parse(stored) });
  }
}));
