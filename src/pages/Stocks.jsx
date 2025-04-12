import {useState, useEffect} from 'react';
import axios from "axios";
import assets from '../components/assets';
import { Link } from 'react-router-dom';

const apiKey = "accWUCnRtb63IfVNN3CsFB8nIF9kBgmw";
const url = `https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA,MSFT,AMZN,GOOGL?apikey=${apiKey}`

function Stocks({isOpen}) {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        async function getStocks() {
            await axios.get(url)
                .then(res => setStocks([...res.data]))

        }

        getStocks();
        const interval = setInterval(getStocks, 3600000);

        return () => clearInterval(interval);
    },[])

    return ( 
        <>
        {
            isOpen ? "" :
            <Link to="/stocks" className="link">
                <div className="stocks">
                    <h4 className="stocks-title">Mashxur Aksiyalar</h4>

                    <div className="top-stocks">
                        {stocks.map((stock, i) => <div key={i} className='stock'>
                                <div className='stock-name'>
                                    <img className='stock-logo' src={stock.image} alt="logo" />
                                    <p>{stock.companyName}</p>
                                </div>
                                <div className='stock-status'>
                                    <p>{stock.price} USD</p>
                                    <p className={stock.changes < 0 ? "red" : "green"}>{stock.changes > 0 && "+"} {((stock.changes / (stock.price - stock.changes)) * 100).toFixed(2)} %</p>
                                    <p>{stock.changes < 0 ? <img src={assets.decrease} /> : <img src={assets.increase} />}</p>
                                </div>
                            
                            </div>)}
                    </div>
                </div>
            </Link> 
        }
    </>)
}

export default Stocks
