export interface StockDataPoint {
  date: string
  close: number
  volume: number
}

export interface StockHistory {
  symbol: string
  history: StockDataPoint[]
}

export interface PortfolioStock {
  id: string
  ticker: string
  company: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: string
}
