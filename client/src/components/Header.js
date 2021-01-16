import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AppContext from "../context/AppContext";
import AuthContext from "../context/authContext";

const Header = () => {
  const appContext = useContext(AppContext);
  const {cartItems, reloadCart} = appContext;
  const authContext = useContext(AuthContext);
  const {isAuthenticated, loadUser} = authContext;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    reloadCart();
    loadUser();
    console.log(getComputedStyle(document.querySelector("html")).width);
    // eslint-disable-next-line 
  }, [])



    return (
        <header>
          
            <Link to="/">
                <h1>Artist Matt Davis</h1>
            </Link>
            <div className="menu__burger-icon" onClick={() => setOpen(!open)}>
                  <span style={open ? 
                    {transform: "rotate(45deg)"} : 
                    {transform: "none"}}>
                  </span>
                  <span style={open ? {width: "0"} : {width: "33px"}}></span>
                  <span style={open ? 
                    {transform: "rotate(-45deg)"} : 
                    {transform: "none"}}>
                  </span>
            </div>
            <div className="menu" style={open ? {transform: "translateX(0)"} : {transform: "translateX(100%)"}}>
              
            <ul className="header-links">
              <li onClick={() => setOpen(false)}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/prints">Prints</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/comics">TP Man Comics</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/cart">Cart ({cartItems})</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/login">
                  {isAuthenticated ? "Edit" : "Login"}
                </Link>
              </li>
            </ul>
            </div>
            {/* </Fragment>
            :
            <ul className="header-links">
              <li>
                <Link to="/about" className="menu-item">About</Link>
              </li>
              <li>
                <Link to="/prints" className="menu-item">Prints</Link>
              </li>
              <li>
                <Link to="/comics" className="menu-item">TP Man Comics</Link>
              </li>
              <li>
                <Link to="/gallery" className="menu-item">Gallery</Link>
              </li>
              <li>
                <Link to="/cart" className="menu-item">Cart ({cartItems})</Link>
              </li>
              <li>
                <Link to="/login" className="menu-item">
                  {isAuthenticated ? "Edit" : "Login"}
                </Link>
              </li>
              <a className="menu-item--small"></a>
            </ul>} */}
        </header>
    )
}

export default Header
