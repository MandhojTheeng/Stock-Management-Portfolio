import { create } from "zustand";
import type { Stock } from "../types";

type PortfolioState = {
  stocks: Stock[];
  addStock: (stock: Stock) => void;
  deleteStock: (id: string) => void;
  updateStock: (id: string, patch: Partial<Stock>) => void;
  loadFromLocalStorage: () => void;
};

const STORAGE_KEY = "portfolio_v1";

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  stocks: [],
  addStock: (stock) => set((s) => ({ stocks: [...s.stocks, stock] })),
  deleteStock: (id) => set((s) => ({ stocks: s.stocks.filter(st => st.id !== id) })),
  updateStock: (id, patch) =>
    set((s) => ({ stocks: s.stocks.map(st => (st.id === id ? { ...st, ...patch } : st)) })),
  loadFromLocalStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) set({ stocks: JSON.parse(raw) });
    } catch {}
  },
}));

// Persist stocks to localStorage
usePortfolioStore.subscribe(
  (state) => state.stocks,
  (stocks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks))
);
