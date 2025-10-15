import React, { useState, useEffect } from 'react';
import type { PortfolioStock } from '../types';

type Props = {
  initial?: Partial<PortfolioStock>;
  onSave: (stock: PortfolioStock) => void;
  onCancel: () => void;
};

export default function StockForm({ initial = {}, onSave, onCancel }: Props) {
  const [ticker, setTicker] = useState(initial.ticker || '');
  const [company, setCompany] = useState(initial.company || '');
  const [quantity, setQuantity] = useState(initial.quantity || 0);
  const [purchasePrice, setPurchasePrice] = useState(initial.purchasePrice || 0);
  const [purchaseDate, setPurchaseDate] = useState(initial.purchaseDate || '');

  useEffect(() => {
    if (!purchaseDate) setPurchaseDate(new Date().toISOString().slice(0, 10));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker || !company || quantity <= 0 || purchasePrice <= 0) return;
    onSave({
      id: initial.id || crypto.randomUUID(),
      ticker,
      company,
      quantity,
      purchasePrice,
      currentPrice: purchasePrice,
      purchaseDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold">{initial.id ? 'Edit Stock' : 'Add Stock'}</h3>

      <div>
        <label className="block font-medium">Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Company</label>
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(+e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Purchase Price</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          value={purchasePrice}
          onChange={e => setPurchasePrice(+e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Date of Purchase</label>
        <input
          type="date"
          value={purchaseDate}
          onChange={e => setPurchaseDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
