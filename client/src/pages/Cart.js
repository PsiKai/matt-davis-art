import React, {Fragment, useContext, useEffect} from 'react';
import AppContext from "../context/AppContext";
import CartItems from "../components/CartItems";
import { CircularProgress } from '@material-ui/core';

const Cart = () => {
    const appContext = useContext(AppContext);
    const {cart, reloadCart, prints, purchased, modal, clearPurchase} = appContext;

    useEffect(() => {
        reloadCart()
        //eslint-disable-next-line
    }, [])

    const orderComplete = () => {
        clearPurchase()
    }

    return (
        <Fragment>
        <div className="page-content">
            <h1 className="page-header">Cart</h1>
        
            {(Boolean(localStorage.getItem("cart")) && !prints) &&
                <div className="progress">
                    <CircularProgress color="inherit"/>
                </div>
            }
            {cart ? <CartItems /> :
                <h2>The cart is empty.  Please check for available prints on the Prints page.</h2>
            }   
        </div>
        {purchased && 
        <div className="backdrop" style={{opacity: "1", display: "block"}} onClick={orderComplete}>
        <div className="purchase-modal">
            <h1>Thank you for your purchase!</h1>
            <p>{modal}</p>
            <button onClick={orderComplete}>Continue Browsing</button>
        </div>
        </div>}
        </Fragment>       
    )
}

export default Cart
