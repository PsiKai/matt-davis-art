import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppContext from "../context/AppContext";

const Header = () => {
  const appContext = useContext(AppContext);
  const {cartItems, getArt} = appContext;

  useEffect(() => {
    getArt();
  }, [])

    return (
        <header>
            <Link to="/">
                <h1>Artist Matt Davis</h1>
            </Link>
            <ul className="header-links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/prints">Prints</Link>
              </li>
              <li>TP Man Comics</li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/cart">Cart ({cartItems})</Link>
              </li>
            </ul>
            
        </header>
    )
}

export default Header