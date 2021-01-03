import React, {useContext, useEffect} from 'react';
import AppContext from "../context/AppContext";

import CartItems from "../components/CartItems";

const Cart = () => {
    const appContext = useContext(AppContext);
    const {cart, reloadCart} = appContext;

    // var reducedCart = cart.reduce((accumulator, cur) => {
    //     var name = cur.name;
    //     var found = accumulator.find((elem) => {
    //         return elem.name == name
    //     })
    //     if (found) found.quantity += cur.quantity;
    //     else accumulator.push(cur);
    //     return accumulator;
    // }, []);

    useEffect(() => {
        reloadCart()
        //eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Cart</h1>
            {cart.length !== 0 ? <CartItems /> :
                <h2>The cart is empty.  Please check for available prints on the   Prints page.</h2>
            }   
        </div>
            
           
            
            
        
    )
}

export default Cart
