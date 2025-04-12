import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import assets from "../assets";
import { Link } from 'react-router-dom';

function Account({ isOpen }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      {!isOpen && (
        <div className="account">
          <Toggle />

          {user ? (
            <div className="account-content">
              <h4 className="user-name">{user.name || "User"}</h4>
              <img
                className="user-icon"
                src={user.photo || assets.man}
                alt="user"
              />
            </div>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </div>
      )}
    </>
  );
}

export default Account;
