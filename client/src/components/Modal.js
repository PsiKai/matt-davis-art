import React, {useContext} from 'react'
import ReactDOM from "react-dom"
import AppContext from "../context/AppContext"


const Modal = ({setModalOpen, total, shipData, cart}) => {
    const appContext = useContext(AppContext)

    const {add1, add2, city, state, zip, email, name, name2} = shipData;

    const PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM})

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Art from Matt Davis",
                    amount: {
                        currency_code: "USD",
                        value: `${total}`,
                        details: {
                            subtotal: `${total}`,
                            tax: 0,
                            shipping: 0
                        }
                    }
                }
            ]
        })
    }

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture()
        const amount = order.purchase_units[0].amount.value
        const purchaseOrder = {ship: shipData, items: cart, total: amount}
        sendShipping(purchaseOrder);
    }

    const hide = (e) => {
        var el = e.target.classList
        if (el.contains("backdrop") || el.contains("close-modal") || el.contains("fas")) setModalOpen(false)
    }


    const sendShipping = (order) => {
        appContext.completePurchase(order)
        setModalOpen(false)
    }

    return (
        <div>
        <div className="backdrop" onClick={hide}>
            <div className="cart-modal">
            <div className="close-modal" onClick={hide}><i className="fas fa-times fa-2x"></i></div>
                <h2>Complete your purchase</h2>
                <div className="cart-modal__grid">
                <div className="cart-modal--buyer">
                    <h4>Send Confirmation To:</h4>
                    <p>{name2} <br/>
                    {email}</p>
                </div>
                <div className="cart-modal--shipping">
                    <h4>Shipping Address:</h4>
                    <p>
                        {name} <br/>
                        {add1} <br/>
                        {add2}
                        {add2 !== "" && <br/>}
                        <span>{city},</span>
                        <span> {state}</span>
                        <span> {zip}</span>
                    </p>
                </div>
                </div>
                <h2>Total: ${total}</h2>
                <PayPalButton
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                />
            </div>
        </div>
        </div>
    )
}

export default Modal
