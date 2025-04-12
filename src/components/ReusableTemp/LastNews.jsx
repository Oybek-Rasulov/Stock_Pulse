import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "accWUCnRtb63IfVNN3CsFB8nIF9kBgmw";
const symbols = [
    "TSLA", "META", "NFLX", "AMD", "INTC",
    "BA", "UBER", "PYPL", "ADBE", "DIS",
    "JPM", "V", "KO", "PEP", "MRNA",
    "COST", "WMT", "XOM", "GS", "NKE"
];

const url = `https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apiKey}`

const news = ["SOmething Something"];

function LastNews({content}) {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        async function getStocks() {
            await axios.get(url)
                .then(res => setStocks((current) => [...current, ...res.data]))

        }

        getStocks();
        const interval = setInterval(getStocks, 3600000);

        return () => clearInterval(interval);
    },[])
    return (
        <div className="last-news mb2">
          <div className="news-ticker">
            {stocks.map((stock, index) => (
              <span key={index} className="news-item">
                <span key={index} className={stock.changes > 0 ? "green" : "red"}>
                    {stock.symbol}: {stock.price} USD ({stock.changes > 0 ? "▲" : "▼"} {((stock.changes / (stock.price - stock.changes)) * 100).toFixed(2)} %)
                </span>
              </span>
            ))}
          </div>
        </div>
      );
    };

export default LastNews;
