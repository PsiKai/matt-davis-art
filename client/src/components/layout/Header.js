import React, { useContext, useEffect, useState } from "react"
import "../../styles/navbar.css"
import { Link } from "react-router-dom"
import AppContext from "../../context/AppContext"
import AuthContext from "../../context/authContext"
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Badge from "@material-ui/core/Badge"
import EditIcon from "@material-ui/icons/Edit"
import Hamburger from "./Hamburger"
import { useCart } from "../../hooks/cartSetters"
import { useAuth } from "../../hooks/userAuth"

const Header = ({ routes, preload }) => {
  const [Main, About, Prints, Contact, Gallery, Sculptures, Cart, Login, Edit] = routes
  const { cartItems } = useContext(AppContext)
  const { isAuthenticated } = useContext(AuthContext)

  const [open, setOpen] = useState(false)

  const loadUser = useAuth()
  const { reloadCart } = useCart()

  useEffect(() => {
    localStorage.cart && reloadCart()
    localStorage.token && loadUser()
    // eslint-disable-next-line
  }, [])

  const navigate = () => {
    setOpen(false)
    window.scrollTo(0, 0)
  }

  const openSidenav = () => {
    setOpen(!open)
    routes.forEach(route => preload(route))
  }

  const focusIn = e => {
    if (e.target === e.currentTarget) return
    if (e.currentTarget.contains(e.target) && open) return

    openSidenav()
  }

  const focusOut = e => {
    if (e.currentTarget !== e.target && e.currentTarget.contains(e.relatedTarget)) return
    if (!e.currentTarget.contains(e.relatedTarget) && !open) return

    openSidenav()
  }

  return (
    <header>
      <Link to="/" className="header--main-link">
        <h1 onClick={navigate} onMouseOver={() => preload(Main)}>
          Matt Davis
        </h1>
      </Link>

      <Badge
        classes={{ root: "menu__burger-badge" }}
        badgeContent={cartItems}
        invisible={open || !cartItems}
      >
        <Hamburger open={open} onClick={openSidenav} />
      </Badge>
      <div
        className="menu"
        style={open ? { transform: "translateX(0)" } : { transform: "translateX(100%)" }}
      >
        <ul className="header-links" onFocus={focusIn} onBlur={focusOut}>
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
              <Badge badgeContent={cartItems}>
                <ShoppingCartOutlinedIcon
                  style={{
                    color: "var(--white-two)",
                    backgroundColor: "var(--dark)",
                  }}
                />
              </Badge>
            </Link>
          </li>

          <li onClick={() => setOpen(false)}>
            <Link to="/edit" className="login-edit">
              {isAuthenticated ? (
                <EditIcon onMouseOver={() => preload(Edit)} />
              ) : (
                <ExitToAppIcon
                  onMouseOver={() => preload(Login)}
                  style={{ color: "var(--light-two)" }}
                />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
