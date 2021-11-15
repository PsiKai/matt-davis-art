import React, { useContext, useEffect, useState} from 'react';
import '../../styles/navbar.css'
import {Link} from 'react-router-dom';
import AppContext from "../../context/AppContext";
import AuthContext from "../../context/authContext";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';


const Header = ({routes, preload}) => {
  const [
    Main, About, Prints, Contact,
    Gallery, Sculptures, Cart, Login, Edit  
  ] = routes
  const appContext = useContext(AppContext);
  const {cartItems, reloadCart} = appContext;
  const authContext = useContext(AuthContext);
  const {isAuthenticated, loadUser} = authContext;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    reloadCart();
    localStorage.token && loadUser();
    // eslint-disable-next-line 
  }, [])

  const navigate = () => {
    setOpen(false); 
    window.scrollTo(0,0); 
  }

  const openSidenav = () => {
    setOpen(!open)
    routes.forEach(route => preload(route))
  }

    return (
        <header>
          <Link to="/" className="header--main-link">
            <h1 onClick={navigate}  onMouseOver={() => preload(Main)}>Matt Davis</h1>
          </Link>

          <div className="menu__burger-icon" onClick={openSidenav}>
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
            <li onClick={navigate} onMouseOver={() => preload(About)}>
              <Link to="/about">About</Link>
            </li>

            <li onClick={navigate} onMouseOver={() => preload(Prints)}>
              <Link to="/prints">Store</Link>
            </li>

            <li onClick={navigate} onMouseOver={() => preload(Contact)}>
              <Link to="/contact">Contact</Link>
            </li>

            <li onClick={navigate} onMouseOver={() => preload(Gallery)}>
              <Link to="/gallery">Gallery</Link>
            </li>

            <li onClick={navigate} onMouseOver={() => preload(Sculptures)}>
              <Link to="/sculptures">Sculptures</Link>
            </li>

            <li onClick={navigate} onMouseOver={() => preload(Cart)}>
              <Link to="/cart" className="cart-link">
                <Badge 
                  badgeContent={cartItems} 
                  style={{
                    color: "var(--medium)", 
                    backgroundColor: "var(--medium)", 
                    }}
                >
                  <ShoppingCartOutlinedIcon 
                    style={{
                      color: "var(--white-two)", 
                      backgroundColor: "var(--dark)"
                      }}    
                  />
                </Badge>
              </Link>
            </li>
            
            <li onClick={() => setOpen(false)}>
              <Link to="/edit" className="login-edit">
                {isAuthenticated ?
                  <EditIcon 
                    onMouseOver={() => preload(Edit)}
                    style={{position: "relative", top: "6px"}}  
                  /> : 
                  <ExitToAppIcon
                      onMouseOver={() => preload(Login)} 
                    style={{
                      color: "var(--light-two)", 
                      position: "relative", 
                      top: "6px"
                      }}
                  />}
              </Link>
            </li>
          </ul>
        </div>
      </header>
    )
}

export default Header
