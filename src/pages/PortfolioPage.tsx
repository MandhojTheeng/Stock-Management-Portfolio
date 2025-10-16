import { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { MOCK_STOCKS } from "../api/mockStockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PortfolioPage() {
  const stocks = usePortfolioStore((state) => state.stocks);
  const addStock = usePortfolioStore((state) => state.addStock);
  const loadFromLocalStorage = usePortfolioStore((state) => state.loadFromLocalStorage);

  useEffect(() => {
    loadFromLocalStorage();
    if (stocks.length === 0) {
      MOCK_STOCKS.forEach(addStock);
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h2>Portfolio</h2>
      <p>Below are the stocks currently in your portfolio.</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "2rem",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Ticker</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Company</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Quantity</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Purchase Price</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Current Price</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.ticker}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.company}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.quantity}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.purchasePrice}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.currentPrice}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.purchaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stock Prices (Mock Line Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stocks.map(s => ({
          name: s.ticker,
          value: s.currentPrice
        }))}>
          <Line type="monotone" dataKey="value" stroke="#0088FE" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <h3>Quantities (Mock Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stocks.map(s => ({
          name: s.ticker,
          quantity: s.quantity
        }))}>
          <Bar dataKey="quantity" fill="#00C49F" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
