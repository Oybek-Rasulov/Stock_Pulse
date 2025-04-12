import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useStock } from '../../Context/StockContext';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28'];

const Charts = () => {
  const { stockData, loading } = useStock();

  if (loading) return <p style={{ color: 'white' }}>Loading chart...</p>;
  if (!stockData) return <p style={{ color: 'white' }}>No stock data available</p>;

  const chartData = [
    { name: 'Price (USD)', value: stockData.price },
    { name: 'DCF (USD)', value: stockData.dcf },
    { name: 'Market Cap (T)', value: stockData.mktCap / 1e12 },
    { name: 'Vol Avg (M)', value: stockData.volAvg / 1e6 },
    { name: 'Dividend', value: stockData.lastDiv },
    { name: 'Beta', value: stockData.beta },
  ];

  return (
    <div className="chart-wrapper">
      {/* Bar Chart */}
      <div className="chart-card">
        <h2 className="chart-title">Stock Metrics (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-card">
        <h2 className="chart-title">Stock Composition (Pie Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
