import Sidebar from "../components/ReusableTemp/Sidebar";
import Search from "../components/ReusableTemp/Search";
import Title from "../components/ReusableTemp/Title";
import { useMediaQuery } from "react-responsive";
import Account from "../components/ReusableTemp/Account";
import Stocks from "./Stocks";
import OtherStocks from "./OtherStocks";
import Charts from "../components/Charts/Charts";
import {useState} from 'react';
import StockSelector from "../components/Charts/StockSelector";


function Tools() {
    const mediaScreen = useMediaQuery({maxWidth: 1200})

    const [searchData, setSearchData] = useState("");

    function sendSearch(search) {
        setSearchData(search);
    }   

    return (
        <div className="main">
            <Sidebar />
            <div className={`scroll tool-container news ${mediaScreen && "position-absolute"}`}>
                <StockSelector />
                <Title title="Chart (Analyze of the stock)" position="start" size="1.3rem" />
                <Charts />
            </div>
            <div className="user-sidebar">
                <Account isOpen={mediaScreen} />
                <Stocks isOpen={mediaScreen} />
                <OtherStocks isOpen={mediaScreen} />
            </div>

        </div>
    )
}

export default Tools
