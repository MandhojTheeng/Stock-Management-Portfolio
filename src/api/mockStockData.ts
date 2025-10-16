import type { PortfolioStock } from "../types";

export const MOCK_STOCKS: PortfolioStock[] = [
  {
    id: "1",
    ticker: "AAPL",
    company: "Apple Inc.",
    quantity: 10,
    purchasePrice: 150,
    currentPrice: 190,
    purchaseDate: "2025-01-10",
  },
  {
    id: "2",
    ticker: "GOOGL",
    company: "Alphabet Inc.",
    quantity: 8,
    purchasePrice: 120,
    currentPrice: 170,
    purchaseDate: "2025-02-05",
  },
  {
    id: "3",
    ticker: "TSLA",
    company: "Tesla Inc.",
    quantity: 5,
    purchasePrice: 220,
    currentPrice: 250,
    purchaseDate: "2025-03-12",
  },
];
