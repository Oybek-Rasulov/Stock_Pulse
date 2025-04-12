import {useState, useEffect} from 'react';
import axios from 'axios';
import assets from '../components/assets';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const apiKey = "accWUCnRtb63IfVNN3CsFB8nIF9kBgmw";
const symbols = [
    "TSLA", "META", "NFLX", "AMD", "INTC",
    "BA", "UBER", "PYPL", "ADBE", "DIS",
    "JPM", "V", "KO", "PEP", "MRNA",
    "COST", "WMT", "XOM", "GS", "NKE"
];
const url = `https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apiKey}`

function OtherStocks({isOpen}) {
    const mediaScreen = useMediaQuery({maxWidth: 1200})
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
        <>
            { isOpen ? "" :
            <Link to="/stocks" className='link'>
                <div className="other-stocks stocks">
                    <h4 className="stocks-title">Aksiyalar</h4>

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
            </Link>}
        </>
    )
}

export default OtherStocks
