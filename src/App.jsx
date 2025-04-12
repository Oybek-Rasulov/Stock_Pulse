import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./pages/ForgetPassword";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Convertor from "./pages/Convertor";
import StocksPage from "./pages/StocksPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tools from "./pages/Tools";
import InvestmentInsights from "./pages/InvestmentInsights";
import { StockDataProvider } from './context/StockDataContext';

export default function App() {
  return <>
      <StockDataProvider>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/convertor" element={<Convertor />} />
          <Route path="*" element={<NotFound />} />
          {/* Pages */}
          <Route path="/" element={<Home />} />          
          <Route path="/stocks" element={<StocksPage />} />          
          <Route path="/charts" element={<Tools />} />          
          <Route path="/insights" element={<InvestmentInsights />} />          
        </Routes>
      </StockDataProvider>
    </>
}
