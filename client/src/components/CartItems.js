import React, { Fragment, useContext, useState } from "react"
import AlertContext from "../context/alertContext"
import AppContext from "../context/AppContext"

import { CSSTransition } from "react-transition-group"

import LaunchIcon from "@material-ui/icons/Launch"

import CartItem from "./CartItem"
import ShippingForm from "./ShippingForm.js"
import Modal from "./modals/Modal"
import Alerts from "../components/layout/Alerts"

import { useArtApi } from "../hooks/artApi"

const CartItems = () => {
  const appContext = useContext(AppContext)
  const alertContext = useContext(AlertContext)
  const { cartItems, cart, total } = appContext
  const { setAlert } = alertContext

  const [modalOpen, setModalOpen] = useState(false)
  const [address, setAddress] = useState(null)

  useArtApi()

  const checkoutCartItems = () => {
    if (address !== null) {
      setModalOpen(true)
    } else {
      setAlert("Please confirm buyer and shipping info", "var(--medium)")
    }
  }

  return (
    <Fragment>
      <div className="cart-flexbox">
        {cart.map((item, i) => (
          <CartItem
            key={item._id}
            id={item._id}
            index={i}
            src={item.img}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            original={item.original}
            size={JSON.parse(item.dimensions)}
            position={item.position}
          />
        ))}
      </div>
      <hr className="cart-division" />

      <ShippingForm onSubmit={setAddress} />

      <div className="cart-total__wrapper">
        <div className="cart-total">
          <div className="cart-labels">
            <p>Items in cart:</p>
            <p>Subtotal:</p>
            <p>Shipping:</p>
          </div>
          <div className="cart-values">
            <p>
              <b>{cartItems}</b>
            </p>
            <p>
              <b>${total}</b>
            </p>
            <p>
              <b>$5</b>
            </p>
          </div>
          <hr className="underline"></hr>
          <div className="cart-labels">
            <h3>Total: </h3>
          </div>
          <div className="cart-values">
            <p className="cart-price">${total + 5}</p>
          </div>
          <button className="checkout" onClick={checkoutCartItems}>
            Checkout&nbsp; <LaunchIcon />
          </button>
        </div>
      </div>

      <Alerts />
      <CSSTransition in={modalOpen} classNames="fadein" timeout={400} unmountOnExit={true}>
        <Modal total={total} shipData={address} setModalOpen={setModalOpen} cart={cart} />
      </CSSTransition>
    </Fragment>
  )
}

export default CartItems
