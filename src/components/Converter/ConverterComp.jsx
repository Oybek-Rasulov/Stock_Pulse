import axios from 'axios';
import { useEffect, useState } from 'react';

const apiKey = "accWUCnRtb63IfVNN3CsFB8nIF9kBgmw";

function ConverterComp() {
    const [stockDetails, setStockDetails] = useState({ name: "AAPL", amount: "10", currency: "USD" });
    const [stockPrice, setStockPrice] = useState(0);
    const [currency, setCurrency] = useState(0);

    function getValue(e) {
        const { value, name } = e.target;
        setStockDetails((current) => ({ ...current, [name]: value }));
    }

    useEffect(() => {
        async function getStockDetails() {
            try {
                const res = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockDetails.name}?apikey=${apiKey}`);
                setStockPrice(res.data.length > 0 ? res.data[0].price : null);
            } catch (err) {
                console.error("Failed to fetch stock price", err);
            }
        }

        getStockDetails();
    }, [stockDetails.name]);

    useEffect(() => {
        async function getCurrencyPrice() {
            try {
                const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
                setCurrency(res.data.rates[stockDetails.currency]);
            } catch (err) {
                console.error("Failed to fetch exchange rate", err);
            }
        }

        getCurrencyPrice();
    }, [stockDetails.currency]);

    return (
        <div className="converter">
            <form>
                <label htmlFor="name">Enter Stock Symbol:</label>
                <input
                    type="text"
                    placeholder="AAPL"
                    name="name"
                    value={stockDetails.name}
                    onChange={getValue}
                    required
                />

                <label htmlFor="amount">Enter Amount of Shares:</label>
                <input
                    type="text"
                    placeholder="10"
                    name="amount"
                    value={stockDetails.amount}
                    onChange={getValue}
                    required
                />

                <label htmlFor="currency">Select Currency:</label>
                <select
                    id="currency"
                    name="currency"
                    value={stockDetails.currency}
                    onChange={getValue}
                    required
                >
                    <option value="USD">USD</option>
                    <option value="UZS">UZS</option>
                    <option value="EUR">EUR</option>
                </select>
            </form>

            <div className="convert-result">
                <p className='mb1'>Stock Price: {stockPrice} $</p>
                <p className='mb2'>Exchange Rate: {currency} {stockDetails.currency}</p>
                <h3 className='green'>
                    Result: {Math.floor((stockPrice * Number(stockDetails.amount)) * currency)}{" "}
                    {stockDetails.currency === 'UZS' ? "UZS" : stockDetails.currency === 'USD' ? "$" : "€"}
                </h3>
            </div>
        </div>
    );
}

export default ConverterComp;
