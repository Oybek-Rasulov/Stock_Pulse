import Sidebar from "../components/ReusableTemp/Sidebar";
import Title from "../components/ReusableTemp/Title";
import { useMediaQuery } from "react-responsive";
import Account from "../components/ReusableTemp/Account";
import Stocks from "./Stocks";
import OtherStocks from "./OtherStocks";
import Insights from "../components/Insights/Insights";


function InvestmentInsights() {
    const mediaScreen = useMediaQuery({maxWidth: 1200})
 

    return (
        <div className="main">
            <Sidebar />
            <div className={`tool-container news ${mediaScreen && "position-absolute"}`}>
                <Title title="Insights" position="start" size="1.3rem" />
                <Insights />
            </div>
            <div className="user-sidebar">
                <Account isOpen={mediaScreen} />
                <Stocks isOpen={mediaScreen} />
                <OtherStocks isOpen={mediaScreen} />
            </div>

        </div>
    )
}

export default InvestmentInsights
