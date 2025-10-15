import type { PortfolioStock } from '../types'

const STORAGE_KEY = 'my_portfolio'

export function loadPortfolio(): PortfolioStock[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function savePortfolio(data: PortfolioStock[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
