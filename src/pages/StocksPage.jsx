import Sidebar from "../components/ReusableTemp/Sidebar";
import SearchStock from "../components/ReusableTemp/SearchStock";
import Title from "../components/ReusableTemp/Title";
import StocksTemp from "../components/Stocks/StocksTemp";
import { useMediaQuery } from "react-responsive";
import Account from "../components/ReusableTemp/Account";
import LastNews from "../components/ReusableTemp/LastNews";
import Stocks from "./Stocks";
import OtherStocks from "./OtherStocks";

import {useState} from "react";

function StocksPage() {
    const mediaScreen = useMediaQuery({maxWidth: 1200});
    const [stockSearchData, setStockSearchData] = useState("")

    function stockSearch(stock) {
        setStockSearchData(stock)
    }

    return (
        <div className="main">
            <Sidebar />
            <div className={`news ${mediaScreen && "position-absolute"}`}>
                <LastNews />
                <Title title="Aksiyalar" position="start" size="1.3rem" />
                <div className="stocks-page">
                    <SearchStock stockSearch={stockSearch} />
                    <StocksTemp stockSearchData={stockSearchData} />
                </div>
            </div>
            <div className="user-sidebar">
                <Account isOpen={mediaScreen} />
                <Stocks isOpen={mediaScreen} />
                <OtherStocks isOpen={mediaScreen} />
            </div>

        </div>
    )
}

export default StocksPage
