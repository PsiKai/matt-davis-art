import React, {useContext, useEffect} from 'react';
import AppContext from "../context/AppContext";
import CartItems from "../components/CartItems";
import { CircularProgress } from '@material-ui/core';

const Cart = () => {
    const appContext = useContext(AppContext);
    const {cart, reloadCart, prints} = appContext;

    useEffect(() => {
        reloadCart()
        //eslint-disable-next-line
    }, [])

    return (
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
    )
}

export default Cart
