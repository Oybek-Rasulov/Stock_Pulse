import React from 'react';
import { useStock } from '../../Context/StockContext';

const Insights = () => {
  const { stockSymbol, setStockSymbol, stockData, loading } = useStock();
const symbols = [
  { name: "Apple", symbol: "AAPL" },
  { name: "Microsoft", symbol: "MSFT" },
  { name: "Alphabet (Google)", symbol: "GOOGL" },
  { name: "Tesla", symbol: "TSLA" },
  { name: "Amazon", symbol: "AMZN" },
  { name: "Meta (Facebook)", symbol: "META" },
  { name: "NVIDIA", symbol: "NVDA" },
  { name: "Netflix", symbol: "NFLX" },
  { name: "Adobe", symbol: "ADBE" },
  { name: "Intel", symbol: "INTC" },
  { name: "Advanced Micro Devices", symbol: "AMD" },
  { name: "PayPal", symbol: "PYPL" },
  { name: "Salesforce", symbol: "CRM" },
  { name: "Qualcomm", symbol: "QCOM" },
  { name: "Oracle", symbol: "ORCL" },
  { name: "IBM", symbol: "IBM" },
  { name: "Walmart", symbol: "WMT" },
  { name: "Coca-Cola", symbol: "KO" },
  { name: "PepsiCo", symbol: "PEP" },
  { name: "McDonald's", symbol: "MCD" },
  { name: "Procter & Gamble", symbol: "PG" },
  { name: "Johnson & Johnson", symbol: "JNJ" },
  { name: "Pfizer", symbol: "PFE" },
  { name: "Bank of America", symbol: "BAC" },
  { name: "JPMorgan Chase", symbol: "JPM" },
  { name: "Visa", symbol: "V" },
  { name: "Mastercard", symbol: "MA" },
  { name: "Chevron", symbol: "CVX" },
  { name: "ExxonMobil", symbol: "XOM" },
  { name: "Berkshire Hathaway", symbol: "BRK.B" }
];


  const generateInsights = () => {
    if (!stockData) return [];

    const insights = [];

    if (stockData.dcf > stockData.price) {
      insights.push({ message: "Stock is undervalued based on DCF", icon: "✅" });
    } else {
      insights.push({ message: "Stock is overvalued based on DCF", icon: "❌" });
    }

    if (stockData.beta > 1.2) {
      insights.push({ message: "High volatility stock (Beta > 1.2)", icon: "⚠️" });
    } else {
      insights.push({ message: "Low to moderate volatility", icon: "✅" });
    }

    if (stockData.mktCap > 1e12) {
      insights.push({ message: "Large cap stock — typically more stable", icon: "✅" });
    } else {
      insights.push({ message: "Mid/small cap stock — potentially riskier", icon: "⚠️" });
    }

    if (stockData.lastDiv === 0) {
      insights.push({ message: "No dividend payout", icon: "❌" });
    } else {
      insights.push({ message: `Dividend paying stock (${stockData.lastDiv})`, icon: "✅" });
    }

    return insights;
  };

  return (
    <div className="insight-card">
      {/* Stock Selector */}
      <div className="selector-wrapper">
        <label htmlFor="stock-select">Select Stock:</label>
        <select
          id="stock-select"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          className="stock-select"
        >
          {symbols.map((item) => (
            <option key={item.symbol} value={item.symbol}>
              {item.name} ({item.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Display Content */}
      {loading ? (
        <p style={{ color: 'white' }}>Loading insights...</p>
      ) : stockData ? (
        <>
          <div className="stock-header">
            <img src={stockData.image} alt={stockData.symbol} className="stock-logo" />
            <div className="stock-info">
              <h2>{stockData.companyName}</h2>
              <p>({stockData.symbol})</p>
            </div>
          </div>

          <h3 className="insight-title">📌 Investment Insights</h3>
          <ul className="insight-list">
            {generateInsights().map((item, idx) => (
              <li key={idx} className="insight-item">
                <span className="icon">{item.icon}</span>
                <span>{item.message}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p style={{ color: 'white' }}>No stock data found</p>
      )}
    </div>
  );
};

export default Insights;
