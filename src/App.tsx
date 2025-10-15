import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fetchMockStockHistory } from './api/mockApi';
import StockForm from './components/StockForm';
import PortfolioTable from './components/PortfolioTable';
import StockCharts from './components/StockCharts';
import { usePortfolioStore } from './store/portfolioStore';
import type { PortfolioStock, StockHistory } from './types';

const queryClient = new QueryClient();

export default function App() {
  const portfolio = usePortfolioStore(state => state.portfolio);
  const addStock = usePortfolioStore(state => state.addStock);
  const updateStock = usePortfolioStore(state => state.updateStock);
  const deleteStock = usePortfolioStore(state => state.deleteStock);

  const [editing, setEditing] = useState<PortfolioStock | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const { data: historyData } = useQuery<StockHistory>({
    queryKey: ['stockHistory', selectedSymbol],
    queryFn: () => fetchMockStockHistory(selectedSymbol ?? ''),
    enabled: !!selectedSymbol
  });

  const handleSave = (stock: PortfolioStock) => {
    if (editing) updateStock(stock);
    else addStock(stock);
    setEditing(null);
    setSelectedSymbol(stock.ticker);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">📈 Stock Portfolio Tracker</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <StockForm
              initial={editing || {}}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <PortfolioTable
              data={portfolio}
              onEdit={(stock) => setEditing(stock)}
              onDelete={(id) => {
                if (confirm('Delete this stock?')) deleteStock(id);
              }}
            />

            <div>
              <h2 className="text-xl font-semibold mb-2">Stock Charts</h2>
              <StockCharts history={historyData ?? null} />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
