import React, {Fragment, useContext, useEffect, useState} from 'react'
import CartItem from './CartItem'
import Modal from "./modals/Modal"
import ShippingForm from "./ShippingForm.js"
import AppContext from "../context/AppContext";
import AlertContext from "../context/alertContext";
import Alerts  from "../components/layout/Alerts"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CartItems = () => {
    const appContext = useContext(AppContext);
    const alertContext = useContext(AlertContext);
    const {cartItems, cart, total, checkout, prints, getArt} = appContext;
    const {setAlert} = alertContext;

    const [modalOpen, setModalOpen] = useState(false)
    const [address, setAddress] = useState(null)
        
    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])

    const clear = () => {
        if (address !== null) {
            setModalOpen(true)
            checkout(cart);
        } else {
            setAlert("Please confirm buyer and shipping info", "var(--medium)")
        }
    }

    const shipForm = (form) => {
        setAddress(form)
    }
    
    return (
        <Fragment>
            <div className="cart-flexbox">
                {cart.map((item, i) => (
                    <CartItem 
                        key={item._id}
                        id={i}
                        // src={newSrc[0].img}
                        src={item.img}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        original={item.original}
                        size={JSON.parse(item.dimensions)}
                        // stock={item.stock}
                    />
                ))}
            </div>
            <hr className="cart-division" />
            
            <ShippingForm
                shipForm={shipForm}
            />

            <div className="cart-total">
                <div>
                    <p>Items in cart:</p>
                    <p>Subtotal:</p>
                    <p>Shipping:</p>
                </div>
                <div>
                    <p><b>{cartItems}</b></p>
                    <p><b>${total}</b></p>
                    <p><b>$5</b></p>
                </div>
                <hr className="underline"></hr> 
                <h3>Total: </h3>       
                <h3>${total + 5}</h3>
                <button 
                    className="checkout" 
                    data-text="Checkout" 
                    onClick={clear}>
                        Checkout
                </button>
            </div> 

            <Alerts />
            <CSSTransition
                in={modalOpen} 
                classNames="fadein" 
                timeout={400}
                unmountOnExit={true}
            >
                <Modal 
                    total={total}
                    shipData={address}
                    setModalOpen={setModalOpen}
                    cart={cart}
                />
            </CSSTransition>
        </Fragment>
    )
}

export default CartItems


