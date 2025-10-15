import React, { useState } from 'react'
import type { PortfolioStock } from '../types'

type Props = {
  initial?: Partial<PortfolioStock>
  onSave: (stock: PortfolioStock) => void
  onCancel: () => void
}

export default function StockForm({ initial = {}, onSave, onCancel }: Props) {
  const [ticker, setTicker] = useState(initial.ticker || '')
  const [company, setCompany] = useState(initial.company || '')
  const [quantity, setQuantity] = useState(initial.quantity || 0)
  const [purchasePrice, setPurchasePrice] = useState(initial.purchasePrice || 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticker || !company || quantity <= 0 || purchasePrice <= 0) return
    onSave({
      id: initial.id || crypto.randomUUID(),
      ticker,
      company,
      quantity,
      purchasePrice,
      currentPrice: purchasePrice,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <label>Ticker</label>
      <input value={ticker} onChange={e => setTicker(e.target.value)} />
      <label>Company</label>
      <input value={company} onChange={e => setCompany(e.target.value)} />
      <label>Quantity</label>
      <input type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} />
      <label>Purchase Price</label>
      <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(+e.target.value)} />
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} className="muted">Cancel</button>
      </div>
    </form>
  )
}
