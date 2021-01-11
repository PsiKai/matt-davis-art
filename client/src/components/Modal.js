import React, {useContext} from 'react'
import ReactDOM from "react-dom"
import AppContext from "../context/AppContext"



const Modal = ({style, setModalStyle, total, shipData, cart}) => {


    const appContext = useContext(AppContext)

    const {add1, add2, city, state, zip, email} = shipData;

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
                            shipping: 5
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
        e.target.classList.contains("backdrop") && setModalStyle({})
    }


    const sendShipping = (order) => {
        // console.log();
        appContext.completePurchase(order)
        setModalStyle({})
        // window.alert("Payment Received for $" + order.total);
    }

    return (
        <div>
            <div className="backdrop" style={style} onClick={hide}>
                    <div className="cart-modal">
                        <h2>Complete your purchase</h2>
                        <div className="shipping-div">
                            <h4>Shipping Address:</h4>
                            <p>{add1}</p>
                            <p>{add2}</p>
                            <span>{city},</span>
                            <span> {state}</span>
                            <span> {zip}</span>
                            <p>{email}</p>
                        </div>
                        
                        <h4>Total: ${total}</h4>
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
