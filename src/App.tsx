import { useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loadPortfolio, savePortfolio } from './utils/storage'
import type { PortfolioStock, StockHistory } from './types'
import StockForm from './components/StockForm'
import PortfolioTable from './components/PortfolioTable'
import StockCharts from './components/StockCharts'
import { fetchMockStockHistory } from './api/mockApi'

const queryClient = new QueryClient()

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>(() => loadPortfolio())
  const [editing, setEditing] = useState<PortfolioStock | null>(null)
  const [selectedSymbol] = useState<string | null>(null)

  const { data: historyData } = useQuery<StockHistory>({
    queryKey: ['stockHistory', selectedSymbol],
    queryFn: () => fetchMockStockHistory(selectedSymbol ?? ''),
    enabled: !!selectedSymbol
  })

  const handleSave = (s: PortfolioStock) => {
    const updated = editing
      ? portfolio.map(p => (p.id === s.id ? s : p))
      : [...portfolio, s]
    setPortfolio(updated)
    savePortfolio(updated)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this stock?')) return
    const updated = portfolio.filter(p => p.id !== id)
    setPortfolio(updated)
    savePortfolio(updated)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>📈 Stock Portfolio Tracker</h1>
        <div className="grid">
          <div className="panel">
            <h2>{editing ? 'Edit Stock' : 'Add Stock'}</h2>
            <StockForm
              initial={editing || {}}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>

          <div className="panel wide">
            <h2>My Portfolio</h2>
            {portfolio.length === 0 ? (
              <p className="muted">No stocks added yet.</p>
            ) : (
              <PortfolioTable
                data={portfolio}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>

        <div className="panel charts-section">
          <h2>Stock Charts</h2>
          <StockCharts history={historyData ?? null} />
        </div>
      </div>
    </QueryClientProvider>
  )
}
