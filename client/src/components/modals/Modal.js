import ReactDOM from "react-dom"
import React, { useContext, useEffect } from "react"
import AppContext from "../../context/AppContext"

import axios from "axios"

import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

import "../../styles/prints.css"

const Modal = ({ setModalOpen, total, shipData, cart }) => {
  const { refreshArt, dispatch } = useContext(AppContext)

  const { add1, add2, city, state, zip, email, name, name2 } = shipData

  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM })

  useEffect(() => {
    axios
      .post("/api/artwork/price", cart)
      .then(({ data: price }) => {
        dispatch({ type: "CHECKOUT", payload: price })
      })
      .catch(err => {
        console.log(err)
      })
  }, [cart, dispatch])

  const createOrder = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Art from Matt Davis",
          amount: {
            currency_code: "USD",
            value: `${total + 5}`,
            details: {
              subtotal: `${total}`,
              tax: 0,
              shipping: 5,
            },
          },
        },
      ],
    })
  }

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture()
    const amount = order.purchase_units[0].amount.value
    const purchaseOrder = { ship: shipData, items: cart, total: amount }
    sendShipping(purchaseOrder)
  }

  const hide = e => {
    if (e.target === e.currentTarget) setModalOpen(false)
  }

  const sendShipping = order => {
    sendConfirmationEmails(order)
    refreshArt()
    setModalOpen(false)
  }

  const sendConfirmationEmails = async order => {
    const res = await axios.post("/api/mailer/purchase", order)
    dispatch({
      type: "PURCHASED",
      payload: res.data,
    })
  }

  return (
    <div className="backdrop" onClick={hide}>
      <div className="cart-modal">
        <div className="close-modal" onClick={hide}>
          <CloseRoundedIcon />
        </div>
        <h2>Complete your purchase</h2>
        <div className="cart-modal__grid">
          <div className="cart-modal--buyer">
            <h3>Send Confirmation To:</h3>
            <div className="cart-modal--info">
              <p>{name2}</p>
              <p>{email}</p>
            </div>
          </div>
          <div className="cart-modal--shipping">
            <h3>Shipping Address:</h3>
            <div className="cart-modal--info">
              <p>{name}</p>
              <p>{add1}</p>
              <p>{add2}</p>
              <p>
                <span>{city},</span>
                <span> {state.toUpperCase()}</span>
                <span> {zip}</span>
              </p>
            </div>
          </div>
        </div>
        <h2>Total: ${total + 5}</h2>
        <div className="paypal__wrapper">
          <PayPalButton createOrder={createOrder} onApprove={onApprove} />
        </div>
      </div>
    </div>
  )
}

export default Modal
