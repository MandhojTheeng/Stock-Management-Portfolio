import { create } from "zustand";
import type { PortfolioStock } from "../types";

const STORAGE_KEY = "my_portfolio";

interface PortfolioState {
  stocks: PortfolioStock[]; 
  addStock: (stock: PortfolioStock) => void;
  updateStock: (stock: PortfolioStock) => void;
  deleteStock: (id: string) => void;
  loadFromLocalStorage: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  stocks: [],

  addStock: (stock) => {
    const updated = [...get().stocks, stock];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ stocks: updated });
  },

  updateStock: (stock) => {
    const updated = get().stocks.map((p) => (p.id === stock.id ? stock : p));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ stocks: updated });
  },

  deleteStock: (id) => {
    const updated = get().stocks.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ stocks: updated });
  },

  loadFromLocalStorage: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) set({ stocks: JSON.parse(stored) });
  },
}));
