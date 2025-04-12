import React from 'react';
import { useStock } from '../../Context/StockContext'; // adjust path if needed

const StockSelector = () => {
  const { stockSymbol, setStockSymbol } = useStock();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <select
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
        className="stock-select"
      >
        <option value="AAPL">Apple</option>
        <option value="MSFT">Microsoft</option>
        <option value="GOOGL">Alphabet</option>
        <option value="TSLA">Tesla</option>
        <option value="AMZN">Amazon</option>
      </select>
    </div>
  );
};

export default StockSelector;

