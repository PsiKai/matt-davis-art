import React, {Fragment, useContext, useEffect, useState} from 'react'
import CartItem from './CartItem'
import Modal from "../components/Modal"
import ShippingForm from "./ShippingForm.js"
import AppContext from "../context/AppContext";
import AlertContext from "../context/alertContext";
import Alerts  from "../components/Alerts"
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
                            key={id}
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
                    <div>
                        <p>Items in cart:</p>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        
                    </div>
                    <div>
                        <p><b>{cartItems}</b></p>
                        <p><b>${total}</b></p>
                        <p><b>Free!</b></p>
                        
                    </div>
                    <hr className="underline"></hr> 
                    <h3>Total: </h3>       
                    <h3>${total + 0}</h3>
                    <button 
                        className="checkout" 
                        data-text="Checkout" 
                        onClick={clear}>
                            Checkout
                    </button>
                </div> 

                <Alerts />
                
                <TransitionGroup>
                {modalOpen &&
                    <CSSTransition
                        in={modalOpen} 
                        classNames="fadein" 
                        timeout={500}
                        unmountOnExit={true}
                    >
                        <Modal 
                            total={total}
                            shipData={address}
                            setModalOpen={setModalOpen}
                            cart={cart}
                        />
                    </CSSTransition>
                }
                </TransitionGroup>
                
            </Fragment> 
    )
}

export default CartItems
