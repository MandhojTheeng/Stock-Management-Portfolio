// Single historical stock data point
export interface StockDataPoint {
  date: string
  close: number
  volume: number
}

// Full stock history (for charts)
export interface StockHistory {
  symbol: string
  history: StockDataPoint[]
}

// Portfolio stock type
export interface PortfolioStock {
  id: string
  ticker: string
  company: string
  quantity: number
  purchasePrice: number
  currentPrice: number
}
