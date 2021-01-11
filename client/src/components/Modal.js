import React, {useRef, useEffect, useContext} from 'react'
import ReactDOM from "react-dom"
import AppContext from "../context/AppContext"
import axios from "axios"



const Modal = ({style, setModalStyle, total, shipData, cart}) => {

    // useEffect(() => {
    //     getToken();
    // }, [])

    // const getToken = async () => {
    //     const username = "ARKXm6KwxPnRT66JyNjIXPaQfRi42vD_XMqBh9sQ48hLLS-JjK3eo-c8e2wGBm36_4TD4gPU4uceeTDB"
    //     const password = "EJEncwCA-hxe-hStWYSxPBE3nP-2KmzZ7hP5uLq1MbOobmx-PAa_dCMcnQeKJoCinFTyJnrJ-ZaH2QhQ"
        
    //     const config = {
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-Language': 'en_US',
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         auth: {
    //             username: username,
    //             password: password,
    //         },
    //         params: {
    //             grant_type: "client_credentials"
    //         }
    //     }
    //     try {
    //         const res = await axios.post("https://api-m.paypal.com/v1/oauth2/token", {}, config)
    //         console.log(res.data.access_token)
    //         const token = res.data.access_token
    //         localStorage.setItem("paypalToken", token)

    //     } catch (err) {
    //         if (err) console.log(err);
    //     }
       
    // }
    const appContext = useContext(AppContext)

    const {add1, add2, city, state, zip, email} = shipData;

    const PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM})

    const createOrder = (data, actions) => {
        // const config = {

        // }
        // const res = axios.post("https://api-m.paypal.com/v2/checkout/orders", {}, config)
        // console.log(data);
        return actions.order.create({
            // headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `Bearer ${localStorage.getItem("paypalToken")}`
            // },
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

    // const paypal = useRef()

    // useEffect(() => {
    //     window.paypal.Buttons({
    //         createOrder: (data, actions, err) => {
    //             return actions.order.create({
    //                 intent: "CAPTURE",
    //                 purchase_units: [
    //                     {
    //                         description: "Art from Matt Davis",
    //                         amount: {
    //                             currency_code: "USD",
    //                             value: `${total}`
    //                         }
    //                     }
    //                 ]
    //             })
    //         },
    //         onApprove: async (data, actions) => {
    //             const order = await actions.order.capture()
    //             const amount = order.purchase_units[0].amount.value
    //             const purchaseOrder = {ship: shipData, items: cart, total: amount}
    //             sendShipping(purchaseOrder);
    //         },
    //         onError: (err) => {
    //             console.log(err);
    //         }
    //     }).render(paypal.current)
    //     //eslint-disable-next-line
    // }, [shipData])

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
                        {/* <div className="paypal" ref={paypal}></div> */}
                    </div>
                </div>
        </div>
    )
}

export default Modal
