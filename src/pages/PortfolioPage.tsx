import React, { useEffect } from "react";
import { usePortfolioStore } from "../store/portfolioStore";
import { MOCK_STOCKS } from "../api/mockStockData";
import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
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

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Ticker</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Company Name</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Quantity</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Purchase Price</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Date of Purchase</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.ticker}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.companyName}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.quantity}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.purchasePrice}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{stock.dateOfPurchase}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stock Performance (Line Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          {stocks.map((stock) => stock.historical && (
            <Line
              key={stock.id}
              data={stock.historical}
              dataKey="close"
              name={stock.ticker}
              stroke={"#" + Math.floor(Math.random()*16777215).toString(16)}
            />
          ))}
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <h3>Trading Volume (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart>
          {stocks.map((stock) => stock.historical && (
            <Bar
              key={stock.id}
              data={stock.historical}
              dataKey="volume"
              name={stock.ticker}
              fill={"#" + Math.floor(Math.random()*16777215).toString(16)}
            />
          ))}
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
