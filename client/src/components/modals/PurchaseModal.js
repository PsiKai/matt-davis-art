import React, { useContext, useEffect } from "react"
import ReactDOM from "react-dom"
import AppContext from "../../context/AppContext"

import axios from "axios"

import "../../styles/prints.css"

import { useArtRefresh } from "../../hooks/artApi"

import withModalProperties from "../../hoc/withModalProperties"

const PurchaseModal = ({ dismissModal, total, shipData, cart }) => {
  const { dispatch } = useContext(AppContext)

  const refreshArt = useArtRefresh()

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

  const createOrder = (data, actions) => {
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

  const sendShipping = order => {
    sendConfirmationEmails(order)
    refreshArt()
    dismissModal()
  }

  const sendConfirmationEmails = async order => {
    const res = await axios.post("/api/mailer/purchase", order)
    dispatch({
      type: "PURCHASED",
      payload: res.data,
    })
  }

  return (
    <>
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
    </>
  )
}

export default withModalProperties(PurchaseModal)
