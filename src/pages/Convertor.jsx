import Sidebar from "../components/ReusableTemp/Sidebar";
import Search from "../components/ReusableTemp/Search";
import Title from "../components/ReusableTemp/Title";
import News from "../components/ReusableTemp/News";
import { useMediaQuery } from "react-responsive";
import Account from "../components/ReusableTemp/Account";
import Stocks from "./Stocks";
import OtherStocks from "./OtherStocks";
import ConverterComp from "../components/Converter/ConverterComp";


function Convertor() {
    const mediaScreen = useMediaQuery({maxWidth: 1200})
    return (
        <div className="main">
            <Sidebar />
            <div className={`news ${mediaScreen && "position-absolute"}`}>
                <Search />
                <Title title="Convertor" position="start" size="1.3rem" />
                <ConverterComp />
            </div>
            <div className="user-sidebar">
                <Account isOpen={mediaScreen} />
                <Stocks isOpen={mediaScreen} />
                <OtherStocks isOpen={mediaScreen} />
            </div>

        </div>
    )
}

export default Convertor
