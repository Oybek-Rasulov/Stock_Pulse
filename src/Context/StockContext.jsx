import React, { createContext, useContext, useState, useEffect } from 'react';

const StockDataContext = createContext();

const apiKey = "accWUCnRtb63IfVNN3CsFB8nIF9kBgmw";


export const StockDataProvider = ({ children }) => {
  const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default symbol
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${apiKey}`,
        );
        const json = await response.json();

        // Make sure the symbol matches what we requested
        if (json[0] && json[0].symbol === stockSymbol) {
          setStockData(json[0]);
        } else {
          console.warn("Unexpected data returned", json);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [stockSymbol]); // 👈 this MUST be here to refetch on change

  return (
    <StockDataContext.Provider value={{ stockSymbol, setStockSymbol, stockData, loading }}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStock = () => useContext(StockDataContext);
