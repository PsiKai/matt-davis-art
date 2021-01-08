import React, {useRef, useEffect} from 'react'


const Modal = (props) => {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Art from Matt Davis",
                            amount: {
                                currency_code: "USD",
                                value: `${props.total}`
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
                window.alert("Payment Received");
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    const hide = (e) => {
        e.target.classList.contains("backdrop") && props.setModalStyle({})
    }

    return (
        <div>
            <div className="backdrop" style={props.style} onClick={hide}>
                    <div className="cart-modal">
                        <h2>Complete your purchase</h2>

                        <h4>Shipping Address:</h4>
                        <label htmlFor="add1">Line 1</label>
                        <input id="add1" type="text"></input>
                        <label htmlFor="add2">Line 2</label>
                        <input id="add2" type="text"></input>
                        <label htmlFor="city">City</label>
                        <input id="city" type="text"></input>
                        <label htmlFor="state">State</label>
                        <input id="state" type="text" maxLength="2"></input>
                        <label htmlFor="zip">Postal Code</label>
                        <input id="zip" type="text"></input>

                        <h4>Email Address:</h4>
                        <input type='email'></input>

                        <h4>Total: ${props.total}</h4>

                        <div className="paypal" ref={paypal}></div>
                    </div>
                </div>
        </div>
    )
}

export default Modal
