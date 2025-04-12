import Sidebar from "../components/ReusableTemp/Sidebar";
import Search from "../components/ReusableTemp/Search";
import Title from "../components/ReusableTemp/Title";
import News from "../components/ReusableTemp/News";
import { useMediaQuery } from "react-responsive";
import Account from "../components/ReusableTemp/Account";
import Stocks from "./Stocks";
import OtherStocks from "./OtherStocks";
import {useState} from 'react';

function Home() {
    const mediaScreen = useMediaQuery({maxWidth: 1200})

    const [searchData, setSearchData] = useState("");

    function sendSearch(search) {
        setSearchData(search);
    }   

    return (
        <div className="main">
            <Sidebar />
            <div className={`news ${mediaScreen && "position-absolute"}`}>
                <Search sendSearch={sendSearch} />
                <Title title="Yangiliklar" position="start" size="1.3rem" />
                <News searchData={searchData} />
            </div>
            <div className="user-sidebar">
                <Account isOpen={mediaScreen} />
                <Stocks isOpen={mediaScreen} />
                <OtherStocks isOpen={mediaScreen} />
            </div>

        </div>
    )
}

export default Home
