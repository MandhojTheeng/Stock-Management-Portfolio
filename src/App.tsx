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
  const portfolio = usePortfolioStore(state => state.stocks);
  const addStock = usePortfolioStore(state => state.addStock);
  const updateStock = usePortfolioStore(state => state.updateStock);
  const deleteStock = usePortfolioStore(state => state.deleteStock);

  const [editing, setEditing] = useState<PortfolioStock | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const { data: historyData } = useQuery<StockHistory>({
    queryKey: ['stockHistory', selectedSymbol],
    queryFn: () => fetchMockStockHistory(selectedSymbol ?? ''),
    enabled: !!selectedSymbol,
  });

  const handleSave = (stock: PortfolioStock) => {
    if (editing) updateStock(stock);
    else addStock(stock);
    setEditing(null);
    setSelectedSymbol(stock.ticker);
    setShowForm(false);
  };

  const filteredPortfolio = portfolio.filter(stock =>
    stock.company.toLowerCase().includes(search.toLowerCase()) ||
    stock.ticker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          📊 Stock Portfolio Tracker
        </h1>

        {/* Add & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded shadow transition-all"
          >
            {showForm ? 'Close Form' : 'Add Stock'}
          </button>

          <input
            type="text"
            placeholder="Search by ticker or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Stock Form */}
        {showForm && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all">
            <h2 className="text-2xl font-semibold mb-4">{editing ? 'Edit Stock' : 'Add New Stock'}</h2>
            <StockForm
              initial={editing || {}}
              onSave={handleSave}
              onCancel={() => { setEditing(null); setShowForm(false); }}
            />
          </div>
        )}

        {/* Portfolio Table */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">My Portfolio</h2>
          {filteredPortfolio.length === 0 ? (
            <p className="text-gray-500">No stocks added yet.</p>
          ) : (
            <PortfolioTable
              data={filteredPortfolio}
              onEdit={(stock) => { setEditing(stock); setShowForm(true); }}
              onDelete={(id) => {
                if (confirm('Delete this stock?')) deleteStock(id);
              }}
              onSelectSymbol={(symbol) => setSelectedSymbol(symbol)}
            />
          )}
        </div>

        {/* Stock Charts */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Stock Charts</h2>
          {selectedSymbol ? (
            <StockCharts history={historyData ?? null} />
          ) : (
            <p className="text-gray-500">Select a stock from your portfolio to view charts.</p>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
