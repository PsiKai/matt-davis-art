import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppContext from "../context/AppContext";
import AuthContext from "../context/authContext";

const Header = () => {
  const appContext = useContext(AppContext);
  const {cartItems, reloadCart} = appContext;
  const authContext = useContext(AuthContext);
  const {isAuthenticated, loadUser} = authContext;

  useEffect(() => {
    reloadCart();
    loadUser();
    // eslint-disable-next-line 
  }, [])

    return (
        <header>
            <Link to="/main">
                <h1>Artist Matt Davis</h1>
            </Link>
            <ul className="header-links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/prints">Prints</Link>
              </li>
              <li>
                <Link to="/comics">TP Man Comics</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/cart">Cart ({cartItems})</Link>
              </li>
              <li>
                <Link to="/login">
                  {isAuthenticated ? "Edit" : "Login"}
                </Link>
              </li>
            </ul>
            
        </header>
    )
}

export default Header
