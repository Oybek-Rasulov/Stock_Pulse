import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StockDataContext = createContext(); // ✅ renamed

const apiKey = "accWUCnRtb63IfVNN3CsFB8nIF9kBgmw";
const symbols = [
  "TSLA", "META", "NFLX", "AMD", "INTC",
  "BA", "UBER", "PYPL", "ADBE", "DIS",
  "JPM", "V", "KO", "PEP", "MRNA",
  "COST", "WMT", "XOM", "GS", "NKE"
];

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get(
          `https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apiKey}`
        );
        setStocks(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch stocks:", err);
        setError("API limit reached or connection issue.");
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <StockDataContext.Provider value={{ stocks, loading, error }}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockContext = () => useContext(StockDataContext); // ✅ still keep the hook name same if you like
