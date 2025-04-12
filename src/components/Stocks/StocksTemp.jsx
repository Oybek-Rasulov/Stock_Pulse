import { useEffect, useState } from 'react';
import { useStockContext } from '../../Context/StockDataContext';
import assets from '../assets';

function StocksTemp({ stockSearchData }) {
  const { stocks, loading, error } = useStockContext();
  const [searchedStock, setSearchedStock] = useState([]);

  useEffect(() => {
    if (stockSearchData.length > 1) {
      const filtered = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(stockSearchData.toLowerCase())
      );
      setSearchedStock(filtered);
    } else {
      setSearchedStock(stocks);
    }
  }, [stockSearchData, stocks]);

  if (loading) return <p className="loading">Loading stocks...</p>;
  if (error) return <p className="error">Error loading stocks: {error}</p>;

  return (
    <div className='table-container'>
      <table className='stocks-table' id='table'>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Change</th>
            <th>Price</th>
            <th>Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {searchedStock.map((stock, i) => (
            <tr key={i}>
              <td>
                <img className='stock-logo' src={stock.image} alt="logo" />
                {stock.symbol}
              </td>
              <td style={{ color: stock.changes > 0 ? 'rgb(95, 255, 95)' : 'rgb(255, 100, 100)' }}>
                {stock.changes > 0 ? `+ ${stock.changes} $` : `${stock.changes} $`}
              </td>
              <td>{stock.price} $</td>
              <td style={{ color: stock.changes > 0 ? 'rgb(95, 255, 95)' : 'rgb(255, 100, 100)' }}>
                {((stock.changes / (stock.price - stock.changes)) * 100).toFixed(2)} %
              </td>
              <td>
                <img src={stock.changes > 0 ? assets.increase : assets.decrease} alt="change-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StocksTemp;
