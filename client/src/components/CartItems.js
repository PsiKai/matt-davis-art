import React, {Fragment, useContext, useEffect, useState} from 'react'
import CartItem from './CartItem'
import Modal from "../components/Modal"
import ShippingForm from "./ShippingForm.js"
import AppContext from "../context/AppContext";


const CartItems = () => {
    const appContext = useContext(AppContext);
    const {cartItems, cart, total, checkout, prints, getArt} = appContext;

    const [modalStyle, setModalStyle] = useState({})
    const [address, setAddress] = useState(null)
    
        

    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])

    //submit payment TODO
    const clear = () => {
        checkout(cart);
        setModalStyle({
            opacity: "1",
            display: "block"
        })
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
                        src={newSrc[0].img}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        stock={item.stock}
                    />)
                })
                }
                </div>
                <hr className="cart-division" />
                <div className="cart-total">
                    <p>Items in cart = {cartItems}</p>        
                    <h3>Total: ${total}</h3>  
                    <button onClick={clear}>Checkout</button>
                </div>
                <ShippingForm
                    shipForm={shipForm}
                />
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
