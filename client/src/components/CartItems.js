import React, {Fragment, useContext, useEffect, useState} from 'react'
import CartItem from './CartItem'
import Modal from "../components/Modal"
import ShippingForm from "./ShippingForm.js"
import AppContext from "../context/AppContext";
import AlertContext from "../context/alertContext";
import Alerts  from "../components/Alerts"


const CartItems = () => {
    const appContext = useContext(AppContext);
    const alertContext = useContext(AlertContext);
    const {cartItems, cart, total, checkout, prints, getArt} = appContext;
    const {setAlert} = alertContext;

    const [modalStyle, setModalStyle] = useState({})
    const [address, setAddress] = useState(null)
        

    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])


    //submit payment TODO
    const clear = () => {
        if (address !== null) {
            checkout(cart);
            setModalStyle({
            opacity: "1",
            display: "block"
            })
        } else {
            setAlert("Please confirm buyer and shipping info", "lightpink")
        }
    }

    const shipForm = (form) => {
        setAddress(form)
    }
    

    return (
            <Fragment>
                <div className="cart-flexbox">
                {prints && cart.map((item, i) => {
                    var id = item._id
                    var newSrc = prints.filter(print => {
                        if (print._id === id) {
                            return print
                        } else {
                            return null
                        }
                    })
                    return (
                    
                    <CartItem 
                        key={i}
                        id={i}
                        src={newSrc[0].img}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        stock={item.stock}
                    />
                
                    )
                })
                }
                </div>
                <hr className="cart-division" />
                
                <ShippingForm
                    shipForm={shipForm}
                />

                <div className="cart-total">
                    <p>Items in cart: <b>{cartItems}</b></p>
                    <p>Subtotal: <b>${total}</b></p>
                    <p>Shipping: <b>Free!</b></p>
                    <hr className="underline"></hr>        
                    <h3>Total: ${total + 0}</h3>  
                    <button onClick={clear}>Checkout</button>
                </div> 

                <Alerts />
                
                {address &&
                    
                    <Modal 
                        style={modalStyle}
                        total={total}
                        shipData={address}
                        setModalStyle={setModalStyle}
                        cart={cart}
                    />

                }
                
            </Fragment> 
    )
}

export default CartItems
