import assets from "../assets";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const mediaScreen = useMediaQuery({ maxWidth: 1200 });

  const [close, setClose] = useState(mediaScreen ? false : true);
  const user = JSON.parse(localStorage.getItem("user"));

  function handleClose() {
    setClose((current) => !current);
  }

  const navItems = [
    { label: "Home", path: "/", icon: assets.home },
    { label: "Converter", path: "/convertor", icon: assets.exchange },
    { label: "Stocks", path: "/stocks", icon: assets.chart },
    { label: "Charts", path: "/charts", icon: assets.chart },
    { label: "Insights", path: "/insights", icon: assets.insight },
  ];

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {close ? (
        <div className={`sidebar ${mediaScreen && "z-index"}`}>
          {mediaScreen && (
            <button className="sidebar-close" onClick={handleClose}>
              <img className="icon" src={assets.close} alt="close icon" />
            </button>
          )}
          <div className="logo-details mb2">
            <img src={assets.logo} alt="logo" className="logo" />
            <h2>Stock Pulse</h2>
          </div>

          <div className="menu">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="menu-li">
                  <button
                    className={`menu-link ${location.pathname === item.path ? "active-link" : ""}`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <img className="icon-menu" src={item.icon} alt="icon" />
                    {item.label}
                  </button>
                </li>
              ))}

              {/* Logout Button */}
              {user && (
                <li className="menu-li">
                  <button className="menu-link" onClick={handleLogout}>
                    <img className="icon-menu" src={assets.logout} alt="icon" />
                    Chiqish
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="open-sidebar">
          <button onClick={handleClose}>
            <img className="icon" src={assets.menu} alt="menu" />
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
