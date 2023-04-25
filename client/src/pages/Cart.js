import React, { useContext, Fragment } from "react"
import { Link } from "react-router-dom"

import "../styles/cart.css"

import AppContext from "../context/AppContext"
import CartItems from "../components/CartItems"
import PageHeader from "../components/layout/PageHeader"

import { CircularProgress } from "@material-ui/core"
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"

import { CSSTransition } from "react-transition-group"

const Cart = props => {
  const appContext = useContext(AppContext)
  const { cart, purchased, modal, dispatch } = appContext

  const orderComplete = () => {
    dispatch({ type: "CLEAR_PURCHASE" })
    const route = modal.code === 200 ? "/about" : "/contact"
    props.history.push(route)
  }

  return (
    <div className="page-content">
      <PageHeader heading="Your Cart" />

      {localStorage.getItem("cart") && !cart ? (
        <div className="progress">
          <CircularProgress color="inherit" />
        </div>
      ) : cart ? (
        <CartItems />
      ) : (
        <Fragment>
          <h2 className="empty-cart">The cart is empty. Please check for available artwork in the store.</h2>
          <Link to="/prints">
            <button data-text="To the Store!">To the Store!</button>
          </Link>
        </Fragment>
      )}

      <CSSTransition in={purchased} classNames="fadein" timeout={500} unmountOnExit={true}>
        <div className="backdrop" onClick={orderComplete}>
          <div className="purchase-modal">
            {modal.code === 200 ? <CheckCircleOutlinedIcon /> : <ErrorOutlineOutlinedIcon />}
            <h2>{modal.heading}</h2>
            <p>{modal.msg}</p>
            <button onClick={orderComplete}>{modal.code === 200 ? "Keep Browsing" : "Contact Me"}</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Cart
