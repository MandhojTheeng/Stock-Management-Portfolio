import type { StockHistory } from '../types'

export function fetchMockStockHistory(symbol: string, days = 30): Promise<StockHistory> {
  return new Promise(resolve => {
    setTimeout(() => {
      const today = new Date()
      const history = Array.from({ length: days }).map((_, idx) => {
        const d = new Date(today)
        d.setDate(today.getDate() - (days - 1 - idx))
        const base = 100 + (symbol.charCodeAt(0) % 20) * 2
        const noise = Math.sin(idx / 3) * 2 + (Math.random() - 0.5) * 3
        const close = Math.max(1, +(base + idx * 0.2 + noise).toFixed(2))
        const volume = Math.floor(1000 + Math.random() * 5000)
        return { date: d.toISOString().slice(0, 10), close, volume }
      })
      resolve({ symbol, history })
    }, 400)
  })
}
